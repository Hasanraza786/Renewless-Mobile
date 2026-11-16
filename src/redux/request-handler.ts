import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { ApiError } from '../api_services/http-provider';
import type { RootState } from '../types';
import { sessionToken } from '../utils/session-token';
import { endSession } from './endSession';

const SESSION_ENDED = new Set(['UNAUTHORIZED', 'ACCOUNT_DISABLED']);

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
    const token = sessionToken();
    try {
      const data = await apiService(param_data as Param);
      // A response that lands after logout (or a new login) belongs to the old session: drop it.
      if (token && sessionToken() !== token) return;
      onDone?.(data);
    } catch (caught) {
      if (token && sessionToken() !== token) return;
      const error = caught instanceof ApiError ? caught : new ApiError(0, 'INTERNAL', caught instanceof Error ? caught.message : 'Something went wrong. Please try again.');
      // Only a dead session signs out; Gmail/Outlook expiry and provider token checks are 401s too.
      if (endOnUnauthorized && SESSION_ENDED.has(error.code)) dispatch(endSession());
      if (setError) dispatch(setError(error.message));
      onError?.(error);
    } finally {
      if (setLoading) dispatch(setLoading(false));
    }
  };
}
