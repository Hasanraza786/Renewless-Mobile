import { addDays, allMonthlyTotals, formatTotals, nextEvent, paidMonthlyTotals, upcomingWeek } from '../src/utils/scan';
import type { ScanCandidate } from '../src/types';

const item = (id: string, price: string, currency: string, next_date: string, trial?: ScanCandidate['trial']): ScanCandidate =>
  ({ id, platform_id: id, name: id, price, currency, cycle: 'monthly', next_date, trial });

const today = '2026-10-26';
const items = [
  item('netflix', '15.99', 'USD', '2026-10-27'),
  item('spotify', '11.99', 'USD', '2026-10-31', { ends_on: '2026-10-31', auto_renew: true }),
  item('icloud', '2.99', 'USD', '2026-10-30'),
  item('later', '0.10', 'USD', '2026-11-03'),
  item('eur', '9.99', 'EUR', '2026-11-02'),
  item('lapsing', '5.00', 'USD', '2026-10-28', { ends_on: '2026-10-28', auto_renew: false }),
];

test('totals match the approved prototype and keep currencies apart', () => {
  expect(formatTotals(paidMonthlyTotals(items.slice(0, 3)))).toBe('USD 18.98');
  expect(formatTotals(allMonthlyTotals(items.slice(0, 3)))).toBe('USD 30.97');
  expect(formatTotals(paidMonthlyTotals([items[4]]))).toBe('EUR 9.99');
  expect(formatTotals({})).toBe('—');
});

test('upcoming week is inclusive of today + 7 and skips charges for lapsing trials', () => {
  expect(addDays(today, 7)).toBe('2026-11-02');
  const week = upcomingWeek(items, today);
  expect(week.count).toBe(5); // excludes only 3 Nov
  expect(formatTotals(week.totals)).toBe('USD 30.97 · EUR 9.99');
  expect(nextEvent(items, today)?.id).toBe('netflix');
});
