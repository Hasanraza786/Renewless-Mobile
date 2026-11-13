import type { SubscriptionRecord } from '../src/types';
import { draftFromRecord, draftToInput, emptyDraft, trialEnd, validateDraft, firstInvalid } from '../src/utils/subscription-form';

const today = '2026-11-06';

test('a new manual subscription needs a name, a valid amount and a next renewal', () => {
  expect(validateDraft(emptyDraft(), null, today)).toEqual({
    name: 'Enter a platform or service name.',
    price: 'Enter the subscription amount.',
    next_date: 'Choose the next renewal date.',
  });
  const draft = { ...emptyDraft(), name: 'Netflix', price: '15.999', next_date: '2026-11-20' };
  expect(validateDraft(draft, null, today).price).toBe('Enter a valid amount greater than 0 (up to 2 decimals).');
  expect(validateDraft({ ...draft, price: '15.99' }, null, today)).toEqual({});
});

test('a trial needs a start date, calculates its end and hides the next renewal', () => {
  const draft = { ...emptyDraft(), name: 'Spotify', price: '11.99', trial: '7 days', next_date: '2026-12-01' };
  expect(validateDraft(draft, null, today)).toEqual({ start_date: 'Select a start date to calculate your trial end date.' });
  const started = { ...draft, start_date: '2026-10-28' };
  expect(trialEnd(started, null)).toBe('2026-11-04');
  const input = draftToInput(started, null, null, today);
  expect(input).toMatchObject({ platform_id: null, next_date: null, trial: { days: 7, end_date: '2026-11-04', auto_renew: true } });
  expect(validateDraft({ ...started, trial: 'Custom', custom_days: '400' }, null, today).custom_days).toBe('Enter a whole number from 1 to 365.');
});

test('edit keeps an exact trial end until start or duration changes, and asks why a price changed', () => {
  const record = {
    id: 'sub-1', platform_id: 'spotify', name: 'Spotify', plan: null, category: 'Entertainment', price: '11.99', currency: 'USD', cycle: 'Monthly', next_date: null, estimated: false,
    auto_renew: true, trial: { start_date: '2026-10-24', end_date: '2026-10-31', auto_renew: true }, status: 'active', cancelled_on: null, access_until: null, start_date: '2026-10-24',
    source: { kind: 'gmail', email: '' }, inbox: null, reminder: { mode: 'default' }, notes: null, manage_url: null, price_history: [],
  revision: 0,
  } as SubscriptionRecord;
  const { draft, origin } = draftFromRecord(record, today);
  expect(draft.trial).toBe('7 days');
  expect(trialEnd(draft, { ...origin!, end_date: '2026-11-01' })).toBe('2026-11-01');
  // A changed start recalculates instead of keeping the exact end.
  expect(trialEnd({ ...draft, start_date: '2026-10-26' }, { ...origin!, end_date: '2026-11-01' })).toBe('2026-11-02');
  const changed = { ...draft, price: '12.99' };
  expect(validateDraft(changed, record, today).price_reason).toBe('Choose whether the price changed or you are correcting a mistake.');
  expect(validateDraft({ ...changed, price_reason: 'Price changed', effective_on: '2026-12-01' }, record, today).effective_on).toBe('Choose today or a past effective date.');
  expect(draftToInput({ ...changed, price_reason: 'Correcting a mistake' }, origin, record, today).price_change).toEqual({ reason: 'correction', effective_on: today });
});

test('a picked catalog suggestion saves its platform; a typed name is linked when saving', () => {
  const draft = { ...emptyDraft(), name: 'Netflix', price: '15.99', next_date: '2026-11-20' };
  expect(draftToInput({ ...draft, platform_id: '6730a1b2c3d4e5f6a7b8c9d0' }, null, null, today).platform_id).toBe('6730a1b2c3d4e5f6a7b8c9d0');
  expect(draftToInput(draft, null, null, today).platform_id).toBeNull();
});

test('a failed submit focuses the topmost invalid field', () => {
  expect(firstInvalid({ next_date: 'x', price: 'x', name: 'x' })).toBe('name');
  expect(firstInvalid({ start_date: 'x', price: 'x' })).toBe('price');
  expect(firstInvalid({ next_date: 'x', custom_days: 'x' })).toBe('custom_days');
  expect(firstInvalid({})).toBeUndefined();
});
