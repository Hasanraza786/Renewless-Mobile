import type { PaymentRecord } from '../src/types';
import { alignedMonth, defaultYear, inPeriod, monthlySeries, paymentCurrencies, paymentTotals, paymentYears, periodLabel } from '../src/utils/payments';

const pay = (id: string, paid_on: string, amount: string, currency = 'USD'): PaymentRecord => ({
  id, subscription_id: id, name: id, platform_id: id, amount, currency, paid_on, billing_date: paid_on, source: 'gmail', inbox_email: null, subscription_available: true,
});
// Newest first, as the service returns them.
const rows = [pay('netflix', '2026-10-24', '15.99'), pay('spotify', '2026-10-20', '11.99'), pay('notion', '2026-09-30', '10.00', 'EUR'), pay('icloud', '2025-12-30', '2.99')];

test('periods use the paid date and keep currencies separate', () => {
  expect(paymentYears(rows)).toEqual(['2026', '2025']);
  expect(defaultYear(paymentYears(rows), '2026-11-05')).toBe('2026');
  expect(defaultYear(['2025'], '2026-11-05')).toBe('2025');
  expect(inPeriod(rows, '2026', '10').map(row => row.id)).toEqual(['netflix', 'spotify']);
  expect(paymentTotals(inPeriod(rows, '2026', 'all'))).toEqual([{ currency: 'USD', amount: '27.98' }, { currency: 'EUR', amount: '10.00' }]);
  expect(paymentCurrencies(rows)).toEqual(['USD', 'EUR']);
});

test('the graph has twelve explicit months per currency and inspects the newest payment month', () => {
  const usd = monthlySeries(rows, '2026', 'USD');
  expect(usd).toHaveLength(12);
  expect(usd[9]).toBeCloseTo(27.98);
  expect(usd[8]).toBe(0);
  expect(monthlySeries(rows, '2026', 'EUR')[8]).toBe(10);
  expect(alignedMonth(rows, '2026', 'all')).toBe('10');
  expect(alignedMonth(rows, '2026', '03')).toBe('03');
  expect(periodLabel('2026', '10')).toBe('October 2026');
  expect(periodLabel('2026', 'all')).toBe('2026');
});
