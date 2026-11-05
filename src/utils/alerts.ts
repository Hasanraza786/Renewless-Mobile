import type { SentAlert } from '../types';
import { REMINDER_PRESETS, daysText, nextReminderValues, normalizeOffsets } from './reminders';

const localDate = (iso: string) => {
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const shortDate = (iso_date: string) => {
  const [year, month, day] = iso_date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
const timeLabel = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

// Today / Yesterday / Earlier by the local sent date, newest first; empty groups are dropped.
export function groupAlerts(alerts: SentAlert[], today: string) {
  const yesterday = (() => {
    const [year, month, day] = today.split('-').map(Number);
    return localDate(new Date(year, month - 1, day - 1).toISOString());
  })();
  const sorted = [...alerts].sort((a, b) => b.sent_at.localeCompare(a.sent_at));
  const group = (alert: SentAlert) => (localDate(alert.sent_at) === today ? 'Today' : localDate(alert.sent_at) === yesterday ? 'Yesterday' : 'Earlier');
  return ['Today', 'Yesterday', 'Earlier'].map(title => ({ title, alerts: sorted.filter(alert => group(alert) === title) })).filter(item => item.alerts.length);
}

// Event wording uses the event date, so an old alert never claims "today" once that day has passed.
export function alertMessage(alert: SentAlert, today: string) {
  const when = alert.event_date === today ? 'today' : shortDate(alert.event_date);
  return alert.kind === 'trial_end' ? `Trial ends ${when}` : `Renews ${when} · ${alert.currency} ${Number(alert.amount).toFixed(2)}`;
}

// "9:00 AM" for today, otherwise "26 Oct · 9:00 AM".
export function sentLabel(alert: SentAlert, today: string) {
  const day = localDate(alert.sent_at);
  return day === today ? timeLabel(alert.sent_at) : `${shortDate(day)} · ${timeLabel(alert.sent_at)}`;
}

// Account Remind me options: Off is exclusive and an empty selection means Off (no account default here).
export const ACCOUNT_REMINDER_ITEMS = [
  { value: 'off', label: 'Off' },
  { value: 'daily', label: 'Daily for the last 3 days' },
  ...REMINDER_PRESETS.map(days => ({ value: String(days), label: `${days} day${days === 1 ? '' : 's'} before` })),
  { value: 'custom', label: 'Custom days' },
];

export function nextAccountValues(values: string[], value: string) {
  const next = nextReminderValues(values, value);
  return next[0] === 'default' ? ['off'] : next;
}

export function accountValues(days: number[]) {
  if (!days.length) return { values: ['off'], custom: '' };
  const custom = days.find(day => !REMINDER_PRESETS.includes(day));
  return { values: [...days.filter(day => REMINDER_PRESETS.includes(day)).map(String), ...(custom ? ['custom'] : [])], custom: custom ? String(custom) : '' };
}

export function accountDisplay(values: string[]) {
  if (values.includes('off')) return 'Off';
  const days = normalizeOffsets(values, null);
  return [days.length ? daysText(days) : '', values.includes('custom') ? 'Custom days' : ''].filter(Boolean).join(' + ');
}
