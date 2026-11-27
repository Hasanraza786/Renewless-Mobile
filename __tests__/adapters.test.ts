import { fromReminder, setCategories, toAiReply, toCalendarMonth, toDetail, toGmailCandidate, toGmailScan, toHome, toInboxSlots, toReceipt, toRecord, toScanStatus, toSubscriptionBody, toSupportMessage } from '../src/api_services/adapters';
import type { CandidateDto, DetailDto, EventDto, HomeDto, ScanJobDto } from '../src/api_services/dto';
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
  lifecycle: 'active', cancelledAt: null, accessUntil: null, expiredAt: null, startDate: '2025-03-14', note: 'Family', manageUrl: null,
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

test('Detail opens only a web Manage link from the backend', () => {
  expect(toRecord(detail({ manageUrl: 'https://www.netflix.com/account' })).manage_url).toBe('https://www.netflix.com/account');
  expect(toRecord(detail({ manageUrl: 'http://netflix.com' })).manage_url).toBeNull();
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
    topSpending: [{ currency: 'USD', total: { currency: 'USD', amount: '15.49' }, items: [{ platformId: NETFLIX_ID, subscriptionId: null, name: 'Netflix', logoUrl: null, monthly: { currency: 'USD', amount: '15.49' }, percent: 100, subscriptionCount: 1 }], others: null }],
    trials: [{ subscriptionId: 'sub-2', name: 'Cursor', logoUrl: null, endDate: '2026-11-19', autoRenew: true, after: { currency: 'USD', amount: '20.00' }, cycle: 'monthly' }],
    forecast: [{ month: '2026-11', totals: [{ currency: 'USD', amount: '35.49' }] }, { month: '2026-12', totals: [] }],
  };
  const trial_end = event({ subscriptionId: 'sub-2', name: 'Cursor', type: 'trial_end', date: '2026-11-19', amount: { currency: 'USD', amount: '20.00' } });
  const snapshot = toHome(
    home,
    { through: '2027-01-31', events: [event(), trial_end] },
    { month: '2026-11', expected: [{ currency: 'USD', amount: '35.49' }], stillUpcoming: [], eventCount: 2, events: [event(), trial_end] },
    { byCurrency: [{ currency: 'USD', total: { currency: 'USD', amount: '15.49' }, platforms: [...home.topSpending[0].items, { platformId: null, subscriptionId: 'sub-9', name: 'Gym', logoUrl: null, monthly: { currency: 'USD', amount: '0.00' }, percent: 0, subscriptionCount: 1 }] }], trials: [] },
  );
  // A catalog platform opens its list; a custom service opens its one subscription (never an unfiltered list).
  expect(snapshot.spending[0].all_platforms.map(row => row.subscription_id)).toEqual([null, 'sub-9']);
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
  // A classification or cycle a newer backend adds is left out, not shown as something else.
  expect(toGmailCandidate({ ...base, classification: 'failing' as never })).toBeNull();
  expect(toGmailCandidate({ ...base, cycle: 'biweekly' as never })).toBeNull();
});

test('Home and Calendar leave out an event type a newer backend adds', () => {
  const calendar = { month: '2026-11', events: [event(), event({ type: 'payment_failing' as never })], expected: [] };
  expect(toCalendarMonth(calendar as never).events).toHaveLength(1);
});

test('a receipt shows its billing date, kind and kept files', () => {
  const receipt = toReceipt({ id: 'r1', kind: 'failed_payment', subject: 'Payment declined', from: 'Google Play <g@google.com>', receivedAt: '2026-11-11T08:00:00.000Z', amount: { currency: 'INR', amount: '550.00' }, billingDate: '2026-11-11', attachments: [{ id: 'a1', filename: 'r.pdf', mimeType: 'application/pdf', size: 10 }, { id: 'a2', filename: 'r.jpg', mimeType: 'image/jpeg', size: 10 }] });
  expect(receipt).toMatchObject({ kind_label: 'Payment failed', tone: 'alert', date: '2026-11-11', amount: { currency: 'INR', amount: '550.00' }, files: [{ id: 'a1', kind: 'pdf' }, { id: 'a2', kind: 'image' }] });
  expect(toReceipt({ ...receipt, kind: 'mystery', receivedAt: '2026-11-11T08:00:00.000Z', billingDate: null, amount: null, attachments: [] } as never)).toMatchObject({ kind_label: 'Billing email', amount: null, files: [] });
});

