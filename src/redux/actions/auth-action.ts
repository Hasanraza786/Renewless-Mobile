import { Alert } from 'react-native';
import { toProfile } from '../../api_services/adapters';
import type { ChallengeDto, SessionDto } from '../../api_services/dto';
import type { ApiError } from '../../api_services/http-provider';
import apiServices from '../../api_services/request-handler';
import { navigate, popTo } from '../../navigation/service';
import type { AuthIntent, AuthProvider } from '../../types';
import { enterApp } from '../../utils/auth-form';
import { trackEvent } from '../../utils/analytics';
import { successHaptic } from '../../utils/haptics';
import { saveSessionToken } from '../../utils/session-token';
import { pushToken } from '../../utils/push';
import { providerSignIn, type ProviderToken } from '../../utils/social-sign-in';
import { endSession } from '../endSession';
import { requestHandler, type AppThunk } from '../request-handler';
import { authError, authLoading } from '../slices/auth-slice';
import { setSession } from '../slices/constant-slice';
import { setNotice, setProfileUser } from '../slices/profile-slice';

const timezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

// Keychain first, then the store, then into the app.
// Stores the session and profile without leaving the current screen (onboarding keeps going after Google connect).
export function beginSession(session: SessionDto): AppThunk {
  return async dispatch => {
    await saveSessionToken(session.token);
    const user = toProfile(session.user);
    dispatch(setSession({ token: session.token, user }));
    dispatch(setProfileUser(user));
    // Reminders are sent in the account timezone; keep it in step with the phone.
    if (session.user.timezone !== timezone()) dispatch(requestHandler({ apiService: apiServices.updateDevice, param_data: { timezone: timezone() } }));
  };
}

function startSession(session: SessionDto, intent?: AuthIntent): AppThunk {
  return async dispatch => {
    await dispatch(beginSession(session));
    enterApp(intent);
  };
}

// Reminder pushes go to this session's FCM token; logout ends the session and its token with it.
export function savePushToken(token: string): AppThunk {
  return async dispatch => {
    await dispatch(requestHandler({ apiService: apiServices.updateDevice, param_data: { fcmToken: token } }));
  };
}

export function registerPush(): AppThunk {
  return async dispatch => {
    const token = await pushToken();
    if (token) dispatch(savePushToken(token));
  };
}

// No connection or a server failure belongs to the whole form, not a field: it shows as a notice and leaves the
// fields clean for the retry.
const formWide = (error: ApiError) => error.status === 0 || error.status >= 500;

// Wrong credentials stay under Password; an unverified account goes to its code screen.
export function login(email: string, password: string, intent: AuthIntent | undefined, onFieldError: (field: 'email' | 'password', message: string) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.login,
        param_data: { email: email.trim(), password },
        setLoading: authLoading('login'),
        endOnUnauthorized: false,
        onDone: session => {
          trackEvent('login', { method: 'email' });
          dispatch(startSession(session, intent));
        },
        onError: (error: ApiError) => {
          if (formWide(error)) dispatch(setNotice(error.message));
          else if (error.code === 'EMAIL_NOT_VERIFIED') navigate('Otp', { purpose: 'signup', email: email.trim(), challenge_id: String(error.extra.challengeId), intent });
          else if (error.field_errors.email) onFieldError('email', error.field_errors.email);
          else onFieldError('password', error.field_errors.password ?? error.message);
        },
      }),
    );
  };
}

// Sign up's last code per email: submitting again while it is still open (the server's resend cooldown) goes back to
// it instead of stopping on "You can request a new code in n seconds.".
const signup_codes = new Map<string, ChallengeDto>();

// The account gets a session only after its email code is verified.
export function signup(input: { name: string; email: string; password: string }, intent: AuthIntent | undefined, onFieldError: (field: 'name' | 'email' | 'password', message: string) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.signup,
        param_data: { ...input, timezone: timezone() },
        setLoading: authLoading('signup'),
        endOnUnauthorized: false,
        onDone: challenge => {
          signup_codes.set(challenge.email.toLowerCase(), challenge);
          navigate('Otp', { purpose: 'signup', email: challenge.email, challenge_id: challenge.challengeId, intent });
        },
        onError: error => {
          if (formWide(error)) {
            dispatch(setNotice(error.message));
            return;
          }
          const open = signup_codes.get(input.email.trim().toLowerCase());
          if (error.code === 'RATE_LIMITED' && open && new Date(open.expiresAt) > new Date()) {
            navigate('Otp', { purpose: 'signup', email: open.email, challenge_id: open.challengeId, intent });
            return;
          }
          const field = (['name', 'password'] as const).find(key => error.field_errors[key]);
          if (field) onFieldError(field, error.field_errors[field]);
          else onFieldError('email', error.field_errors.email ?? error.message);
        },
      }),
    );
  };
}

