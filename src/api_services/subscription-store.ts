import { MOCK_DATA } from '../config/mock-data';
import type { ReminderPreference, Receipt, ScanCycle, SubscriptionRecord } from '../types';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';
import { importedRecords } from './onboarding';

// Development mock repository shared by the Home and subscription adapters. Isolated in memory;
// resetMockSubscriptions restores the fixtures.

let records: SubscriptionRecord[] | null = null;
let removed = new Map<string, SubscriptionRecord>();
let built_for = '';

type Fixture = (typeof MOCK_DATA.home_subscriptions)[number] & {
  price_history?: readonly { id: string; from_amount: string; to_amount: string; effective_in_days: number; source: 'user' | 'gmail' }[];
  trial?: { start_in_days: number; auto_renew: boolean };
  cancelled_in_days?: number;
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
    status: item.cancelled_in_days !== undefined ? 'cancelled' : 'active',
    cancelled_on: day(item.cancelled_in_days),
    access_until: null,
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
}

export function allRecords(): SubscriptionRecord[] {
  const today = localToday();
  const imported = importedRecords().length;
  const key = `${today}:${imported}`;
  if (!records || built_for !== key) {
    records = imported ? fromImported(today) : MOCK_DATA.home_scenario === 'empty' ? [] : (MOCK_DATA.home_subscriptions as readonly Fixture[]).map(item => fromFixture(item, today));
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

// Successful Gmail receipts for the current records.
export function allReceipts(): Receipt[] {
  const today = localToday();
  const month_start = `${today.slice(0, 7)}-01`;
  const ids = new Set(allRecords().map(item => item.id));
  return MOCK_DATA.home_receipts
    .filter(item => ids.has(item.subscription_id))
    .map(({ paid_days_ago, this_month, ...item }) => {
      const date = addDays(today, -paid_days_ago);
      return { ...item, paid_on: this_month && date < month_start ? month_start : date };
    });
}
