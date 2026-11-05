import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { Cycle, ReminderPreference, SubscriptionFormInput, RenewalNotice, ScanCycle, Subscription, SubscriptionDetail, SubscriptionRecord } from '../types';
import { localToday } from '../utils/dates';
import { request } from './http';
import { accountReminderSettings, addRecord, allReceipts, allRecords, findRecord, removeRecord, restoreRecord, updateRecord } from './subscription-store';

export type SubscriptionInput = {
  name: string;
  price: number;
  currency: string;
  cycle: Cycle;
  startDate: string;
  nextRenewal: string;
  note?: string;
};

export function listSubscriptions(token: string) {
  return request<{ subscriptions: Subscription[] }>('/subscriptions', { token });
}

export function getSubscription(token: string, id: string) {
  return request<Subscription>(`/subscriptions/${id}`, { token });
}

export function createSubscription(token: string, input: SubscriptionInput) {
  return request<Subscription>('/subscriptions', {
    method: 'POST',
    token,
    body: input,
  });
}

export function updateSubscription(
  token: string,
  id: string,
  input: SubscriptionInput,
) {
  return request<Subscription>(`/subscriptions/${id}`, {
    method: 'PATCH',
    token,
    body: input,
  });
}

export function deleteSubscription(token: string, id: string) {
  return request<{ ok: true }>(`/subscriptions/${id}`, {
    method: 'DELETE',
    token,
  });
}

export function listNotifications(token: string) {
  return request<{ notifications: RenewalNotice[] }>('/notifications', { token });
}

// ---- Tracked subscription Detail and related operations (mock adapter in development). ----

const ANNUAL_FACTOR: Record<ScanCycle, number> = { Weekly: 52, Monthly: 12, Quarterly: 4, Yearly: 1 };

function detailFor(record: SubscriptionRecord): SubscriptionDetail {
  const today = localToday();
  const receipts = allReceipts().filter(item => item.subscription_id === record.id && item.paid_on <= today);
  const totals = new Map<string, number>();
  for (const item of receipts) totals.set(item.currency, (totals.get(item.currency) ?? 0) + Math.round(Number(item.amount) * 100));
  return {
    record,
    today,
    receipts: { totals: [...totals].map(([currency, amount]) => ({ currency, amount: (amount / 100).toFixed(2) })), count: receipts.length },
    annual_estimate: ((Math.round(Number(record.price) * 100) * ANNUAL_FACTOR[record.cycle]) / 100).toFixed(2),
    related_count: allRecords().filter(item => item.platform_id === record.platform_id && item.id !== record.id).length,
    account_reminder_days: accountReminderSettings().days,
  };
}

const mockDelay = () => new Promise<void>(resolve => setTimeout(resolve, 350));

export async function getSubscriptionDetail(token: string, id: string): Promise<SubscriptionDetail> {
  if (!USE_MOCK_API) return request<SubscriptionDetail>(`/subscriptions/${id}/detail`, { token });
  await mockDelay();
  const record = findRecord(id);
  if (!record) throw new Error('This subscription is no longer available.');
  return detailFor(record);
}

// Every owned plan on a canonical platform, optionally without the one being viewed.
export async function listPlatformSubscriptions(token: string, platform_id: string, exclude_id?: string): Promise<SubscriptionRecord[]> {
  if (!USE_MOCK_API) return request<SubscriptionRecord[]>(`/platforms/${platform_id}/subscriptions${exclude_id ? `?exclude=${exclude_id}` : ''}`, { token });
  await mockDelay();
  return allRecords().filter(item => item.platform_id === platform_id && item.id !== exclude_id);
}

// Records Renewless tracking only; the user cancels with the provider separately.
export async function cancelTracking(token: string, id: string, input: { cancelled_on: string; access_until: string | null }): Promise<SubscriptionDetail> {
  if (!USE_MOCK_API) return request<SubscriptionDetail>(`/subscriptions/${id}/cancel`, { method: 'POST', token, body: input });
  await mockDelay();
  return detailFor(updateRecord(id, record => ({ ...record, status: 'cancelled', cancelled_on: input.cancelled_on, access_until: input.access_until, reminder: { mode: 'off' } })));
}

export async function resumeTracking(token: string, id: string, input: { price: string; next_date: string; reminder: ReminderPreference }): Promise<SubscriptionDetail> {
  if (!USE_MOCK_API) return request<SubscriptionDetail>(`/subscriptions/${id}/resume`, { method: 'POST', token, body: input });
  await mockDelay();
  return detailFor(
    updateRecord(id, record => ({ ...record, status: 'active', cancelled_on: null, access_until: null, trial: null, price: input.price, next_date: input.next_date, estimated: false, reminder: input.reminder })),
  );
}

