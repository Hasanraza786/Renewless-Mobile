import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { Cycle, ReminderPreference, RenewalNotice, ScanCycle, Subscription, SubscriptionDetail, SubscriptionRecord } from '../types';
import { localToday } from '../utils/dates';
import { request } from './http';
import { allReceipts, allRecords, findRecord, removeRecord, restoreRecord, updateRecord } from './subscription-store';

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
    account_reminder_days: [...MOCK_DATA.account_reminder_days],
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
