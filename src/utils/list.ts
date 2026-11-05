import { COLORS } from '../constants/theme';
import type { SubscriptionRecord } from '../types';
import { daysBetween } from './events';

export type ListGroup = 'active' | 'on_trial' | 'trial_ended' | 'renewing_soon' | 'due_today' | 'needs_date' | 'cancelled' | 'expired';
export type ListSort = 'next' | 'price_asc' | 'price_desc' | 'name' | 'most';

// Status filter groups in display order, with their semantic colours.
export const LIST_GROUPS: { key: ListGroup; label: string; color: string }[] = [
  { key: 'active', label: 'Active', color: COLORS.primary },
  { key: 'on_trial', label: 'On trial', color: COLORS.trial },
  { key: 'trial_ended', label: 'Trial ended', color: COLORS.text_secondary },
  { key: 'renewing_soon', label: 'Renewing soon', color: COLORS.renewing_soon },
  { key: 'due_today', label: 'Due today', color: COLORS.due_today },
  { key: 'needs_date', label: 'Needs date', color: COLORS.trial },
  { key: 'cancelled', label: 'Cancelled', color: COLORS.text_secondary },
  { key: 'expired', label: 'Expired', color: COLORS.expired },
];

export const LIST_SORTS: { key: ListSort; label: string; help: string }[] = [
  { key: 'next', label: 'Next event', help: 'Next renewals and trial endings appear first. Undated plans stay last.' },
  { key: 'price_asc', label: 'Price: low to high', help: 'Price sorting uses the amounts shown on cards. Different currencies stay separate.' },
  { key: 'price_desc', label: 'Price: high to low', help: 'Price sorting uses the amounts shown on cards. Different currencies stay separate.' },
  { key: 'name', label: 'Name A–Z', help: 'Subscriptions are ordered by platform name.' },
  { key: 'most', label: 'Most subscriptions', help: 'Platforms with more matching subscriptions appear first.' },
];

// One group per record: explicit cancelled/expired first, then trial state, then the date.
export function listGroup(record: SubscriptionRecord, today: string): ListGroup {
  if (record.status === 'cancelled') return 'cancelled';
  if (record.status === 'expired') return 'expired';
  if (record.trial && record.trial.end_date < today && !record.trial.auto_renew) return 'trial_ended';
  if (record.trial && record.trial.end_date >= today) return 'on_trial';
  if (!record.next_date) return 'needs_date';
  const days = daysBetween(today, record.next_date);
  if (days === 0) return 'due_today';
  if (days > 0 && days <= 7) return 'renewing_soon';
  return 'active';
}

// The record's next event (trial end while in a trial), or null for no usable date.
export function nextEventDate(record: SubscriptionRecord, today: string) {
  if (record.status !== 'active') return null;
  if (record.trial && record.trial.end_date >= today) return record.trial.end_date;
  if (record.trial && !record.trial.auto_renew) return null;
  return record.next_date;
}

const byName = (a: SubscriptionRecord, b: SubscriptionRecord) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id);

function byNextEvent(today: string) {
  return (a: SubscriptionRecord, b: SubscriptionRecord) => {
    const [x, y] = [nextEventDate(a, today), nextEventDate(b, today)];
    if (x && y && x !== y) return x.localeCompare(y);
    if (!x !== !y) return x ? -1 : 1;
    return byName(a, b);
  };
}

// Search (name, case and surrounding spaces ignored) AND any selected group (OR); none selected = all.
export function filterRecords(records: SubscriptionRecord[], query: string, groups: ListGroup[], today: string) {
  const term = query.trim().toLowerCase();
  return records.filter(record => (!term || record.name.toLowerCase().includes(term)) && (!groups.length || groups.includes(listGroup(record, today))));
}

export function groupCounts(records: SubscriptionRecord[], today: string) {
  const counts = Object.fromEntries(LIST_GROUPS.map(item => [item.key, 0])) as Record<ListGroup, number>;
  for (const record of records) counts[listGroup(record, today)] += 1;
  return counts;
}

// Sections to render: price sorting groups by currency (headed when several), never comparing across them.
export function sortRecords(records: SubscriptionRecord[], sort: ListSort, today: string): { title: string | null; records: SubscriptionRecord[] }[] {
  if (sort === 'price_asc' || sort === 'price_desc') {
    const direction = sort === 'price_asc' ? 1 : -1;
    const amount = (record: SubscriptionRecord) => {
      const value = Number(record.price);
      return Number.isFinite(value) && value >= 0 ? value : null;
    };
    const currencies = [...new Set(records.map(record => record.currency))].sort();
    return currencies.map(currency => ({
      title: currencies.length > 1 ? currency : null,
      records: records
        .filter(record => record.currency === currency)
        .sort((a, b) => {
          const [x, y] = [amount(a), amount(b)];
          if (x === null || y === null) return x === y ? byName(a, b) : x === null ? 1 : -1;
          return (x - y) * direction || byName(a, b);
        }),
    }));
  }
  if (sort === 'name') return [{ title: null, records: [...records].sort(byName) }];
  if (sort === 'most') {
    const count = new Map<string, number>();
    for (const record of records) count.set(record.platform_id, (count.get(record.platform_id) ?? 0) + 1);
    const nextEvent = byNextEvent(today);
    return [{
      title: null,
      records: [...records].sort((a, b) => count.get(b.platform_id)! - count.get(a.platform_id)! || a.name.localeCompare(b.name) || a.platform_id.localeCompare(b.platform_id) || nextEvent(a, b)),
    }];
  }
  return [{ title: null, records: [...records].sort(byNextEvent(today)) }];
}
