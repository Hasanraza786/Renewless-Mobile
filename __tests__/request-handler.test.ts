import { ApiError } from '../src/api_services/http-provider';
import { endSession } from '../src/redux/endSession';
import { requestHandler } from '../src/redux/request-handler';
import { clearSessionToken, saveSessionToken } from '../src/utils/session-token';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('../src/redux/endSession', () => ({ endSession: jest.fn(() => ({ type: 'test/endSession' })) }));

const dispatch = jest.fn();
const run = (options: Parameters<typeof requestHandler>[0]) => requestHandler(options)(dispatch, () => ({}) as never, undefined);
const fails = (code: string) => () => Promise.reject(new ApiError(401, code, 'no'));

beforeEach(async () => {
  dispatch.mockClear();
  jest.mocked(endSession).mockClear();
  await saveSessionToken('token-a');
});

test('only a dead session signs out; Gmail, Outlook and provider 401s do not', async () => {
  for (const code of ['GMAIL_AUTH_EXPIRED', 'OUTLOOK_AUTH_EXPIRED', 'INVALID_TOKEN']) await run({ apiService: fails(code) });
  expect(endSession).not.toHaveBeenCalled();
  await run({ apiService: fails('UNAUTHORIZED') });
  await run({ apiService: fails('ACCOUNT_DISABLED') });
  expect(endSession).toHaveBeenCalledTimes(2);
});

test('a response that lands after logout is dropped', async () => {
  const onDone = jest.fn();
  const onError = jest.fn();
  let answer: (value: string) => void = () => {};
  const done = run({ apiService: () => new Promise<string>(resolve => (answer = resolve)), onDone });
  await clearSessionToken();
  answer('old user data');
  await done;
  expect(onDone).not.toHaveBeenCalled();

  await saveSessionToken('token-a');
  const failed = run({ apiService: () => clearSessionToken().then(() => Promise.reject(new ApiError(500, 'INTERNAL', 'x'))), onError });
  await failed;
  expect(onError).not.toHaveBeenCalled();
});

test('requests that started signed out still finish (login, onboarding)', async () => {
  await clearSessionToken();
  const onDone = jest.fn();
  await run({ apiService: () => saveSessionToken('token-b').then(() => 'session'), onDone });
  expect(onDone).toHaveBeenCalledWith('session');
});

test('a crash inside onDone is reported, not shown as a failed request', async () => {
  const { recordError } = jest.requireMock('@react-native-firebase/crashlytics');
  const onError = jest.fn();
  const setError = jest.fn((value: string) => ({ type: 'test/error', payload: value }));
  await run({ apiService: async () => 'saved', onDone: () => { throw new TypeError('x is undefined'); }, onError, setError });
  expect(onError).not.toHaveBeenCalled();
  expect(setError).not.toHaveBeenCalledWith('x is undefined');
  expect(recordError).toHaveBeenCalled();
});

test('a JS error from the service shows the generic message, not its own text', async () => {
  const onError = jest.fn();
  await run({ apiService: async () => { throw new TypeError('Cannot read property id of undefined'); }, onError });
  expect(onError.mock.calls[0][0].message).toBe('Something went wrong. Please try again.');
});

test('a session ended mid-use says why on Login, once for all its failing requests', async () => {
  // endSession clears the token, as the real one does, so the other requests of that session are stale.
  jest.mocked(endSession).mockImplementation(() => {
    clearSessionToken();
    return { type: 'test/endSession' } as never;
  });
  const notices = () => dispatch.mock.calls.filter(([action]) => action?.type === 'auth/setSessionEnded').map(([action]) => action.payload);
  await Promise.all([run({ apiService: fails('UNAUTHORIZED') }), run({ apiService: fails('UNAUTHORIZED') })]);
  expect(notices()).toEqual(['expired']);
  await saveSessionToken('token-a');
  await run({ apiService: fails('ACCOUNT_DISABLED') });
  expect(notices()).toEqual(['expired', 'disabled']);
});