describe('toSupportMessage', () => {
  it('shows an answered open message as Replied', () => {
    expect(toSupportMessage({ id: 'm3', topic: 'other', message: 'Hello support team', status: 'open', createdAt: '2026-11-15T12:00:00', unread: false, replies: [{ body: 'Hi', sentAt: '2026-11-15T13:00:00' }] }).status).toBe('replied');
  });

  it('shows open as Sent, keeps unread and labels the sent day and reply time', () => {
    const message = toSupportMessage({
      id: 'm1',
      topic: 'gmail',
      message: 'Gmail stopped scanning.',
      status: 'replied',
      createdAt: '2026-11-10T09:00:00',
      unread: false,
      replies: [{ body: 'Reconnect it.', sentAt: '2026-11-11T14:14:00' }],
    });
    expect(toSupportMessage({ id: 'm0', topic: 'gmail', message: 'Gmail stopped scanning.', status: 'open', createdAt: '2026-11-10T09:00:00', unread: false, replies: [] }).status).toBe('sent');
    expect(message).toMatchObject({ id: 'm1', topic: 'gmail', status: 'replied', unread: false, sent_label: '10 Nov' });
    expect(message.replies[0]).toEqual({ body: 'Reconnect it.', sent_label: '11 Nov · 2:14 PM' });
  });

  it('falls back to Something else for an unknown topic', () => {
    expect(toSupportMessage({ id: 'm2', topic: 'billing', message: 'Hi there team', status: 'replied', createdAt: '2026-11-10T09:00:00', unread: true, replies: [] })).toMatchObject({ topic: 'other', status: 'replied', unread: true });
  });
});

test('an inbox import reads as an inbox record whether the backend stores gmail or outlook', () => {
  const base = { id: 's1', name: 'Max', platformId: null, logoUrl: null, categoryId: null, price: { currency: 'USD', amount: '9.99' }, cycle: 'monthly', lifecycle: 'active', revision: 1, startDate: null, note: null, manageUrl: null, reminder: { useDefault: true, offsets: [] }, spending: { totals: [], count: 0, annualEquivalent: { currency: 'USD', amount: '0' } } };
  const outlook = toRecord({ ...base, source: { type: 'outlook', email: 'a@outlook.com', connector: null } } as unknown as DetailDto);
  expect(outlook.source).toEqual({ kind: 'gmail', email: 'a@outlook.com', provider: 'outlook' });
  expect(toRecord({ ...base, source: { type: 'manual', email: '', connector: null } } as unknown as DetailDto).source.kind).toBe('manual');
  expect(toRecord({ ...base, source: { type: 'ai', email: 'a@b.com', connector: null } } as unknown as DetailDto).source.kind).toBe('ai');
});

test('a usage record has no price or annual equivalent; Detail keeps its currency and last bills', () => {
  const usage = detail({
    billing: 'usage', price: null, nextEvent: event({ type: 'usage_bill', date: '2026-12-02', expectedCharge: false, amount: null }),
    spending: { totals: [], count: 2, annualEquivalent: null },
    lastCharges: [{ date: '2026-10-02', amount: { currency: 'USD', amount: '41.20' } }, { date: '2026-11-02', amount: { currency: 'USD', amount: '57.80' } }],
  });
  expect(toRecord(usage)).toMatchObject({ billing: 'usage', price: '', currency: 'USD', next_date: '2026-12-02' });
  const view = toDetail(usage, null, null);
  expect(view.annual_estimate).toBeNull();
  expect(view.last_charges).toEqual([{ date: '2026-10-02', amount: '41.20', currency: 'USD' }, { date: '2026-11-02', amount: '57.80', currency: 'USD' }]);
  expect(toRecord(detail()).billing).toBe('fixed');
  expect(toCalendarMonth({ month: '2026-12', events: [event({ type: 'usage_bill', amount: null })], expected: [] } as never).events[0]).toMatchObject({ kind: 'usage_bill', amount: '0.00' });
});

test('inbox slots come from the backend, else count the listed inboxes against 2', () => {
  const box = { id: 'b1', email: 'a@gmail.com', status: 'connected' as const, lastSuccessfulSyncAt: null, nextSyncAt: null };
  expect(toInboxSlots({ connectors: [box], limit: 2, remaining: 0, usedBefore: [{ email: 'old@gmail.com', provider: 'gmail' }] })).toEqual({ limit: 2, remaining: 0, used_before: [{ email: 'old@gmail.com', provider: 'gmail' }] });
  expect(toInboxSlots({ connectors: [box] })).toEqual({ limit: 2, remaining: 1, used_before: [] });
});

