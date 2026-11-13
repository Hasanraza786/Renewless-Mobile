import type { ScanCycle, SubscriptionFormInput, SubscriptionRecord } from '../types';
import { formatAmount, minorDigits } from './money';
import { addDays } from './scan';

export { CURRENCIES } from './money';
export const CYCLES: ScanCycle[] = ['Monthly', 'Quarterly', 'Yearly', 'Weekly'];
export const CATEGORIES = ['Entertainment', 'Productivity', 'Education', 'Storage', 'Utilities', 'Other'];
export const TRIAL_OPTIONS = ['No trial', '3 days', '7 days', '14 days', '30 days', 'Custom'];
export const PRICE_REASONS = ['Choose an option', 'Price changed', 'Correcting a mistake'];
export const NOTES_LIMIT = 500;

export type SubscriptionDraft = {
  name: string;
  platform_id: string | null;
  price: string;
  currency: string;
  cycle: ScanCycle;
  category: string;
  trial: string;
  custom_days: string;
  start_date: string | null;
  // Kept while a trial hides it, so removing the trial restores it.
  next_date: string | null;
  auto_renew: boolean;
  notes: string;
  price_reason: string;
  effective_on: string;
};

// Edit keeps an exact trial end (from Gmail/AI) until the start or duration changes.
export type TrialOrigin = { start_date: string; days: number; end_date: string } | null;

// One amount rule for every form and review sheet, the server's: up to 12 whole digits, above zero, and no more
// decimals than the currency uses (USD 2, PKR 0, KWD 3; trailing zeros are fine). "1e3" or "12.345" are refused, never
// converted or rounded.
export const AMOUNT_ERROR = 'Enter a valid amount greater than 0 (up to 2 decimals).';
export function isValidAmount(text: string, currency = 'USD') {
  const match = /^(\d{1,12})(?:\.(\d+))?$/.exec(text.trim());
  return !!match && (match[2] ?? '').replace(/0+$/, '').length <= minorDigits(currency) && Number(text) > 0;
}
// The message for a refused amount; a whole-number currency says so, in the server's words.
export function amountError(currency: string) {
  const digits = minorDigits(currency);
  return digits === 0 ? `${currency} amounts have no decimals. Enter a whole amount.` : digits === 3 ? 'Enter a valid amount greater than 0 (up to 3 decimals).' : AMOUNT_ERROR;
}

export type DraftField = 'name' | 'price' | 'custom_days' | 'start_date' | 'next_date' | 'price_reason' | 'effective_on';
export type DraftErrors = Partial<Record<DraftField, string>>;
// Top-to-bottom order of the fields that can show an error, for focusing the first one on submit.
export const FIELD_ORDER: DraftField[] = ['name', 'price', 'price_reason', 'effective_on', 'custom_days', 'start_date', 'next_date'];
export const firstInvalid = (errors: DraftErrors) => FIELD_ORDER.find(field => errors[field]);

export const emptyDraft = (): SubscriptionDraft => ({
  name: '', platform_id: null, price: '', currency: 'USD', cycle: 'Monthly', category: 'Entertainment', trial: 'No trial', custom_days: '',
  start_date: null, next_date: null, auto_renew: true, notes: '', price_reason: PRICE_REASONS[0], effective_on: '',
});

const daysBetween = (from: string, to: string) => Math.round((Date.parse(to) - Date.parse(from)) / 86400000);

export function draftFromRecord(record: SubscriptionRecord, today: string): { draft: SubscriptionDraft; origin: TrialOrigin } {
  const days = record.trial ? daysBetween(record.trial.start_date, record.trial.end_date) : 0;
  const preset = `${days} days`;
  return {
    draft: {
      name: record.name, platform_id: record.platform_id, price: record.price, currency: record.currency, cycle: record.cycle, category: record.category,
      trial: !record.trial ? 'No trial' : TRIAL_OPTIONS.includes(preset) ? preset : 'Custom', custom_days: record.trial && !TRIAL_OPTIONS.includes(preset) ? String(days) : '',
      start_date: record.trial?.start_date ?? record.start_date, next_date: record.next_date, auto_renew: record.trial?.auto_renew ?? true, notes: record.notes ?? '',
      price_reason: PRICE_REASONS[0], effective_on: today,
    },
    origin: record.trial ? { start_date: record.trial.start_date, days, end_date: record.trial.end_date } : null,
  };
}

// Whole trial days, or NaN when the custom value is not a whole number from 1 to 365.
export function trialDays(draft: SubscriptionDraft) {
  if (draft.trial === 'No trial') return 0;
  const value = draft.trial === 'Custom' ? Number(draft.custom_days) : Number.parseInt(draft.trial, 10);
  return draft.trial === 'Custom' && (!/^\d+$/.test(draft.custom_days) || value < 1 || value > 365) ? NaN : value;
}

