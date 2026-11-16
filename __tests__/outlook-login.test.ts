import { Alert } from 'react-native';
import { toProfile } from '../src/api_services/adapters';
import { ApiError } from '../src/api_services/http-provider';
import { socialLogin } from '../src/redux/actions/auth-action';
import { deleteAccount } from '../src/redux/actions/profile-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), popTo: jest.fn(), goBack: jest.fn(), resetRoot: jest.fn() }));
jest.mock('../src/utils/session-token', () => ({ saveSessionToken: jest.fn(), clearSessionToken: jest.fn(), sessionToken: () => null }));
const mockTrack = jest.fn();
jest.mock('../src/utils/analytics', () => ({ trackEvent: (...args: unknown[]) => mockTrack(...args) }));
const mockOutlookSignIn = jest.fn();
jest.mock('../src/utils/social-sign-in', () => ({ outlookSignIn: () => mockOutlookSignIn(), providerSignIn: jest.fn(), gmailSignIn: jest.fn() }));
const mockOutlookLogin = jest.fn();
const mockDeleteMe = jest.fn();
jest.mock('../src/api_services/request-handler', () => ({
  __esModule: true,
  default: { outlookLogin: (body: unknown) => mockOutlookLogin(body), deleteMe: (body: unknown) => mockDeleteMe(body), updateDevice: () => Promise.resolve() },
}));

const grant = { code: 'c', codeVerifier: 'v', redirectUri: 'com.renewless://oauth/outlook' };
const user = { id: 'u1', name: 'Alex', email: 'alex@hotmail.com', emailVerified: true, providers: ['microsoft'], hasPassword: false, phone: null, dateOfBirth: null, gender: null, timezone: 'UTC', onboardingCompleted: false, revision: 0 };
const connector = { id: 'o1', email: 'alex@hotmail.com', provider: 'outlook', status: 'connected', lastSuccessfulSyncAt: null, nextSyncAt: null };

const actions: { type: string; payload?: unknown }[] = [];
const state = { constant: { token: '', user: null } };
const dispatch = (action: unknown): unknown => (typeof action === 'function' ? action(dispatch, () => state, undefined) : actions.push(action as never));

beforeEach(() => {
  actions.length = 0;
  jest.clearAllMocks();
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  mockOutlookSignIn.mockResolvedValue(grant);
});

test('an Outlook account maps to the microsoft sign-in provider', () => {
  expect(toProfile(user as never).provider).toBe('microsoft');
});

test('Continue with Outlook sends the code to /auth/outlook and starts the session', async () => {
  mockOutlookLogin.mockResolvedValueOnce({ token: 't1', user, isNewUser: true, inboxLimit: false, scannedBefore: false, connector });
  await dispatch(socialLogin('microsoft', undefined));
  expect(mockOutlookLogin).toHaveBeenCalledWith(grant);
  expect(actions.some(a => a.type === 'constant/setSession')).toBe(true);
  expect(mockTrack).toHaveBeenCalledWith('sign_up', { method: 'microsoft' });
});

test('a closed Microsoft sheet does nothing; EMAIL_TAKEN shows the server message', async () => {
  mockOutlookSignIn.mockResolvedValueOnce(null);
  await dispatch(socialLogin('microsoft', undefined));
  expect(mockOutlookLogin).not.toHaveBeenCalled();
  mockOutlookLogin.mockRejectedValueOnce(new ApiError(409, 'EMAIL_TAKEN', 'An account with this email already exists. Log in with it, then connect Outlook.'));
  await dispatch(socialLogin('microsoft', undefined));
  expect(Alert.alert).toHaveBeenCalledWith('An account with this email already exists. Log in with it, then connect Outlook.');
});

test('deleting an Outlook account confirms with a fresh Microsoft sign-in', async () => {
  mockDeleteMe.mockResolvedValueOnce({ deleted: true });
  await dispatch(deleteAccount('microsoft', ''));
  expect(mockDeleteMe).toHaveBeenCalledWith({ provider: 'microsoft', ...grant });
});
