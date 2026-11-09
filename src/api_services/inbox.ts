import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { InboxDetail, ProfileInbox, SubscriptionRecord } from '../types';
import { request } from './http';
import { allRecords, isFixtureAccount } from './subscription-store';

// Development connector state; resetMockInbox restores the fixture.
let state: { status: ProfileInbox['status']; last_sync: string | null; connected: boolean } | null = null;

const current = () => {
  if (!state) {
    const inbox = MOCK_DATA.home_inbox;
    state = {
      status: MOCK_DATA.inbox_scenario === 'reconnect' ? 'reconnect' : 'synced',
      last_sync: new Date(Date.now() - inbox.last_sync_hours_ago * 3600000).toISOString(),
      connected: MOCK_DATA.profile_inbox_scenario !== 'none',
    };
  }
  return state;
};

// The mock connector as Detail sees it, so sync/disconnect show on every surface.
export function mockInboxLink() {
  const inbox = current();
  return { email: MOCK_DATA.home_inbox.email, last_sync: inbox.last_sync, connected: inbox.connected };
}

export function resetMockInbox() {
  state = null;
}

const INBOX_ID = 'inbox-1';
const mockDelay = (ms = 350) => new Promise<void>(resolve => setTimeout(resolve, ms));
const imported = () => allRecords().filter(record => record.source.kind === 'gmail' && record.source.email === MOCK_DATA.home_inbox.email);

// The account's connected inboxes for Profile; empty once disconnected, and for any non-fixture account.
export function mockInboxes(): ProfileInbox[] {
  const inbox = current();
  return inbox.connected && isFixtureAccount() ? [{ id: INBOX_ID, email: MOCK_DATA.home_inbox.email, status: inbox.status, lastSync: inbox.last_sync }] : [];
}

function detail(): InboxDetail {
  const [inbox] = mockInboxes();
  if (!inbox) throw new Error('This inbox is no longer connected.');
  return { ...inbox, imported_count: imported().length };
}

export async function getInbox(token: string, id: string): Promise<InboxDetail> {
  if (!USE_MOCK_API) return request<InboxDetail>(`/connectors/${id}`, { token });
  await mockDelay();
  return detail();
}

// Records originally imported from this connector (manual/AI records with Gmail matches are excluded).
export async function listInboxSubscriptions(token: string, id: string): Promise<SubscriptionRecord[]> {
  if (!USE_MOCK_API) return request<SubscriptionRecord[]>(`/connectors/${id}/subscriptions`, { token });
  await mockDelay();
  detail();
  return imported();
}

// Incremental sync job; a failure keeps the previous last-success time and saved records.
export async function syncInbox(token: string, id: string): Promise<InboxDetail> {
  if (!USE_MOCK_API) return request<InboxDetail>(`/connectors/${id}/sync`, { method: 'POST', token });
  await mockDelay(1200);
  if (MOCK_DATA.inbox_scenario === 'sync_fails') throw new Error('Unable to sync right now. Your saved subscriptions haven’t changed.');
  current().last_sync = new Date().toISOString();
  return detail();
}

// shortcut: the mock renews consent directly; production runs Google OAuth for this owned connector first.
export async function reconnectInbox(token: string, id: string): Promise<InboxDetail> {
  if (!USE_MOCK_API) return request<InboxDetail>(`/connectors/${id}/reconnect`, { method: 'POST', token });
  await mockDelay();
  current().status = 'synced';
  return detail();
}

// Stops reading the inbox; every imported subscription, payment and reminder stays.
export async function disconnectInbox(token: string, id: string): Promise<{ ok: true }> {
  if (!USE_MOCK_API) return request<{ ok: true }>(`/connectors/${id}`, { method: 'DELETE', token });
  await mockDelay();
  current().connected = false;
  return { ok: true };
}
