import {
  changePassword as changePasswordRequest,
  forgotPassword as forgotPasswordRequest,
  login as loginRequest,
  logout as logoutRequest,
  resetPassword as resetPasswordRequest,
  signup as signupRequest,
  verifyOtp as verifyOtpRequest,
} from '../../api_services/auth';
import type { Gender } from '../../types';
import { endSession } from '../endSession';
import { runRequest, type AppThunk } from '../runRequest';
import { authError, authLoading } from '../slices/auth-slice';
import { setProfileUser } from '../slices/profile-slice';
import { setSession } from '../slices/session-slice';

export function login(email: string, password: string) {
  return runRequest({
    request: () => loginRequest(email, password),
    loading: authLoading('login'),
    error: authError('login'),
    success: result => [setSession(result), setProfileUser(result.user)],
  });
}

export function signup(input: {
  name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth?: string;
  gender?: Gender | null;
}) {
  return runRequest({
    request: () => signupRequest(input),
    loading: authLoading('signup'),
    error: authError('signup'),
    success: result => [setSession(result), setProfileUser(result.user)],
  });
}

export function forgotPassword(email: string, onDone?: () => void) {
  return runRequest({
    request: () => forgotPasswordRequest(email),
    loading: authLoading('forgot'),
    error: authError('forgot'),
    onDone,
  });
}

export function verifyOtp(email: string, code: string, onDone?: () => void) {
  return runRequest({
    request: () => verifyOtpRequest(email, code),
    loading: authLoading('otp'),
    error: authError('otp'),
    onDone,
  });
}

export function resendOtp(email: string, onDone?: () => void) {
  return runRequest({
    request: () => forgotPasswordRequest(email),
    loading: authLoading('resend'),
    error: authError('otp'),
    onDone,
  });
}

export function resetPassword(email: string, password: string, onDone?: () => void) {
  return runRequest({
    request: () => resetPasswordRequest(email, password),
    loading: authLoading('reset'),
    error: authError('reset'),
    onDone,
  });
}

export function changePassword(
  current_password: string,
  password: string,
  onDone?: () => void,
): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => changePasswordRequest(token, current_password, password),
        loading: authLoading('password'),
        error: authError('password'),
        onDone,
      }),
    );
  };
}

export function logout(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    dispatch(authLoading('logout')(true));
    if (token) {
      try {
        await logoutRequest(token);
      } catch {
        // Leave the app either way. The session is cleared below.
      }
    }
    dispatch(endSession());
  };
}
