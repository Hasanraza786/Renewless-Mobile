import { isAuthExpired, toInbox } from '../src/api_services/adapters';
import { ApiError } from '../src/api_services/http-provider';
import { INBOX_LIMIT_NOTICE, connectOutlookInbox } from '../src/redux/actions/gmail-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('../src/redux/actions/profile-action', () => ({ getProfileOverview: () => ({ type: 'overview' }) }));
const mockOutlookSignIn = jest.fn();
jest.mock('../src/utils/social-sign-in', () => ({ outlookSignIn: () => mockOutlookSignIn(), gmailSignIn: jest.fn() }));
const mockOutlookConnect = jest.fn();
jest.mock('../src/api_services/request-handler', () => ({
  __esModule: true,
  default: { outlookConnect: (body: unknown) => mockOutlookConnect(body) },
}));

const actions: unknown[] = [];
const dispatch = (action: unknown): unknown => (typeof action === 'function' ? action(dispatch, () => ({}), undefined) : actions.push(action));
const grant = { code: 'c', codeVerifier: 'v', redirectUri: 'com.renewless://oauth/outlook' };
const connector = { id: 'o1', email: 'alex@hotmail.com', provider: 'outlook', status: 'connected', lastSuccessfulSyncAt: null, nextSyncAt: null };
const notices = () => actions.map(action => (action as { payload?: unknown }).payload).filter(payload => typeof payload === 'string');

async function connect() {
  const result = { connected: jest.fn(), limit: jest.fn(), not_connected: jest.fn() };
  await dispatch(connectOutlookInbox(result.connected, result.limit, result.not_connected));
  return result;
}

beforeEach(() => {
  actions.length = 0;
  mockOutlookSignIn.mockReset();
  mockOutlookConnect.mockReset();
});

test('a connector without provider (older backend) is Gmail; Outlook keeps its provider', () => {
  expect(toInbox({ ...connector, provider: undefined } as never).provider).toBe('gmail');
  expect(toInbox(connector as never).provider).toBe('outlook');
});

test('an expired Outlook permission is handled like an expired Gmail one', () => {
  expect(isAuthExpired('OUTLOOK_AUTH_EXPIRED')).toBe(true);
  expect(isAuthExpired('GMAIL_AUTH_EXPIRED')).toBe(true);
  expect(isAuthExpired('NETWORK')).toBe(false);
});

test('the code goes to the backend, never exchanged on the phone, and the new inbox connects', async () => {
  mockOutlookSignIn.mockResolvedValueOnce(grant);
  mockOutlookConnect.mockResolvedValueOnce({ connector, scannedBefore: false });
  const result = await connect();
  expect(mockOutlookConnect).toHaveBeenCalledWith(grant);
  expect(result.connected).toHaveBeenCalledWith(expect.objectContaining({ id: 'o1', provider: 'outlook' }));
});

test('closing the Microsoft sheet does nothing', async () => {
  mockOutlookSignIn.mockResolvedValueOnce(null);
  const result = await connect();
  expect(mockOutlookConnect).not.toHaveBeenCalled();
  expect(result.not_connected).toHaveBeenCalled();
  expect(notices()).toEqual([]);
});

test('denied access asks to allow Outlook; the shared 2-inbox limit opens the limit dialog', async () => {
  mockOutlookSignIn.mockResolvedValue(grant);
  mockOutlookConnect.mockRejectedValueOnce(new ApiError(400, 'OUTLOOK_ACCESS_DENIED', 'denied'));
  await connect();
  expect(notices()).toContain('Allow Outlook access to connect this inbox.');
  mockOutlookConnect.mockRejectedValueOnce(new ApiError(403, 'GMAIL_INBOX_LIMIT', 'limit'));
  expect((await connect()).limit).toHaveBeenCalled();
  expect(INBOX_LIMIT_NOTICE).toBe('You’ve used your 2 inboxes. You can reconnect an inbox you used before.');
});
