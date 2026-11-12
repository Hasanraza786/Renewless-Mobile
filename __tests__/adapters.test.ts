import { fromReminder, setCategories, toAiReply, toDetail, toGmailCandidate, toHome, toRecord, toSubscriptionBody } from '../src/api_services/adapters';
import type { DetailDto, EventDto, HomeDto } from '../src/api_services/dto';
import { platform_logos } from '../src/assets/icons';

jest.mock('../src/assets/icons', () => ({ platform_logos: { netflix: 'netflix-logo' } }));

// Shapes captured from the local backend (renewless-backend /v1).
const NETFLIX_ID = '6af029a6ee27807c837b08a6';
const event = (over: Partial<EventDto> = {}): EventDto => ({
  subscriptionId: 'sub-1', name: 'Netflix', plan: null, logoUrl: null, type: 'renewal', date: '2026-11-14', expectedCharge: true,
  amount: { currency: 'USD', amount: '15.49' }, cycle: 'monthly', estimated: false, ...over,
});
const detail = (over: Partial<DetailDto> = {}): DetailDto => ({
  id: 'sub-1', name: 'Netflix', plan: null, platformId: NETFLIX_ID, categoryId: 'cat-streaming', logoUrl: null,
  price: { currency: 'USD', amount: '15.49' }, cycle: 'monthly', statusGroup: 'renewing_soon', nextEvent: event(), estimated: false, trial: null,
  lifecycle: 'active', cancelledAt: null, accessUntil: null, expiredAt: null, startDate: '2025-03-14', note: 'Family',
  reminder: { offsets: [3], custom: false }, source: { type: 'manual', email: 'qa@example.com', connector: null },
  spending: { totals: [], count: 0, annualEquivalent: { currency: 'USD', amount: '185.88' } }, samePlatformCount: 0, priceChangeCount: 0, revision: 4, ...over,
});

beforeAll(() => setCategories([{ id: 'cat-streaming', key: 'streaming', name: 'Streaming' }, { id: 'cat-music', key: 'music', name: 'Music' }]));

test('a backend record maps to the app record, its logo and category', () => {
  const record = toRecord(detail());
  expect(record).toMatchObject({ id: 'sub-1', platform_id: NETFLIX_ID, price: '15.49', cycle: 'Monthly', next_date: '2026-11-14', category: 'Entertainment', notes: 'Family', revision: 4, reminder: { mode: 'default' } });
  // The bundled logo is linked to the backend platform ID by name.
  expect(platform_logos[NETFLIX_ID]).toBe('netflix-logo');
});

test('a trial keeps its end separate from the next renewal', () => {
  const record = toRecord(detail({ trial: { endDate: '2026-11-19', autoRenew: true }, startDate: '2026-11-05', nextEvent: event({ type: 'trial_end', date: '2026-11-19' }) }));
  expect(record.trial).toEqual({ start_date: '2026-11-05', end_date: '2026-11-19', auto_renew: true });
  expect(record.next_date).toBeNull();
});

test('reminder preferences round-trip: default, Off and custom days', () => {
  expect(toRecord(detail({ reminder: { offsets: [], custom: true } })).reminder).toEqual({ mode: 'off' });
  expect(toRecord(detail({ reminder: { offsets: [1, 7], custom: true } })).reminder).toEqual({ mode: 'days', days: [1, 7] });
  expect(fromReminder({ mode: 'default' })).toEqual({ useDefault: true });
  expect(fromReminder({ mode: 'off' })).toEqual({ offsets: [] });
  expect(fromReminder({ mode: 'days', days: [2] })).toEqual({ offsets: [2] });
});

test('detail carries spending, related count and the account default days', () => {
  const view = toDetail(detail({ samePlatformCount: 2 }), { current: { price: { currency: 'USD', amount: '15.49' }, cycle: 'monthly' }, changes: [] }, { pushEnabled: true, renewalsEnabled: true, trialsEnabled: true, defaultOffsets: [1, 3], customOffset: null, sendTime: '09:00', timezone: 'Asia/Karachi', revision: 0 });
  expect(view).toMatchObject({ annual_estimate: '185.88', related_count: 2, account_reminder_days: [1, 3] });
});

test('the form body uses backend names: money object, lower-case cycle, trial days or the renewal date', () => {
  const base = { name: 'Spotify', platform_id: null, price: '11.99', currency: 'USD', cycle: 'Monthly' as const, category: 'Entertainment', start_date: '2026-11-01', notes: null, price_change: null };
  expect(toSubscriptionBody({ ...base, next_date: '2026-12-01', trial: null }, null)).toMatchObject({ price: { currency: 'USD', amount: '11.99' }, cycle: 'monthly', categoryId: 'cat-streaming', trial: null, anchorDate: '2026-12-01' });
  expect(toSubscriptionBody({ ...base, next_date: null, trial: { days: 14, end_date: '2026-11-15', auto_renew: false } }, null)).toMatchObject({ trial: { days: 14 }, autoRenew: false });
});

