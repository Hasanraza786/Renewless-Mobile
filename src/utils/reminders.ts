import type { ReminderPreference } from '../types';

export const REMINDER_PRESETS = [1, 2, 3, 5, 7, 10, 20];
export const LAST_THREE_DAYS = ['1', '2', '3'];

// Dropdown values: 'default' and 'off' are exclusive; 'daily' toggles 1, 2 and 3 together; 'custom' adds typed days.
export function nextReminderValues(values: string[], value: string) {
  const exclusive = ['default', 'off'];
  if (exclusive.includes(value)) return [value];
  const set = new Set(values.filter(item => !exclusive.includes(item)));
  const toggle = value === 'daily' ? LAST_THREE_DAYS : [value];
  const remove = toggle.every(item => set.has(item));
  toggle.forEach(item => (remove ? set.delete(item) : set.add(item)));
  return set.size ? [...set] : ['default'];
}

// Whole days 1–365, unique, ascending.
export function normalizeOffsets(values: string[], custom: number | null) {
  const days = values.flatMap(item => (item === 'custom' ? (custom === null ? [] : [custom]) : /^\d+$/.test(item) ? [Number(item)] : []));
  return [...new Set(days.filter(day => Number.isInteger(day) && day >= 1 && day <= 365))].sort((a, b) => a - b);
}

export function daysText(days: number[]) {
  return days.length ? `${days.join(', ')} day${days.length === 1 && days[0] === 1 ? '' : 's'} before` : 'Off';
}

// Only the account-default days that still fit before the event apply to this subscription.
export function effectiveDays(pref: ReminderPreference, account_days: number[], remaining: number) {
  const days = pref.mode === 'off' ? [] : pref.mode === 'days' ? pref.days : account_days;
  return days.filter(day => day <= remaining);
}

export function reminderText(pref: ReminderPreference, account_days: number[], remaining: number) {
  const text = daysText(effectiveDays(pref, account_days, remaining));
  return pref.mode === 'default' ? `Default · ${text}` : text;
}

export function preferenceFromValues(values: string[], custom: number | null): ReminderPreference {
  if (values.includes('default')) return { mode: 'default' };
  const days = normalizeOffsets(values, custom);
  return days.length ? { mode: 'days', days } : { mode: 'off' };
}
