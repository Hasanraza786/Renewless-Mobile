import { MOCK_DATA } from '../config/mock-data';
import type { PaymentRecord, ReminderPreference, ReminderSettings, Receipt, ScanCycle, SubscriptionRecord } from '../types';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';
import { importedRecords } from './onboarding';

// Development mock repository shared by the Home and subscription adapters. Isolated in memory;
// resetMockSubscriptions restores the fixtures.

let records: SubscriptionRecord[] | null = null;
let removed = new Map<string, SubscriptionRecord>();
let built_for = '';
let reminder_settings: ReminderSettings | null = null;
// Only the fixture account owns the fixture dataset; any other mock account starts empty.
let account_id: string = MOCK_DATA.auth_accounts[0].id;

export function setMockAccount(id: string) {
  account_id = id;
}

export const isFixtureAccount = () => account_id === MOCK_DATA.auth_accounts[0].id;

type Fixture = (typeof MOCK_DATA.home_subscriptions)[number] & {
  price_history?: readonly { id: string; from_amount: string; to_amount: string; effective_in_days: number; source: 'user' | 'gmail' }[];
  trial?: { start_in_days: number; auto_renew: boolean };
  cancelled_in_days?: number;
  // Confirmed access end (Expired), days from today.
  expired_in_days?: number;
};

const reminderFor = (days: number | null): ReminderPreference => (days ? { mode: 'days', days: [days] } : { mode: 'default' });

function fromFixture(item: Fixture, today: string): SubscriptionRecord {
  const scenario = MOCK_DATA.home_scenario;
  const offsets = MOCK_DATA.home_event_offsets[scenario] ?? {};
  const shift = scenario === 'quiet' && item.next_in_days !== null && item.next_in_days >= 0 ? 8 : 0;
  const next_offset = item.next_in_days === null ? null : (offsets[item.id] ?? item.next_in_days) + shift;
  const next_date = next_offset === null ? null : addDays(today, next_offset);
  const day = (offset: number | null | undefined) => (offset === null || offset === undefined ? null : addDays(today, offset));
  const inbox = MOCK_DATA.home_inbox;
  return {
    id: item.id,
    platform_id: item.platform_id,
    name: item.name,
    plan: item.plan,
    category: item.category,
    price: item.price,
    currency: item.currency,
    cycle: item.cycle as ScanCycle,
    next_date: item.trial ? null : next_date,
    estimated: item.estimated,
    auto_renew: item.auto_renew,
    trial: item.trial && next_date ? { start_date: day(item.trial.start_in_days)!, end_date: next_date, auto_renew: item.trial.auto_renew } : null,
    status: item.expired_in_days !== undefined ? 'expired' : item.cancelled_in_days !== undefined ? 'cancelled' : 'active',
    cancelled_on: day(item.cancelled_in_days),
    access_until: day(item.expired_in_days),
    start_date: day(item.start_in_days),
    source: { kind: item.source as 'manual' | 'gmail', email: inbox.email },
    inbox: { email: inbox.email, last_sync: new Date(Date.now() - inbox.last_sync_hours_ago * 3600000).toISOString() },
    reminder: reminderFor(item.reminder_days),
    notes: null,
    manage_url: MOCK_DATA.manage_urls[item.platform_id] ?? null,
    price_history: (item.price_history ?? []).map(change => ({
      id: change.id,
      reason: 'price_changed',
      from_amount: change.from_amount,
      from_cycle: item.cycle as ScanCycle,
      to_amount: change.to_amount,
      to_cycle: item.cycle as ScanCycle,
      currency: item.currency,
      effective_on: addDays(today, change.effective_in_days),
      source: change.source,
    })),
  };
}

// Records saved during onboarding replace the fixture account, so a new user sees what they saved.
function fromImported(today: string): SubscriptionRecord[] {
  return importedRecords().map(item => ({
    id: item.id,
    platform_id: item.platform_id,
    name: item.name,
    plan: null,
    category: 'Entertainment',
    price: item.price,
    currency: item.currency,
    cycle: item.cycle,
    next_date: item.trial ? null : item.next_date,
    estimated: item.estimated,
    auto_renew: item.trial ? item.trial.auto_renew : true,
    trial: item.trial && item.next_date ? { start_date: today, end_date: item.next_date, auto_renew: item.trial.auto_renew } : null,
    status: 'active',
    cancelled_on: null,
    access_until: null,
    start_date: null,
    source: { kind: 'gmail', email: MOCK_DATA.google_account.email },
    inbox: { email: MOCK_DATA.google_account.email, last_sync: new Date().toISOString() },
    reminder: { mode: 'default' },
    notes: null,
    manage_url: MOCK_DATA.manage_urls[item.platform_id] ?? null,
    price_history: [],
  }));
}

