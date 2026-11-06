import { EMPTY_DRAFT, applyMessage, findDate, missingQuestion } from '../src/utils/ai-draft';

test('a full message produces a ready draft', () => {
  const { draft, reply } = applyMessage(EMPTY_DRAFT, 'I pay USD 9.99 monthly for Duolingo. My next renewal is 20 November 2026.');
  expect(draft).toMatchObject({ name: 'Duolingo', category: 'Education', price: '9.99', currency: 'USD', cycle: 'Monthly', next_date: '2026-11-20' });
  expect(reply).toBe('Your subscription is ready. Tell me if anything needs changing.');
});

test('Loop asks one missing field at a time and never guesses currency or dates', () => {
  const first = applyMessage(EMPTY_DRAFT, 'Netflix $15.99');
  expect(first.draft.currency).toBeNull();
  expect(first.reply).toBe('Which currency is that amount in?');
  const second = applyMessage(first.draft, 'USD, monthly');
  expect(second.reply).toBe('What is the next renewal date? Include the day, month and year.');
  expect(applyMessage(second.draft, 'renews 20 November').reply).toBe('Please include a full date, such as 20 November 2026.');
  expect(applyMessage(second.draft, '31 February 2027').reply).toBe('That date doesn’t look valid. Please use a full date, such as 20 November 2026.');
  expect(missingQuestion(applyMessage(second.draft, '20 November 2026').draft)).toBeNull();
});

test('a trial calculates its end from the start and duration', () => {
  const { draft } = applyMessage(EMPTY_DRAFT, 'Spotify 14-day free trial, then EUR 11.99 monthly. Trial started 1 November 2026.');
  expect(draft.trial).toEqual({ days: 14, end_date: '2026-11-15', auto_renew: true });
  expect(draft.next_date).toBeNull();
  expect(findDate('2026-02-30')).toBe('invalid');
});
