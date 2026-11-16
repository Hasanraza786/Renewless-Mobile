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
