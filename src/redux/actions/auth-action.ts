import {
  changePassword as changePasswordRequest,
  forgotPassword as forgotPasswordRequest,
  login as loginRequest,
  logout as logoutRequest,
  resendCode as resendCodeRequest,
  resetPassword as resetPasswordRequest,
  signInWithProvider,
  signup as signupRequest,
  verifyResetCode,
  verifySignupCode,
} from '../../api_services/auth';
import type { AuthProvider, AuthResponse } from '../../types';
import { endSession } from '../endSession';
import { runRequest, type AppThunk } from '../runRequest';
import { authError, authLoading } from '../slices/auth-slice';
import { setNotice, setProfileUser } from '../slices/profile-slice';
import { setSession } from '../slices/constant-slice';
import { successHaptic } from '../../utils/haptics';

const startSession = (session: AuthResponse) => [setSession(session), setProfileUser(session.user)];

// Resolves to 'session', 'verify' (the account still needs its signup code) or undefined on failure.
export function login(email: string, password: string): AppThunk<'session' | 'verify' | undefined> {
  return async dispatch => {
    const result = await dispatch(
      runRequest({
        request: () => loginRequest(email.trim(), password),
        loading: authLoading('login'),
        error: authError('login'),
        success: value => ('token' in value ? startSession(value) : []),
        endOnUnauthorized: false,
      }),
    );
    if (!result) return undefined;
    return 'token' in result ? 'session' : 'verify';
  };
}

// Resolves to '' when the code was sent, otherwise the error to show under Email.
export function signup(input: { name: string; email: string; password: string }): AppThunk<string> {
  return async (dispatch, getState) => {
    const sent = await dispatch(
      runRequest({
        request: async () => {
          await signupRequest(input);
          return true;
        },
        loading: authLoading('signup'),
        error: authError('signup'),
        endOnUnauthorized: false,
      }),
    );
    return sent ? '' : getState().auth.error.signup;
  };
}

export function signInSocial(provider: AuthProvider) {
  return runRequest({
    request: () => signInWithProvider(provider),
    loading: authLoading('social'),
    error: authError('social'),
    success: startSession,
    endOnUnauthorized: false,
  });
}

export function forgotPassword(email: string) {
  return runRequest({
    request: () => forgotPasswordRequest(email.trim()),
    loading: authLoading('forgot'),
    error: authError('forgot'),
    endOnUnauthorized: false,
  });
}

// Signup verification starts a session; reset verification returns only a reset authorization.
export function verifyCode(purpose: 'signup' | 'reset', email: string, code: string) {
  return runRequest<AuthResponse | { reset_token: string }>({
    request: () => (purpose === 'signup' ? verifySignupCode(email, code) : verifyResetCode(email, code)),
    loading: authLoading('otp'),
    error: authError('otp'),
    success: value => ('token' in value ? startSession(value) : []),
    endOnUnauthorized: false,
  });
}

export function resendCode(email: string) {
  return runRequest({
    request: () => resendCodeRequest(email),
    loading: authLoading('resend'),
    error: authError('resend'),
    endOnUnauthorized: false,
  });
}

export function resetPassword(reset_token: string, password: string) {
  return runRequest({
    request: () => resetPasswordRequest(reset_token, password),
    loading: authLoading('reset'),
    error: authError('reset'),
    endOnUnauthorized: false,
  });
}

// Resolves true when the server accepted the new password; a failure keeps the entered draft for retry.
export function changePassword(current_password: string, password: string): AppThunk<boolean> {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return false;
    const result = await dispatch(
      runRequest({
        request: () => changePasswordRequest(token, current_password, password),
        loading: authLoading('password'),
        error: authError('password'),
      }),
    );
    if (!result) return false;
    successHaptic();
    dispatch(setNotice('Password updated.'));
    return true;
  };
}

export function logout(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    dispatch(authLoading('logout')(true));
    if (token) {
      try {
        await logoutRequest(token);
      } catch {
        // Leave the app either way. The session is cleared below.
      }
    }
    dispatch(endSession());
    dispatch(setNotice('You’re logged out.'));
  };
}
