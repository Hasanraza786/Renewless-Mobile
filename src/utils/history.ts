import { COLORS } from '../constants/theme';
import type { SubscriptionRecord } from '../types';
import { amountLabel } from './events';
import { dateLabel } from './scan';

export type HistoryStatus = 'cancelled' | 'expired';

export const HISTORY_FILTERS: { key: HistoryStatus | 'all'; label: string; color: string }[] = [
  { key: 'all', label: 'All', color: COLORS.text_primary },
  { key: 'cancelled', label: 'Cancelled', color: COLORS.text_secondary },
  { key: 'expired', label: 'Expired', color: COLORS.expired },
];

// Cancelled: the cancellation date; Expired: the confirmed access end.
export const lifecycleDate = (record: SubscriptionRecord) => (record.status === 'cancelled' ? record.cancelled_on : record.access_until);

// Only explicit Cancelled and confirmed Expired, most recent lifecycle change first; unknown dates last.
export function historyRecords(records: SubscriptionRecord[]) {
  return records
    .filter(record => record.status === 'cancelled' || record.status === 'expired')
    .sort((a, b) => (lifecycleDate(b) ?? '').localeCompare(lifecycleDate(a) ?? '') || a.id.localeCompare(b.id));
}

// Name query AND any selected status (OR); no selection means both.
export const filterHistory = (records: SubscriptionRecord[], query: string, statuses: HistoryStatus[]) =>
  records.filter(record => record.name.toLowerCase().includes(query.trim().toLowerCase()) && (!statuses.length || statuses.includes(record.status as HistoryStatus)));

export function historyCardProps(record: SubscriptionRecord) {
  const cancelled = record.status === 'cancelled';
  const date = lifecycleDate(record);
  return {
    name: record.name,
    platform_id: record.platform_id,
    status: { label: `${cancelled ? 'Cancelled' : 'Expired'}${date ? ` · ${dateLabel(date)}` : ''}`, color: cancelled ? COLORS.text_secondary : COLORS.expired },
    lines: cancelled && record.access_until ? [`Access until ${dateLabel(record.access_until)}`] : [],
    amount: amountLabel(record.price, record.currency),
    caption: `Last price · ${record.cycle}`,
    accessibility_label: `View ${record.name}${record.plan ? ` ${record.plan}` : ''} subscription`,
  };
}
