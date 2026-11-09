import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { ApiError } from '../api_services/http-provider';
import type { RootState } from '../types';
import { endSession } from './endSession';

export type AppThunk<Result = void> = ThunkAction<Promise<Result>, RootState, undefined, UnknownAction>;

type Options<Param, Data> = {
  apiService: (param_data: Param) => Promise<Data>;
  param_data?: Param;
  setLoading?: (value: boolean) => UnknownAction;
  setError?: (value: string) => UnknownAction;
  // Everything that should happen with the response: store it, navigate, show a notice.
  onDone?: (data: Data) => void;
  // The structured error (field errors, code), for screens that show it under a field.
  onError?: (error: ApiError) => void;
  // Login/signup/reset expect 401 for wrong credentials; that must not end a session.
  endOnUnauthorized?: boolean;
};

// Calls one API, then hands the response to onDone. Nothing is returned to the caller.
export function requestHandler<Param, Data>({ apiService, param_data, setLoading, setError, onDone, onError, endOnUnauthorized = true }: Options<Param, Data>): AppThunk {
  return async dispatch => {
    if (setLoading) dispatch(setLoading(true));
    if (setError) dispatch(setError(''));
    try {
      const data = await apiService(param_data as Param);
      onDone?.(data);
    } catch (caught) {
      const error = caught instanceof ApiError ? caught : new ApiError(0, 'INTERNAL', caught instanceof Error ? caught.message : 'Something went wrong. Please try again.');
      if (error.status === 401 && endOnUnauthorized) dispatch(endSession());
      if (setError) dispatch(setError(error.message));
      onError?.(error);
    } finally {
      if (setLoading) dispatch(setLoading(false));
    }
  };
}