// Local-date arithmetic; an unchanged exact end wins over the calculation.
export function trialEnd(draft: SubscriptionDraft, origin: TrialOrigin) {
  const days = trialDays(draft);
  if (!draft.start_date || !days) return null;
  if (origin && origin.start_date === draft.start_date && origin.days === days) return origin.end_date;
  return addDays(draft.start_date, days);
}

export function trialSummary(draft: SubscriptionDraft, origin: TrialOrigin, label: (iso: string) => string) {
  const end = trialEnd(draft, origin);
  if (end) return `Trial ends · ${label(end)}`;
  return draft.start_date ? 'Enter valid trial days to calculate the trial end.' : 'Choose a start date to calculate the trial end.';
}

// Amount, currency or cycle differ from the saved values (Edit asks why).
export const priceChanged = (draft: SubscriptionDraft, record: SubscriptionRecord | null) =>
  !!record && (Number(draft.price) !== Number(record.price) || draft.currency !== record.currency || draft.cycle !== record.cycle);

export function validateDraft(draft: SubscriptionDraft, record: SubscriptionRecord | null, today: string): DraftErrors {
  const errors: DraftErrors = {};
  const on_trial = draft.trial !== 'No trial';
  if (!draft.name.trim()) errors.name = 'Enter a platform or service name.';
  else if (draft.name.trim().length > 100) errors.name = 'Use 100 characters or fewer.';
  if (!draft.price.trim()) errors.price = 'Enter the subscription amount.';
  else if (!isValidAmount(draft.price, draft.currency)) errors.price = amountError(draft.currency);
  if (draft.trial === 'Custom') {
    if (!draft.custom_days.trim()) errors.custom_days = 'Enter your trial duration.';
    else if (Number.isNaN(trialDays(draft))) errors.custom_days = 'Enter a whole number from 1 to 365.';
  }
  if (on_trial && !draft.start_date) errors.start_date = 'Select a start date to calculate your trial end date.';
  if (!on_trial && !draft.next_date) errors.next_date = 'Choose the next renewal date.';
  if (priceChanged(draft, record)) {
    if (draft.price_reason === PRICE_REASONS[0]) errors.price_reason = 'Choose whether the price changed or you are correcting a mistake.';
    else if (draft.price_reason === 'Price changed' && (!draft.effective_on || draft.effective_on > today)) errors.effective_on = 'Choose today or a past effective date.';
  }
  return errors;
}

export function draftToInput(draft: SubscriptionDraft, origin: TrialOrigin, record: SubscriptionRecord | null, today: string): SubscriptionFormInput {
  const on_trial = draft.trial !== 'No trial';
  const name = draft.name.trim();
  // A picked suggestion carries its platform; a typed name is linked by name when saving (getPlatformId).
  return {
    name,
    platform_id: draft.platform_id ?? (record && record.name === name ? record.platform_id : null),
    price: formatAmount(draft.currency, draft.price),
    currency: draft.currency,
    cycle: draft.cycle,
    category: draft.category,
    start_date: draft.start_date,
    next_date: on_trial ? null : draft.next_date,
    trial: on_trial ? { days: trialDays(draft), end_date: trialEnd(draft, origin)!, auto_renew: draft.auto_renew } : null,
    notes: draft.notes.trim() || null,
    price_change: priceChanged(draft, record) ? { reason: draft.price_reason === 'Correcting a mistake' ? 'correction' : 'price_changed', effective_on: draft.price_reason === 'Correcting a mistake' ? today : draft.effective_on } : null,
  };
}

// Server field errors (body paths) on the form field that shows them; anything else stays a form-wide message.
const SERVER_FIELDS: Record<string, keyof DraftErrors> = {
  name: 'name',
  platformId: 'name',
  price: 'price',
  'price.amount': 'price',
  'price.currency': 'price',
  cycle: 'price',
  startDate: 'start_date',
  anchorDate: 'next_date',
  trial: 'custom_days',
  'trial.days': 'custom_days',
  priceChange: 'price_reason',
  'priceChange.reason': 'price_reason',
  'priceChange.effectiveDate': 'effective_on',
};

export function draftServerErrors(field_errors: Record<string, string>): DraftErrors {
  const errors: DraftErrors = {};
  for (const [path, message] of Object.entries(field_errors)) {
    const field = SERVER_FIELDS[path];
    if (field && !errors[field]) errors[field] = message;
  }
  return errors;
}
