import { missingQuestion } from '../src/utils/ai-draft';
import type { AiDraft } from '../src/types';

const draft: AiDraft = { name: 'Netflix', platform_id: null, category: null, price: '15.99', currency: 'USD', cycle: 'Monthly', next_date: '2026-12-01', start_date: null, trial: null, notes: null };

test('the AI chat asks for the first missing required field', () => {
  expect(missingQuestion(draft)).toBeNull();
  expect(missingQuestion({ ...draft, currency: null })).toBe('Which currency is that amount in?');
  expect(missingQuestion({ ...draft, next_date: null })).toBe('What is the next renewal date? Include the day, month and year.');
  expect(missingQuestion({ ...draft, trial: { days: 14, end_date: null, auto_renew: true } })).toBe('What date did the trial start? Include the day, month and year.');
});
