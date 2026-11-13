import { getSyncLockedInbox } from '../src/redux/actions/gmail-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
const mockGetConnectors = jest.fn();
jest.mock('../src/api_services/request-handler', () => ({ __esModule: true, default: { getConnectors: () => mockGetConnectors() } }));

const later = new Date(Date.now() + 3 * 86400000).toISOString();
const earlier = new Date(Date.now() - 86400000).toISOString();
const connector = (email: string, nextSyncAt: string | null, status = 'connected') => ({ id: email, email, status, lastSuccessfulSyncAt: earlier, nextSyncAt });
const dispatch = (action: unknown): unknown => (typeof action === 'function' ? action(dispatch, () => ({}), undefined) : action);

async function lockedInbox(connectors: unknown[]) {
  mockGetConnectors.mockResolvedValueOnce({ connectors });
  const onLoaded = jest.fn();
  await dispatch(getSyncLockedInbox(onLoaded));
  return onLoaded.mock.calls[0][0];
}

test('the card locks only when every connected inbox is waiting for its weekly sync', async () => {
  expect((await lockedInbox([connector('a@gmail.com', later)])).email).toBe('a@gmail.com');
  expect(await lockedInbox([connector('a@gmail.com', later), connector('b@gmail.com', earlier)])).toBeNull();
  expect(await lockedInbox([connector('a@gmail.com', null)])).toBeNull();
  expect(await lockedInbox([])).toBeNull();
  // An inbox that needs a reconnect is not counted as connected.
  expect(await lockedInbox([connector('a@gmail.com', later, 'reconnect_needed')])).toBeNull();
});
