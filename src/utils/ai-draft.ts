import { PLATFORM_CATALOG } from '../constants/catalog';
import type { AiDraft, ScanCycle } from '../types';
import { addDays } from './scan';

export const EMPTY_DRAFT: AiDraft = { name: null, platform_id: null, category: null, price: null, currency: null, cycle: null, next_date: null, start_date: null, trial: null, notes: null };

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const CURRENCY_SYMBOLS: Record<string, string> = { '€': 'EUR', '£': 'GBP' };
const CODES = 'USD|EUR|GBP|PKR|AED|INR';
const CYCLE_WORDS: [RegExp, ScanCycle][] = [
  [/\b(weekly|every week|per week|a week)\b/i, 'Weekly'],
  [/\b(monthly|every month|per month|a month)\b/i, 'Monthly'],
  [/\b(quarterly|every quarter|every 3 months)\b/i, 'Quarterly'],
  [/\b(yearly|annually|annual|every year|per year|a year)\b/i, 'Yearly'],
];

const pad = (value: number) => String(value).padStart(2, '0');
const validDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

// A full local date in the text: "20 November 2026", "November 20, 2026" or "2026-11-20".
// 'partial' when a day/month is given without a year; 'invalid' when it does not exist.
export function findDate(text: string): string | 'partial' | 'invalid' | null {
  const iso = text.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  const named = text.match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(${MONTHS.join('|')})\\s*,?\\s*(\\d{4})?\\b`, 'i'));
  const us = text.match(new RegExp(`\\b(${MONTHS.join('|')})\\s+(\\d{1,2})(?:st|nd|rd|th)?\\s*,?\\s*(\\d{4})?\\b`, 'i'));
  let parts: [number, number, number | null] | null = null;
  if (iso) parts = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  else if (named) parts = [named[3] ? Number(named[3]) : NaN, MONTHS.indexOf(named[2].toLowerCase()) + 1, Number(named[1])];
  else if (us) parts = [us[3] ? Number(us[3]) : NaN, MONTHS.indexOf(us[1].toLowerCase()) + 1, Number(us[2])];
  if (!parts) return null;
  const [year, month, day] = parts as [number, number, number];
  if (Number.isNaN(year)) return 'partial';
  return validDate(year, month, day) ? `${year}-${pad(month)}-${pad(day)}` : 'invalid';
}

function findMoney(text: string): { price: string; currency: string | null } | null {
  const coded = text.match(new RegExp(`\\b(${CODES})\\s?(\\d+(?:[.,]\\d{1,2})?)\\b`, 'i')) ?? text.match(new RegExp(`\\b(\\d+(?:[.,]\\d{1,2})?)\\s?(${CODES})\\b`, 'i'));
  if (coded) {
    const [first, second] = [coded[1], coded[2]];
    const code = /^\d/.test(first) ? second : first;
    const amount = /^\d/.test(first) ? first : second;
    return { price: Number(amount.replace(',', '.')).toFixed(2), currency: code.toUpperCase() };
  }
  const symbol = text.match(/([€£$])\s?(\d+(?:[.,]\d{1,2})?)/);
  // A bare $ is ambiguous (USD, CAD, AUD…), so the currency is asked rather than guessed.
  if (symbol) return { price: Number(symbol[2].replace(',', '.')).toFixed(2), currency: CURRENCY_SYMBOLS[symbol[1]] ?? null };
  const bare = text.match(/\b(\d+[.,]\d{2})\b/);
  return bare ? { price: Number(bare[1].replace(',', '.')).toFixed(2), currency: null } : null;
}

export function findService(text: string) {
  const value = text.toLowerCase();
  return PLATFORM_CATALOG.find(entry => [entry.name, ...(entry.aliases ?? [])].some(alias => value.includes(alias.toLowerCase()))) ?? null;
}

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

// Applies one message to the draft. Nothing is guessed: unknown money, currency and dates stay missing.
export function applyMessage(current: AiDraft, text: string): { draft: AiDraft; reply: string } {
  const draft: AiDraft = { ...current, trial: current.trial ? { ...current.trial } : null };
  let changed = false;
  const note = text.match(/\bnote[:\s]+(.+)$/i);
  if (note) {
    draft.notes = note[1].trim();
    return { draft, reply: 'Note updated.' };
  }
  const service = findService(text);
  if (service && service.name !== draft.name) {
    // A different service is a new subscription intent, so the draft starts over.
    if (draft.name) Object.assign(draft, EMPTY_DRAFT);
    Object.assign(draft, { name: service.name, platform_id: service.platform_id, category: service.category });
    changed = true;
  }
  const money = findMoney(text);
  if (money) {
    draft.price = money.price;
    if (money.currency) draft.currency = money.currency;
    changed = true;
  } else if (!draft.currency) {
    const code = text.match(new RegExp(`\\b(${CODES})\\b`, 'i'));
    if (code) {
      draft.currency = code[1].toUpperCase();
      changed = true;
    }
  }
  const cycle = CYCLE_WORDS.find(([pattern]) => pattern.test(text));
  if (cycle) {
    draft.cycle = cycle[1];
    changed = true;
  }
  const trial_days = text.match(/\b(\d{1,3})[- ]day(?:s)?\b(?:[^.]*)\btrial\b/i) ?? text.match(/\btrial\b[^.]*?\b(\d{1,3})[- ]day/i);
  if (trial_days) {
    const days = Number(trial_days[1]);
    if (days < 1 || days > 365) return { draft, reply: 'Tell me a trial duration between 1 and 365 days.' };
    draft.trial = { days, end_date: draft.start_date ? addDays(draft.start_date, days) : null, auto_renew: draft.trial?.auto_renew ?? true };
    draft.next_date = null;
    changed = true;
  }
  const date = findDate(text);
  if (date === 'partial') return { draft, reply: 'Please include a full date, such as 20 November 2026.' };
  if (date === 'invalid') return { draft, reply: 'That date doesn’t look valid. Please use a full date, such as 20 November 2026.' };
  if (date) {
    if (draft.trial && /\btrial\s+(started|start|began)\b|\bstarted\b/i.test(text)) {
      draft.start_date = date;
      if (draft.trial.days) draft.trial.end_date = addDays(date, draft.trial.days);
    } else if (draft.trial) draft.trial.end_date = date;
    else draft.next_date = date;
    changed = true;
  }
  if (/\b(no|don't|do not|won't)\b[^.]*\b(renew|auto-?renew)/i.test(text) && draft.trial) {
    draft.trial.auto_renew = false;
    changed = true;
  }
  const question = missingQuestion(draft);
  if (question && (changed || !current.name)) return { draft, reply: question };
  if (!changed) return { draft, reply: current.name ? 'What would you like to change—the amount, billing cycle, renewal date or a note?' : 'Which service would you like to add? Send its name and billing details.' };
  return { draft, reply: 'Your subscription is ready. Tell me if anything needs changing.' };
}
