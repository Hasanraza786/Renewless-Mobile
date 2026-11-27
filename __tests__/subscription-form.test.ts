import type { SubscriptionRecord } from '../src/types';
import { changeDraft, nextFromStart, draftFromRecord, draftToInput, emptyDraft, trialEnd, validateDraft, firstInvalid, draftServerErrors } from '../src/utils/subscription-form';

const today = '2026-11-06';

test('a new manual subscription needs a name, a valid amount and a start date or next renewal', () => {
  expect(validateDraft(emptyDraft(), null, today)).toEqual({
    name: 'Enter a platform or service name.',
    price: 'Enter the subscription amount.',
    next_date: 'Add a start date, or choose your next renewal date.',
  });
  // A start date fills Next renewal, so it alone is enough; so is a picked Next renewal alone.
  expect(validateDraft(changeDraft({ ...emptyDraft(), name: 'Netflix', price: '1' }, 'start_date', '2026-01-01', today), null, today)).toEqual({});
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
    id: 'sub-1', platform_id: 'spotify', name: 'Spotify', plan: null, category: 'Entertainment', billing: 'fixed', price: '11.99', currency: 'USD', cycle: 'Monthly', next_date: null, estimated: false,
    auto_renew: true, trial: { start_date: '2026-10-24', end_date: '2026-10-31', auto_renew: true }, status: 'active', cancelled_on: null, access_until: null, start_date: '2026-10-24',
    source: { kind: 'gmail', email: '', provider: 'gmail' }, inbox: null, reminder: { mode: 'default' }, notes: null, manage_url: null, price_history: [],
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

test('a trial end before the start shows under the trial choice', () => {
  expect(draftServerErrors({ 'trial.endDate': 'Choose a trial end date on or after the start date.' })).toEqual({ custom_days: 'Choose a trial end date on or after the start date.' });
});

test('Next renewal follows the start date and cycle, as the backend counts it', () => {
  const now = '2026-11-27';
  expect(nextFromStart('2026-03-12', 'Monthly', now)).toBe('2026-12-12');
  expect(nextFromStart(now, 'Monthly', now)).toBe('2026-12-27');
  expect(nextFromStart('2025-08-05', 'Yearly', now)).toBe('2027-08-05');
  expect(nextFromStart('2026-10-01', 'Quarterly', now)).toBe('2027-01-01');
  expect(nextFromStart('2026-11-20', 'Weekly', now)).toBe(now);
  expect(nextFromStart('2026-01-31', 'Monthly', now)).toBe('2026-11-30');
  expect(nextFromStart('2026-01-31', 'Monthly', '2026-12-01')).toBe('2026-12-31');
  expect(nextFromStart('2024-02-29', 'Yearly', now)).toBe('2027-02-28');
  expect(nextFromStart('2026-12-10', 'Monthly', now)).toBe('2026-12-10');
});

test('Start date and cycle fill Next renewal until the user picks it', () => {
  const now = '2026-11-27';
  let draft = changeDraft(emptyDraft(), 'start_date', '2026-03-12', now);
  expect(draft.next_date).toBe('2026-12-12');
  draft = changeDraft(draft, 'cycle', 'Yearly', now);
  expect(draft.next_date).toBe('2027-03-12');
  draft = changeDraft(draft, 'next_date', '2027-04-01', now);
  draft = changeDraft(draft, 'cycle', 'Monthly', now);
  expect(draft.next_date).toBe('2027-04-01');
  // No start date: nothing is guessed.
  expect(changeDraft(emptyDraft(), 'cycle', 'Weekly', now).next_date).toBeNull();
});

test('Edit keeps a saved Next renewal when a start date is added', () => {
  const { draft } = draftFromRecord({
    id: 'sub-1', platform_id: 'netflix', name: 'Netflix', plan: null, category: 'Entertainment', billing: 'fixed', price: '15.99', currency: 'USD', cycle: 'Monthly', next_date: '2026-12-12', estimated: false,
    auto_renew: null, trial: null, status: 'active', cancelled_on: null, access_until: null, start_date: null,
  } as unknown as SubscriptionRecord, '2026-11-27');
  expect(changeDraft(draft, 'start_date', '2026-03-05', '2026-11-27').next_date).toBe('2026-12-12');
});