export async function setReminder(token: string, id: string, reminder: ReminderPreference): Promise<SubscriptionDetail> {
  if (!USE_MOCK_API) return request<SubscriptionDetail>(`/subscriptions/${id}/reminder`, { method: 'PUT', token, body: reminder });
  await mockDelay();
  return detailFor(updateRecord(id, record => ({ ...record, reminder })));
}

export async function setNotes(token: string, id: string, notes: string): Promise<SubscriptionDetail> {
  if (!USE_MOCK_API) return request<SubscriptionDetail>(`/subscriptions/${id}/notes`, { method: 'PUT', token, body: { notes } });
  await mockDelay();
  return detailFor(updateRecord(id, record => ({ ...record, notes: notes.trim() || null })));
}

// Removal is a tombstone by stable ID; restore is the Undo.
export async function removeTracking(token: string, id: string): Promise<{ ok: true }> {
  if (!USE_MOCK_API) return request<{ ok: true }>(`/subscriptions/${id}/tracking`, { method: 'DELETE', token });
  await mockDelay();
  removeRecord(id);
  return { ok: true };
}

export async function restoreTracking(token: string, id: string): Promise<{ ok: true }> {
  if (!USE_MOCK_API) return request<{ ok: true }>(`/subscriptions/${id}/tracking/restore`, { method: 'POST', token });
  await mockDelay();
  restoreRecord(id);
  return { ok: true };
}

// The complete tracked collection for List; filtering/sorting runs over all of it, so counts stay global.
export async function listTrackedSubscriptions(token: string): Promise<{ records: SubscriptionRecord[]; today: string }> {
  if (!USE_MOCK_API) return request<{ records: SubscriptionRecord[]; today: string }>('/subscriptions/tracked', { token });
  await mockDelay();
  return { records: [...allRecords()], today: localToday() };
}

// Fields Add/Edit own; source, inbox, reminder and history stay with the record.
function formFields(input: SubscriptionFormInput, platform_id: string) {
  return {
    name: input.name,
    platform_id,
    category: input.category,
    price: input.price,
    currency: input.currency,
    cycle: input.cycle,
    start_date: input.start_date,
    next_date: input.next_date,
    // A manual date is explicit, so it is no longer an estimate.
    estimated: false,
    trial: input.trial && input.start_date ? { start_date: input.start_date, end_date: input.trial.end_date, auto_renew: input.trial.auto_renew } : null,
    auto_renew: input.trial ? input.trial.auto_renew : true,
    notes: input.notes,
  };
}

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function createTracked(token: string, input: SubscriptionFormInput): Promise<SubscriptionRecord> {
  if (!USE_MOCK_API) return request<SubscriptionRecord>('/subscriptions/tracked', { method: 'POST', token, body: input });
  await mockDelay();
  const inbox = MOCK_DATA.home_inbox;
  return addRecord({
    id: `sub-manual-${Date.now()}`,
    ...formFields(input, input.platform_id ?? `custom-${slug(input.name)}`),
    plan: null,
    status: 'active',
    cancelled_on: null,
    access_until: null,
    source: { kind: 'manual', email: inbox.email },
    inbox: null,
    reminder: { mode: 'default' },
    manage_url: input.platform_id ? MOCK_DATA.manage_urls[input.platform_id] ?? null : null,
    price_history: [],
  });
}

// A changed amount/currency/cycle adds a Price history entry; earlier receipts never change.
export async function updateTracked(token: string, id: string, input: SubscriptionFormInput): Promise<SubscriptionDetail> {
  if (!USE_MOCK_API) return request<SubscriptionDetail>(`/subscriptions/${id}/tracked`, { method: 'PUT', token, body: input });
  await mockDelay();
  return detailFor(
    updateRecord(id, record => ({
      ...record,
      ...formFields(input, input.platform_id ?? record.platform_id),
      price_history: input.price_change
        ? [
            {
              id: `ph-${Date.now()}`,
              reason: input.price_change.reason,
              from_amount: record.price,
              from_cycle: record.cycle,
              to_amount: input.price,
              to_cycle: input.cycle,
              currency: input.currency,
              effective_on: input.price_change.effective_on,
              source: 'user' as const,
            },
            ...record.price_history,
          ]
        : record.price_history,
    })),
  );
}
