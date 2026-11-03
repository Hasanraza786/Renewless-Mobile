import { addDays, dateLabel, formatTotals, nextEvent, paidMonthlyTotals, upcomingWeek } from '../src/utils/scan';
import type { ScanCandidate, ScanCycle } from '../src/types';

const item = (id: string, price: string, currency: string, next_date: string | null, extra: Partial<ScanCandidate> = {}): ScanCandidate =>
  ({ id, platform_id: id, name: id, price, currency, cycle: 'Monthly' as ScanCycle, next_date, estimated: true, ...extra });

const today = '2026-10-27';
const items = [
  item('netflix', '15.99', 'USD', '2026-10-27'),
  item('spotify', '11.99', 'USD', '2026-10-31', { trial: { auto_renew: true } }),
  item('icloud', '2.99', 'USD', '2026-10-30'),
  item('edge', '0.10', 'USD', '2026-11-02'),
  item('outside', '0.20', 'USD', '2026-11-03'),
  item('eur', '9.99', 'EUR', '2026-11-01'),
  item('lapsing', '5.00', 'USD', '2026-10-28', { trial: { auto_renew: false } }),
  item('undated', '4.00', 'USD', null),
];

test('monthly totals match the prototype, normalise cycles and keep currencies apart', () => {
  expect(formatTotals(paidMonthlyTotals(items.slice(0, 3)))).toBe('USD 18.98');
  expect(formatTotals(paidMonthlyTotals([item('y', '120.00', 'GBP', null, { cycle: 'Yearly' }), item('q', '30.00', 'GBP', null, { cycle: 'Quarterly' })]))).toBe('GBP 20.00');
  expect(formatTotals(paidMonthlyTotals([items[1]]))).toBe('USD 0.00');
  expect(formatTotals(paidMonthlyTotals([items[5]]))).toBe('EUR 9.99');
  expect(formatTotals({})).toBe('—');
});

test('upcoming covers today through today + 6 and skips charges for lapsing trials', () => {
  const week = upcomingWeek(items, today);
  expect(addDays(today, 6)).toBe('2026-11-02');
  expect(week.count).toBe(6); // excludes 3 Nov and the undated plan
  expect(formatTotals(week.totals)).toBe('USD 31.07 · EUR 9.99');
  expect(formatTotals(upcomingWeek(items.slice(0, 3), today).totals)).toBe('USD 30.97');
  expect(nextEvent(items, today)?.id).toBe('netflix');
  expect(dateLabel('2026-10-27')).toBe('27 Oct 2026');
});
