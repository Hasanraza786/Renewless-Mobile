import { ApiError } from '../src/api_services/http-provider';
import apiServices from '../src/api_services/request-handler';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
const mockPost = jest.fn();
jest.mock('../src/api_services/http-provider', () => {
  const actual = jest.requireActual('../src/api_services/http-provider');
  return { ...actual, post: (...args: unknown[]) => mockPost(...args) };
});

const busy = () => new ApiError(409, 'REQUEST_IN_PROGRESS', 'This is already in progress. Try again in a moment.');
const grant = { idToken: 'id', serverAuthCode: 'code' };

beforeEach(() => {
  jest.useFakeTimers();
  mockPost.mockReset();
});
afterEach(() => jest.useRealTimers());

test('a Gmail connect that is still running elsewhere is asked again, then succeeds', async () => {
  mockPost.mockRejectedValueOnce(busy()).mockResolvedValueOnce({ isNewUser: false });
  const result = apiServices.googleConnect(grant);
  await jest.advanceTimersByTimeAsync(1500);
  await expect(result).resolves.toEqual({ isNewUser: false });
  expect(mockPost).toHaveBeenCalledTimes(2);
});

test('it gives up after three more tries, and other errors are not retried', async () => {
  mockPost.mockRejectedValue(busy());
  const result = apiServices.googleConnect(grant).catch(error => error);
  await jest.advanceTimersByTimeAsync(4500);
  expect(await result).toMatchObject({ code: 'REQUEST_IN_PROGRESS' });
  expect(mockPost).toHaveBeenCalledTimes(4);

  mockPost.mockReset().mockRejectedValueOnce(new ApiError(400, 'VALIDATION', 'Check the highlighted fields.'));
  await expect(apiServices.googleConnect(grant)).rejects.toMatchObject({ code: 'VALIDATION' });
  expect(mockPost).toHaveBeenCalledTimes(1);
});

test('session requests send the device ID, name, platform and app version', async () => {
  jest.useRealTimers();
  mockPost.mockResolvedValue({});
  await apiServices.login({ email: 'a@b.co', password: 'pw' });
  await apiServices.social({ provider: 'google', idToken: 'id' });
  const [first, second] = mockPost.mock.calls.map(call => call[1].device);
  expect(first).toEqual({ deviceId: 'device-1', deviceName: 'Test phone', platform: 'ios', appVersion: '1.0.0' });
  expect(second).toEqual(first);
});
