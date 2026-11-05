jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));
import { buildHomeSnapshot } from '../src/api_services/home';

const today = '2026-10-27';
const plan = (id: string, platform_id: string, price: string, next_date: string | null, extra = {}) => ({
  id, platform_id, name: platform_id, plan: null, price, currency: 'USD', cycle: 'Monthly' as const, next_date, estimated: false, ...extra,
});

test('nearest group, month totals, top spending with Others, trials and forecast', () => {
  const snapshot = buildHomeSnapshot(
    [
      plan('duo', 'duolingo', '9.99', '2026-10-29'),
      plan('nfx', 'netflix', '15.99', '2026-10-29', { plan: 'Standard' }),
      plan('fig', 'figma', '15.00', '2026-11-12'),
      plan('not', 'notion', '10.00', '2026-11-16'),
      plan('icl', 'icloud', '2.99', '2026-10-31'),
      plan('spo', 'spotify', '11.99', '2026-10-30', { trial: { auto_renew: true } }),
      plan('eur', 'figma', '8.00', null, { currency: 'EUR' }),
    ],
    [
      { subscription_id: 'fig', amount: '15.00', currency: 'USD', paid_on: '2026-10-12' },
      { subscription_id: 'not', amount: '10.00', currency: 'USD', paid_on: '2026-09-30' },
    ],
    today,
  );

  expect(snapshot.nearest_events.map(item => item.subscription_id)).toEqual(['duo', 'nfx']);
  expect(snapshot.upcoming_count).toBe(6);
  // Only this month's receipts on or before today count as paid.
  expect(snapshot.month.paid).toEqual([{ currency: 'USD', amount: '15.00' }]);
  expect(snapshot.month.receipt_count).toBe(1);
  // Today → 31 Oct: Duolingo, Netflix, Spotify (charges at trial end) and iCloud.
  expect(snapshot.month.upcoming).toEqual([{ currency: 'USD', amount: '40.96' }]);
  expect(snapshot.month.charge_count).toBe(4);

  const usd = snapshot.spending.find(item => item.currency === 'USD')!;
  expect(usd.total).toBe('53.97');
  expect(usd.platforms.map(item => item.platform_id)).toEqual(['netflix', 'figma', 'notion']);
  expect(usd.others).toEqual({ amount: '12.98', percent: 24, platform_count: 2 });
  // Currencies stay separate; the trial is not in paid spend.
  expect(snapshot.spending.find(item => item.currency === 'EUR')!.total).toBe('8.00');
  expect(snapshot.trials.map(item => item.subscription_id)).toEqual(['spo']);

  const forecast = snapshot.forecast.find(item => item.currency === 'USD')!;
  expect(forecast.months.map(item => item.month)).toEqual(['2026-10', '2026-11', '2026-12', '2027-01', '2027-02', '2027-03']);
  // Full month: also Figma (12 Oct) and Notion (16 Oct) from earlier this month.
  expect(forecast.months[0].amount).toBe('65.96');
  expect(forecast.months[1].amount).toBe('65.96');
});

test('quiet when the nearest event is more than six days away, and empty without subscriptions', () => {
  expect(buildHomeSnapshot([plan('a', 'netflix', '1.00', '2026-11-03')], [], today).nearest_events).toEqual([]);
  expect(buildHomeSnapshot([plan('a', 'netflix', '1.00', '2026-11-02')], [], today).nearest_events).toHaveLength(1);
  expect(buildHomeSnapshot([], [], today).has_subscriptions).toBe(false);
});

test('a 31st anchor clamps to short months', () => {
  const forecast = buildHomeSnapshot([plan('a', 'netflix', '1.00', '2027-01-31')], [], '2027-01-01').forecast[0].months;
  expect(forecast.map(item => item.amount)).toEqual(['1.00', '1.00', '1.00', '1.00', '1.00', '1.00']);
});
