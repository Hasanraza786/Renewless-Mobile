import { deleteDisabledAccount, login } from '../src/redux/actions/auth-action';
import { connectOnboardingGoogle } from '../src/redux/actions/onboarding-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), popTo: jest.fn(), goBack: jest.fn(), resetRoot: jest.fn() }));
jest.mock('../src/utils/social-sign-in', () => ({ gmailSignIn: async () => ({ idToken: 'id-1', serverAuthCode: 'code-1' }), outlookSignIn: jest.fn() }));
const mockApi = { login: jest.fn(), googleConnect: jest.fn(), deleteDisabledAccount: jest.fn() };
jest.mock('../src/api_services/request-handler', () => ({ __esModule: true, default: new Proxy({}, { get: (_target, key: string) => (...args: unknown[]) => (mockApi as Record<string, jest.Mock>)[key](...args) }) }));

let actions: { type: string; payload?: unknown }[] = [];
const dispatch = (action: unknown): unknown => {
  if (typeof action === 'function') return action(dispatch, () => ({ constant: { token: '' } }), undefined);
  actions.push(action as { type: string });
  return action;
};
const payloads = (type: string) => actions.filter(action => action.type === type).map(action => action.payload);
const { ApiError } = jest.requireActual('../src/api_services/http-provider');

beforeEach(() => {
  actions = [];
  mockApi.deleteDisabledAccount.mockReset().mockResolvedValue({ deleted: true });
});

test('a disabled account deletes itself from the login error with the email and password just given', async () => {
  mockApi.login.mockRejectedValue(new ApiError(401, 'ACCOUNT_DISABLED', 'This account has been disabled.'));
  await dispatch(login(' a@b.com ', 'secret123', undefined, jest.fn()));

  expect(payloads('auth/setDisabledAccount')).toEqual([{ message: 'This account has been disabled.', step: 'notice', deleting: false, error: '' }]);
  expect(mockApi.deleteDisabledAccount).not.toHaveBeenCalled();
  await dispatch(deleteDisabledAccount());

  expect(mockApi.deleteDisabledAccount).toHaveBeenCalledWith({ email: 'a@b.com', password: 'secret123' });
  expect(payloads('auth/setDisabledAccount')).toEqual([expect.anything(), null]);
  expect(payloads('profile/setNotice')).toEqual(['Account deleted.']);
});

test('onboarding Connect Gmail offers the same deletion, proved by the Google sign-in just given', async () => {
  mockApi.googleConnect.mockRejectedValue(new ApiError(403, 'ACCOUNT_DISABLED', 'This account has been disabled.'));
  const onDiscovering = jest.fn();
  await dispatch(connectOnboardingGoogle(onDiscovering, jest.fn()));
  await dispatch(deleteDisabledAccount());

  expect(mockApi.deleteDisabledAccount).toHaveBeenCalledWith({ provider: 'google', idToken: 'id-1' });
  expect(onDiscovering).not.toHaveBeenCalled();
});

test('a failed deletion keeps the dialog open with the server message', async () => {
  mockApi.login.mockRejectedValue(new ApiError(401, 'ACCOUNT_DISABLED', 'This account has been disabled.'));
  mockApi.deleteDisabledAccount.mockRejectedValue(new ApiError(401, 'INVALID_CREDENTIALS', 'Wrong email or password. Please try again.'));
  await dispatch(login('a@b.com', 'secret123', undefined, jest.fn()));
  await dispatch(deleteDisabledAccount());

  expect(payloads('auth/updateDisabledAccount')).toContainEqual({ error: 'Wrong email or password. Please try again.' });
  expect(payloads('auth/setDisabledAccount')).toHaveLength(1);
  expect(payloads('profile/setNotice')).toEqual([]);
});