test('a scan carries progress, live counts, its deep read and the rows needing attention', () => {
  const c = (over: Partial<CandidateDto>): CandidateDto => ({ id: 'c1', classification: 'new', selected: false, name: 'AWS', plan: null, platformId: null, logoUrl: null, price: null, cycle: null, anchorDate: null, estimated: true, trial: null, targetSubscriptionId: null, changes: null, imported: false, needsDetails: true, revision: 1, ...over });
  const job: ScanJobDto = {
    id: 'j1', connectorId: 'b1', kind: 'initial', phase: 'quick', status: 'succeeded', stages: [], error: null, counts: { messages: 120, candidates: 3 },
    progress: { total: 240, done: 240 }, live: { found: 300, read: 120, checked: 120, candidates: 3 },
    deep: { jobId: 'j2', status: 'queued', progress: { total: 0, done: 0 } },
    candidates: [
      c({ id: 'u1', billing: 'usage', cycle: 'monthly', anchorDate: '2026-12-02', lastCharges: [{ date: '2026-11-02', amount: { currency: 'USD', amount: '57.80' } }] }),
      c({ id: 'f1', name: 'Canva', paymentFailing: true, failedSince: '2026-09-14', failedCount: 3 }),
    ],
    needsMatch: [{ receiptId: 'r1', revision: 0, service: { name: 'Google One', platformId: null, logoUrl: null }, amount: { currency: 'PKR', amount: '650.00' }, paidDate: '2026-11-03', options: [
      { subscriptionId: 's1', name: 'Google One', plan: '100 GB', price: { currency: 'PKR', amount: '650.00' }, cycle: 'monthly', nextRenewal: '2026-12-03' },
      { subscriptionId: 's2', name: 'Google One', plan: '2 TB', price: { currency: 'PKR', amount: '650.00' }, cycle: 'yearly', nextRenewal: null },
    ] }],
  };
  const scan = toGmailScan(job);
  expect(scan).toMatchObject({ phase: 'quick', progress: { total: 240, done: 240 }, live: { found: 300 }, messages: 120, deep: { job_id: 'j2', status: 'running' } });
  // A failing plan is a review row that starts unticked; without a price it can't be added.
  expect(scan.candidates).toMatchObject([{ id: 'f1', kind: 'new', selected: false, failing: { since: '2026-09-14', count: 3, incomplete: true } }]);
  expect(scan.attention.usage).toMatchObject([{ id: 'u1', cycle: 'Monthly', next_date: '2026-12-02', last_charges: [{ amount: '57.80', currency: 'USD' }] }]);
  // Onboarding shows the failing plan and the usage bill (unticked, priced by its last bill's currency, no price).
  expect(toScanStatus(job).candidates.map(item => item.id)).toEqual(['u1', 'f1']);
  expect(toScanStatus(job).candidates[0]).toMatchObject({ usage: { last_charges: [{ amount: '57.80', currency: 'USD' }] }, price: '', currency: 'USD', selected: false });
  expect(scan.attention.needs_match[0]).toMatchObject({ receipt_id: 'r1', amount: '650.00', options: [{ subscription_id: 's1', cycle: 'Monthly' }, { subscription_id: 's2', cycle: 'Yearly' }] });
  // An older job without the new fields still maps.
  expect(toScanStatus({ ...job, phase: undefined, progress: undefined, live: undefined, deep: undefined })).toMatchObject({ phase: null, progress: { total: 0, done: 0 }, deep: null });
});

test('a payment matched earlier shows its pick and newest revision, after the open ones', () => {
  const entry = { receiptId: 'r1', revision: 0, service: { name: 'Claude', platformId: null, logoUrl: null }, amount: { currency: 'USD', amount: '20.00' }, paidDate: '2026-11-18', options: [
    { subscriptionId: 's1', name: 'Claude', plan: 'Pro', price: { currency: 'USD', amount: '20.00' }, cycle: 'monthly' as const, nextRenewal: '2026-11-30' },
    { subscriptionId: 's2', name: 'Claude', plan: 'Pro', price: { currency: 'USD', amount: '20.00' }, cycle: 'monthly' as const, nextRenewal: '2026-10-27' },
  ] };
  const job: ScanJobDto = {
    id: 'j1', connectorId: 'b1', kind: 'deep', status: 'succeeded', stages: [], error: null, counts: { messages: 1, candidates: 0 }, candidates: [],
    needsMatch: [{ ...entry, receiptId: 'r2' }],
    matched: [{ ...entry, revision: 1, resolved: 's2' }],
  };
  expect(toGmailScan(job).attention.needs_match.map(item => [item.receipt_id, item.resolved, item.revision])).toEqual([['r2', null, 0], ['r1', 's2', 1]]);
});
