import { Alert, type AlertButton } from 'react-native';
import { login } from '../src/redux/actions/auth-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), popTo: jest.fn(), goBack: jest.fn(), resetRoot: jest.fn() }));
const mockApi = { login: jest.fn(), deleteDisabledAccount: jest.fn() };
jest.mock('../src/api_services/request-handler', () => ({ __esModule: true, default: new Proxy({}, { get: (_target, key: string) => (...args: unknown[]) => (mockApi as Record<string, jest.Mock>)[key](...args) }) }));

const actions: { type: string; payload?: unknown }[] = [];
const dispatch = (action: unknown): unknown => {
  if (typeof action === 'function') return action(dispatch, () => ({}), undefined);
  actions.push(action as { type: string });
  return action;
};
const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
const press = (call: number, text: string) => (alert.mock.calls[call][2] as AlertButton[]).find(button => button.text === text)?.onPress?.();

test('a disabled account deletes itself from the login error with the email and password just given', async () => {
  const { ApiError } = jest.requireActual('../src/api_services/http-provider');
  mockApi.login.mockRejectedValue(new ApiError(401, 'ACCOUNT_DISABLED', 'This account has been disabled.'));
  mockApi.deleteDisabledAccount.mockResolvedValue({ deleted: true });
  await dispatch(login(' a@b.com ', 'secret123', undefined, jest.fn()));

  expect(alert.mock.calls[0][0]).toBe('This account has been disabled.');
  press(0, 'Delete my account');
  expect(alert.mock.calls[1][0]).toBe('Delete your Renewless account?');
  expect(mockApi.deleteDisabledAccount).not.toHaveBeenCalled();
  await press(1, 'Delete account');

  expect(mockApi.deleteDisabledAccount).toHaveBeenCalledWith({ email: 'a@b.com', password: 'secret123' });
  expect(actions.filter(action => action.type === 'profile/setNotice').map(action => action.payload)).toEqual(['Account deleted.']);
});