export function resetMockSubscriptions() {
  records = null;
  removed = new Map();
  built_for = '';
  reminder_settings = null;
}

// Account reminder preferences, shared by Reminder settings and Detail's account default.
export function accountReminderSettings(): ReminderSettings {
  return reminder_settings ?? { push_enabled: true, renewals: true, trials: true, days: [...MOCK_DATA.account_reminder_days], time: '09:00' };
}

export function setAccountReminderSettings(settings: ReminderSettings) {
  reminder_settings = { ...settings, days: [...settings.days] };
  return accountReminderSettings();
}

export const findRemoved = (id: string) => removed.get(id) ?? null;

export function allRecords(): SubscriptionRecord[] {
  const today = localToday();
  const imported = importedRecords().length;
  const key = `${today}:${imported}:${account_id}`;
  if (!records || built_for !== key) {
    const fixture_owner = isFixtureAccount();
    records = imported ? fromImported(today) : MOCK_DATA.home_scenario === 'empty' || !fixture_owner ? [] : (MOCK_DATA.home_subscriptions as readonly Fixture[]).map(item => fromFixture(item, today));
    built_for = key;
  }
  return records;
}

export function findRecord(id: string) {
  return allRecords().find(item => item.id === id) ?? null;
}

export function updateRecord(id: string, change: (record: SubscriptionRecord) => SubscriptionRecord) {
  const list = allRecords();
  const index = list.findIndex(item => item.id === id);
  if (index < 0) throw new Error('This subscription is no longer available.');
  list[index] = change(list[index]);
  return list[index];
}

export function addRecord(record: SubscriptionRecord) {
  allRecords().push(record);
  return record;
}

// Tombstone by stable ID; restoreRecord undoes it without touching receipts.
export function removeRecord(id: string) {
  const list = allRecords();
  const index = list.findIndex(item => item.id === id);
  if (index < 0) throw new Error('This subscription is no longer available.');
  removed.set(id, list[index]);
  list.splice(index, 1);
}

export function restoreRecord(id: string) {
  const record = removed.get(id);
  if (!record) throw new Error('This subscription can no longer be restored.');
  removed.delete(id);
  allRecords().push(record);
  return record;
}

function datedReceipts(): Receipt[] {
  const today = localToday();
  const month_start = `${today.slice(0, 7)}-01`;
  return MOCK_DATA.home_receipts.map(({ paid_days_ago, this_month, ...item }) => {
    const date = addDays(today, -paid_days_ago);
    return { ...item, paid_on: this_month && date < month_start ? month_start : date };
  });
}

// Successful Gmail receipts for the current records.
// The 'none' payments scenario has no confirmed receipts anywhere (Home, Detail, Payments).
export function allReceipts(): Receipt[] {
  if (MOCK_DATA.payments_scenario === 'none') return [];
  const ids = new Set(allRecords().map(item => item.id));
  return datedReceipts().filter(item => ids.has(item.subscription_id));
}

// Confirmed payments, newest first; a removed subscription keeps its payments with the retained snapshot.
export function allPayments(): PaymentRecord[] {
  if (MOCK_DATA.payments_scenario === 'none') return [];
  const current = new Map(allRecords().map(item => [item.id, item]));
  return datedReceipts()
    .flatMap(item => {
      const record = current.get(item.subscription_id) ?? removed.get(item.subscription_id);
      if (!record) return [];
      // shortcut: fixtures carry no separate billing anchor, so the billing date is the payment date; the backend sends the real cycle anchor.
      return [{ ...item, name: record.name, platform_id: record.platform_id, billing_date: item.paid_on, source: 'gmail' as const, inbox_email: MOCK_DATA.home_inbox.email, subscription_available: current.has(item.subscription_id) }];
    })
    .sort((a, b) => b.paid_on.localeCompare(a.paid_on) || a.id.localeCompare(b.id));
}