test('Home merges the snapshot, Upcoming, this month and spending', () => {
  const home: HomeDto = {
    asOf: '2026-11-09T19:31:29.240Z', today: '2026-11-10', timezone: 'Asia/Karachi', hasSubscriptions: true,
    nearest: { date: '2026-11-14', events: [event()], upcomingCount: 2 },
    month: { label: '2026-11', paid: [], paidCount: 0, upcoming: [{ currency: 'USD', amount: '35.49' }] },
    topSpending: [{ currency: 'USD', total: { currency: 'USD', amount: '15.49' }, items: [{ platformId: NETFLIX_ID, name: 'Netflix', logoUrl: null, monthly: { currency: 'USD', amount: '15.49' }, percent: 100, subscriptionCount: 1 }], others: null }],
    trials: [{ subscriptionId: 'sub-2', name: 'Cursor', logoUrl: null, endDate: '2026-11-19', autoRenew: true, after: { currency: 'USD', amount: '20.00' }, cycle: 'monthly' }],
    forecast: [{ month: '2026-11', totals: [{ currency: 'USD', amount: '35.49' }] }, { month: '2026-12', totals: [] }],
  };
  const trial_end = event({ subscriptionId: 'sub-2', name: 'Cursor', type: 'trial_end', date: '2026-11-19', amount: { currency: 'USD', amount: '20.00' } });
  const snapshot = toHome(
    home,
    { through: '2027-01-31', events: [event(), trial_end] },
    { month: '2026-11', expected: [{ currency: 'USD', amount: '35.49' }], stillUpcoming: [], eventCount: 2, events: [event(), trial_end] },
    { byCurrency: [{ currency: 'USD', total: { currency: 'USD', amount: '15.49' }, platforms: home.topSpending[0].items }], trials: [] },
  );
  expect(snapshot.nearest_events.map(item => item.subscription_id)).toEqual(['sub-1']);
  expect(snapshot.upcoming_count).toBe(2);
  expect(snapshot.month).toMatchObject({ month: '2026-11', charge_count: 2, upcoming: [{ currency: 'USD', amount: '35.49' }] });
  expect(snapshot.spending[0]).toMatchObject({ currency: 'USD', total: '15.49', others: null });
  expect(snapshot.trials[0]).toMatchObject({ subscription_id: 'sub-2', then_amount: '20.00', cycle: 'Monthly' });
  // Months without a charge in a currency are explicit zeros.
  expect(snapshot.forecast).toEqual([{ currency: 'USD', months: [{ month: '2026-11', amount: '35.49' }, { month: '2026-12', amount: '0.00' }] }]);
});

test('an AI turn shows the newest changed draft; a trial keeps its end date and auto-renew', () => {
  const draft = (id: string, status: 'incomplete' | 'ready' | 'added', fields: object) => ({ id, revision: 2, status, fields, missing: [], match: { kind: 'none', subscriptionIds: [] }, subscriptionId: null });
  const usage = { used: 3, limit: 50, remaining: 47, resetsOn: '2026-12-01' };
  const reply = toAiReply({
    reply: { id: 'r1', text: 'Got it.', draftIds: ['d1', 'd2'] },
    drafts: [draft('d1', 'added', { name: 'Old' }), draft('d2', 'ready', { name: 'Spotify', price: { currency: 'USD', amount: '11.99' }, cycle: 'monthly', trial: { endDate: '2026-12-01' }, autoRenew: false })],
    usage,
  });
  expect(reply.reply).toBe('Got it.');
  expect(reply.draft).toMatchObject({ id: 'd2', revision: 2, ready: true, name: 'Spotify', price: '11.99', currency: 'USD', cycle: 'Monthly', trial: { end_date: '2026-12-01', auto_renew: false }, next_date: null });
  expect(toAiReply({ reply: { id: null, text: null, draftIds: [] }, drafts: [], usage }).draft).toBeNull();
});

test('the Gmail review leaves out rows it cannot show and maps an update with its old price', () => {
  const base = { id: 'c1', classification: 'new' as const, selected: true, name: 'Claude', plan: 'Max', platformId: null, logoUrl: null, price: { currency: 'USD', amount: '100.00' }, cycle: 'monthly' as const, anchorDate: '2026-11-30', estimated: true, trial: null, targetSubscriptionId: null, changes: null, imported: false, needsDetails: false, revision: 1 };
  expect(toGmailCandidate({ ...base, needsDetails: true, price: null })).toBeNull();
  expect(toGmailCandidate({ ...base, classification: 'unresolved' })).toBeNull();
  expect(toGmailCandidate({ ...base, classification: 'tracked' })).toMatchObject({ kind: 'duplicate' });
  const update = toGmailCandidate({ ...base, classification: 'update', targetSubscriptionId: 's1', changes: { price: { from: { currency: 'USD', amountMinor: 9000 }, to: { currency: 'USD', amountMinor: 10000 } } } });
  expect(update).toMatchObject({ kind: 'update', target_id: 's1', old: { price: '90.00' }, next_date: '2026-11-30', revision: 1, selected: true });
});