// Google/Apple: the native sheet, then the backend verifies the ID token and starts the session (no OTP).
// Closing the sheet keeps the person on the screen they started from.
export function socialLogin(provider: AuthProvider, intent: AuthIntent | undefined): AppThunk {
  return async dispatch => {
    const label = provider === 'google' ? 'Google' : 'Apple';
    let token: ProviderToken | null;
    try {
      token = await providerSignIn(provider);
    } catch {
      Alert.alert(`${label} sign-in didn’t work. Please try again.`);
      return;
    }
    if (!token) return;
    await dispatch(
      requestHandler({
        apiService: apiServices.social,
        param_data: { provider: token.provider, idToken: token.idToken, nonce: token.nonce, name: token.name },
        setLoading: authLoading('social'),
        endOnUnauthorized: false,
        onDone: session => {
          trackEvent(session.isNewUser ? 'sign_up' : 'login', { method: token.provider });
          dispatch(startSession(session, intent));
        },
        onError: error => Alert.alert(error.message),
      }),
    );
  };
}

// An unknown email (or a Google/Apple-only account) stays here with the error under Email.
export function forgotPassword(email: string): AppThunk {
  return async dispatch => {
    dispatch(authError('forgot')(''));
    await dispatch(
      requestHandler({
        apiService: apiServices.forgotPassword,
        param_data: { email: email.trim() },
        setLoading: authLoading('forgot'),
        endOnUnauthorized: false,
        onDone: challenge => navigate('Otp', { purpose: 'reset', email: challenge.email, challenge_id: challenge.challengeId }),
        onError: error => (formWide(error) ? dispatch(setNotice(error.message)) : dispatch(authError('forgot')(error.message))),
      }),
    );
  };
}

// Signup verification signs in; reset verification only authorizes choosing a new password.
export function verifyCode(purpose: 'signup' | 'reset', challenge_id: string, code: string, intent: AuthIntent | undefined, onCodeError: (message: string) => void): AppThunk {
  const onError = (error: ApiError) => onCodeError(error.field_errors.code ?? error.message);
  const param_data = { challengeId: challenge_id, code };
  return async dispatch => {
    if (purpose === 'reset') {
      await dispatch(
        requestHandler({
          apiService: apiServices.verifyReset,
          param_data,
          setLoading: authLoading('otp'),
          endOnUnauthorized: false,
          onDone: ({ resetToken }) => navigate('ResetPassword', { reset_token: resetToken }),
          onError,
        }),
      );
      return;
    }
    await dispatch(
      requestHandler({
        apiService: apiServices.verifySignup,
        param_data,
        setLoading: authLoading('otp'),
        endOnUnauthorized: false,
        onDone: session => {
          trackEvent('sign_up', { method: 'email' });
          dispatch(startSession(session, intent));
        },
        onError,
      }),
    );
  };
}

// A new code replaces the old challenge; the screen keeps the new ID for verification.
export function resendCode(challenge_id: string, onSent: (challenge_id: string) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.resendCode,
        param_data: { challengeId: challenge_id },
        setLoading: authLoading('resend'),
        endOnUnauthorized: false,
        onDone: challenge => {
          trackEvent('otp_resent');
          onSent(challenge.challengeId);
          Alert.alert('We sent you a new code.');
        },
        onError: error => Alert.alert(error.message),
      }),
    );
  };
}

// A successful reset returns to Login; the user signs in with the new password.
export function resetPassword(reset_token: string, password: string): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.resetPassword,
        param_data: { resetToken: reset_token, password },
        setLoading: authLoading('reset'),
        setError: authError('reset'),
        endOnUnauthorized: false,
        onDone: () => {
          trackEvent('password_reset');
          popTo('Login');
        },
      }),
    );
  };
}

// A wrong current password shows as the request error; success returns to Profile with a notice.
export function changePassword(current_password: string, password: string, onDone: () => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.changePassword,
        param_data: { currentPassword: current_password, password },
        setLoading: authLoading('password'),
        onDone: () => {
          trackEvent('password_changed');
          successHaptic();
          dispatch(setNotice('Password updated.'));
          onDone();
        },
        onError: error => dispatch(authError('password')(error.field_errors.currentPassword ?? error.field_errors.password ?? error.message)),
      }),
    );
  };
}

// Leave the app either way: the local session is cleared even if the server call fails.
export function logoutUser(): AppThunk {
  return async dispatch => {
    const leave = () => {
      trackEvent('logout');
      dispatch(endSession());
      dispatch(setNotice('You’re logged out.'));
    };
    await dispatch(requestHandler({ apiService: apiServices.logout, setLoading: authLoading('logout'), endOnUnauthorized: false, onDone: leave, onError: leave }));
  };
}
