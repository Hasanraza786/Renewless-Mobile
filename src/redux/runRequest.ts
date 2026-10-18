import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { errorMessage, isUnauthorized } from '../utils/errors';
import { endSession } from './endSession';

export type AppThunk<Result = void> = ThunkAction<
  Promise<Result>,
  RootState,
  undefined,
  UnknownAction
>;

type FlagAction = (value: boolean) => UnknownAction;
type ErrorAction = (value: string) => UnknownAction;

type Options<T> = {
  request: () => Promise<T>;
  loading: FlagAction;
  error: ErrorAction;
  success?: (value: T) => UnknownAction | UnknownAction[];
  onDone?: (value: T) => void;
  endOnUnauthorized?: boolean;
};

export function runRequest<T>(options: Options<T>): AppThunk<T | undefined> {
  return async dispatch => {
    dispatch(options.loading(true));
    dispatch(options.error(''));
    try {
      const value = await options.request();
      const success = options.success?.(value);
      if (Array.isArray(success)) success.forEach(action => dispatch(action));
      else if (success) dispatch(success);
      options.onDone?.(value);
      return value;
    } catch (caught) {
      if (options.endOnUnauthorized !== false && isUnauthorized(caught)) {
        await dispatch(endSession());
      }
      dispatch(options.error(errorMessage(caught)));
      return undefined;
    } finally {
      dispatch(options.loading(false));
    }
  };
}
