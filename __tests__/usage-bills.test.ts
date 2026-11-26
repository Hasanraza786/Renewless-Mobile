import { eventCardProps, recordCardProps } from '../src/utils/events';
import { nearestEvent } from '../src/utils/calendar';
import { widgetEvent } from '../src/utils/widget';
import { detailView } from '../src/screens/SubscriptionDetail/index.function';
import type { HomeEvent, HomeSnapshot, SubscriptionDetail, SubscriptionRecord } from '../src/types';

jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), goBack: jest.fn() }));
jest.mock('../src/redux/store', () => ({ useAppDispatch: jest.fn(), useAppSelector: jest.fn() }));
jest.mock('../src/redux/actions/detail-action', () => ({}));
jest.mock('@react-navigation/native', () => ({ useFocusEffect: jest.fn() }));
jest.mock('../src/utils/tablet', () => ({ useIsTablet: () => false }));

const usage_event: HomeEvent = {
  id: 'a:usage_bill:2026-11-10', subscription_id: 'a', platform_id: 'atlas', name: 'MongoDB Atlas', plan: null, date: '2026-11-10',
  kind: 'usage_bill', amount: '0.00', currency: '', cycle: 'Monthly', expected_charge: false, estimated: true,
};
const record = {
  id: 'a', platform_id: 'atlas', name: 'MongoDB Atlas', plan: null, category: 'Productivity', billing: 'usage', price: '', currency: 'USD', cycle: 'Monthly',
  next_date: '2026-11-10', estimated: true, auto_renew: null, trial: null, status: 'active', cancelled_on: null, access_until: null, start_date: '2026-08-10',
  source: { kind: 'gmail', email: 'a@gmail.com', provider: 'gmail' }, inbox: null, reminder: { mode: 'default' }, notes: null, manage_url: null, price_history: [], revision: 1,
} as SubscriptionRecord;

test('a usage bill event says when, never an amount', () => {
  const card = eventCardProps(usage_event, '2026-10-27');
  expect(card).toMatchObject({ status: { label: 'Usage charge expected' }, lines: ['In 14 days · check your usage'], amount: 'Usage-based', amount_muted: true, caption: 'Monthly' });
  expect(nearestEvent([usage_event], '2026-10-27')?.heading).toBe('Usage bill');
});

test('a usage card shows Active, the bill day and Usage-based', () => {
  expect(recordCardProps(record, '2026-10-27')).toMatchObject({ status: { label: 'Active' }, lines: ['Bill around 10 Nov'], amount: 'Usage-based', caption: 'Monthly' });
});

test('the widget leaves a usage bill out', () => {
  const renewal = { ...usage_event, id: 'b', kind: 'renewal' as const, date: '2026-11-12', amount: '9.99', currency: 'USD', expected_charge: true };
  expect(widgetEvent({ nearest_events: [], upcoming: [usage_event, renewal] } as unknown as HomeSnapshot).event?.id).toBe('b');
});

test('Detail · usage: last bill, last 3 bills, next bill and the typical bill', () => {
  const detail: SubscriptionDetail = {
    record, today: '2026-10-27', receipts: { totals: [], count: 3 }, receipt_emails: { count: 0, latest: null }, annual_estimate: null, related_count: 0, account_reminder_days: [3],
    last_charges: [{ date: '2026-08-10', amount: '7.84', currency: 'USD' }, { date: '2026-09-10', amount: '8.06', currency: 'USD' }, { date: '2026-10-10', amount: '8.10', currency: 'USD' }],
  };
  const view = detailView(detail);
  expect(view.cost).toEqual({ text: 'Usage-based', caption: 'Last bill $8.10 · 10 Oct' });
  expect(view.usage?.bills.map(bill => `${bill.amount} ${bill.month}`)).toEqual(['$7.84 Aug', '$8.06 Sept', '$8.10 Oct']);
  expect(view.event).toEqual({ label: 'Next bill', value: 'Expected around 10 Nov · check your usage' });
  expect(view.annual_label).toBe('Typical bill · last 3');
  expect(view.annual_value).toBe('$8.00 average');
  expect(view.estimated_note).toBeNull();
});

test('Detail estimated-date note: receipt wording for inbox records, Track again wording when cancelled', () => {
  const base: SubscriptionDetail = {
    record: { ...record, billing: 'fixed', price: '9.99' } as SubscriptionRecord, today: '2026-10-27', receipts: { totals: [], count: 0 }, receipt_emails: { count: 0, latest: null },
    annual_estimate: null, related_count: 0, account_reminder_days: [3], last_charges: [],
  };
  expect(detailView(base).estimated_note).toBe('Date estimated from a receipt. You can update it in Edit.');
  const manual = { ...base, record: { ...base.record, source: { ...base.record.source, kind: 'manual' as const } } };
  expect(detailView(manual).estimated_note).toBe('Estimated date. You can update it in Edit.');
  const cancelled = { ...manual, record: { ...manual.record, status: 'cancelled' as const, access_until: '2026-11-10' } };
  expect(detailView(cancelled).estimated_note).toBe('Estimated date. Review your next date when you track again.');
});
