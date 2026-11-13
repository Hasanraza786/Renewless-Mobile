import type { AiDraft } from '../types';

// The next question for a missing required field, or null when the draft can be added.
export function missingQuestion(draft: AiDraft): string | null {
  if (!draft.name) return 'Which subscription service is this? Tell me its name, or confirm the displayed name below.';
  if (!draft.price || !(Number(draft.price) > 0)) return 'How much does it cost? For a trial, tell me the price after the trial.';
  if (!draft.currency) return 'Which currency is that amount in?';
  if (!draft.cycle) return 'How often are you billed—weekly, monthly, quarterly or yearly?';
  if (draft.trial) {
    if (!draft.trial.end_date && !draft.start_date) return 'What date did the trial start? Include the day, month and year.';
    if (!draft.trial.end_date) return 'When does the trial end? Include the full date.';
    return null;
  }
  return draft.next_date ? null : 'What is the next renewal date? Include the day, month and year.';
}
