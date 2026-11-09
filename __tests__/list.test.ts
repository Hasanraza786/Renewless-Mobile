import type { SubscriptionRecord } from '../src/types';
import { filterRecords, groupCounts, listGroup, sortRecords } from '../src/utils/list';

const today = '2026-10-27';
const base: SubscriptionRecord = {
  id: '', platform_id: '', name: '', plan: null, category: 'Entertainment', price: '1.00', currency: 'USD', cycle: 'Monthly', next_date: null, estimated: false,
  auto_renew: true, trial: null, status: 'active', cancelled_on: null, access_until: null, start_date: null, source: { kind: 'manual', email: '' }, inbox: null,
  reminder: { mode: 'default' }, notes: null, manage_url: null, price_history: [],
  revision: 0,
};
const r = (id: string, extra: Partial<SubscriptionRecord>): SubscriptionRecord => ({ ...base, id, platform_id: id, name: id, ...extra });

const records = [
  r('netflix', { next_date: '2026-10-27', price: '15.99' }),
  r('duolingo', { next_date: '2026-10-29', price: '9.99' }),
  r('figma', { price: '15.00' }),
  r('spotify', { trial: { start_date: '2026-10-17', end_date: '2026-10-31', auto_renew: true }, price: '11.99' }),
  r('deezer', { trial: { start_date: '2026-09-01', end_date: '2026-10-01', auto_renew: false } }),
  r('hulu', { status: 'cancelled', cancelled_on: '2026-09-01' }),
  r('notion', { next_date: '2026-12-01', price: '10.00', currency: 'EUR' }),
  r('netflix-family', { platform_id: 'netflix', name: 'netflix', next_date: '2026-11-04', price: '22.99' }),
];

test('every record gets exactly one group and the counts add up', () => {
  expect(records.map(item => listGroup(item, today))).toEqual(['due_today', 'renewing_soon', 'needs_date', 'on_trial', 'trial_ended', 'cancelled', 'active', 'active']);
  const counts = groupCounts(records, today);
  expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(records.length);
  expect(counts.expired).toBe(0);
});

test('search AND selected groups (OR); no selection means all', () => {
  expect(filterRecords(records, '  NET ', [], today).map(item => item.id)).toEqual(['netflix', 'netflix-family']);
  expect(filterRecords(records, '', ['due_today', 'needs_date'], today).map(item => item.id)).toEqual(['netflix', 'figma']);
  expect(filterRecords(records, 'net', ['needs_date'], today)).toEqual([]);
});

test('sorting: next event with undated last, price per currency, most subscriptions', () => {
  expect(sortRecords(records, 'next', today)[0].records.map(item => item.id)).toEqual(['netflix', 'duolingo', 'spotify', 'netflix-family', 'notion', 'deezer', 'figma', 'hulu']);
  const price = sortRecords(records, 'price_desc', today);
  expect(price.map(item => item.title)).toEqual(['EUR', 'USD']);
  expect(price[1].records[0].id).toBe('netflix-family');
  expect(sortRecords(records, 'most', today)[0].records.slice(0, 2).map(item => item.id)).toEqual(['netflix', 'netflix-family']);
});
