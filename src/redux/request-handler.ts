import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { getCrashlytics, recordError } from '@react-native-firebase/crashlytics';
import { ApiError } from '../api_services/http-provider';
import type { RootState } from '../types';
import { sessionToken } from '../utils/session-token';
import { endSession } from './endSession';
import { setSessionEnded } from './slices/auth-slice';

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
    // A response that lands after logout (or a new login) belongs to the old session: drop it.
    const stale = () => Boolean(token) && sessionToken() !== token;
    try {
      let data: Data;
      try {
        data = await apiService(param_data as Param);
      } catch (caught) {
        if (stale()) return;
        // Only server messages are user copy; a JS error's own text never reaches the screen.
        const error = caught instanceof ApiError ? caught : new ApiError(0, 'INTERNAL', 'Something went wrong. Please try again.');
        // Only a dead session signs out; Gmail/Outlook expiry and provider token checks are 401s too.
        if (endOnUnauthorized && SESSION_ENDED.has(error.code)) {
          dispatch(endSession());
          // Other requests of this session now return as stale above, so the notice shows once.
          dispatch(setSessionEnded(error.code === 'ACCOUNT_DISABLED' ? 'disabled' : 'expired'));
          return;
        }
        if (setError) dispatch(setError(error.message));
        onError?.(error);
        return;
      }
      if (stale()) return;
      try {
        onDone?.(data);
      } catch (bug) {
        // The request succeeded (a POST is already saved), so a crash in onDone is an app bug, not a failed request.
        recordError(getCrashlytics(), bug instanceof Error ? bug : new Error(String(bug)));
      }
    } finally {
      if (setLoading) dispatch(setLoading(false));
    }
  };
}
