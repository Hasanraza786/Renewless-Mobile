import type { SubscriptionRecord } from '../src/types';
import { filterHistory, historyCardProps, historyRecords } from '../src/utils/history';

const base = { platform_id: 'x', plan: null, category: 'Entertainment', price: '13.99', currency: 'USD', cycle: 'Monthly', next_date: null, estimated: false, auto_renew: false, trial: null,
  start_date: null, source: { kind: 'manual', email: '' }, inbox: null, reminder: { mode: 'default' }, notes: null, manage_url: null, price_history: [] };
const r = (id: string, status: SubscriptionRecord['status'], cancelled_on: string | null, access_until: string | null) => ({ ...base, id, name: id, status, cancelled_on, access_until }) as SubscriptionRecord;

const records = [r('active', 'active', null, null), r('figma', 'cancelled', '2026-10-25', '2026-11-01'), r('netflix', 'expired', null, '2026-10-20'), r('old', 'cancelled', null, null)];

test('history keeps cancelled and expired, newest lifecycle date first, unknown last', () => {
  expect(historyRecords(records).map(item => item.id)).toEqual(['figma', 'netflix', 'old']);
});

test('search AND status filters (OR); no status means both', () => {
  const all = historyRecords(records);
  expect(filterHistory(all, '', ['expired']).map(item => item.id)).toEqual(['netflix']);
  expect(filterHistory(all, 'fig', []).map(item => item.id)).toEqual(['figma']);
  expect(filterHistory(all, 'fig', ['expired'])).toEqual([]);
});

test('cards show the lifecycle date, access until and the last price', () => {
  expect(historyCardProps(records[1])).toMatchObject({ status: { label: 'Cancelled · 25 Oct 2026' }, lines: ['Access until 1 Nov 2026'], amount: '$13.99', caption: 'Last price · Monthly' });
  expect(historyCardProps(records[2]).status.label).toBe('Expired · 20 Oct 2026');
});
