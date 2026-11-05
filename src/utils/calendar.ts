import { COLORS } from '../constants/theme';
import type { HomeEvent } from '../types';

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// YYYY-MM moved by count months.
export function shiftMonth(month: string, count: number) {
  const date = new Date(Number(month.slice(0, 4)), Number(month.slice(5, 7)) - 1 + count, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

// "October 2026"
export const monthTitle = (month: string) => new Date(Number(month.slice(0, 4)), Number(month.slice(5, 7)) - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

// A date cell's marker: today's events are coral, past ones muted, trial-only dates blue, others amber.
// Trial-only dates count trials; any renewal makes it a general due count.
export function dayMarker(events: HomeEvent[], date: string, today: string) {
  if (!events.length) return null;
  const trial_only = events.every(event => event.kind === 'trial_end');
  const color = date === today ? COLORS.due_today : date < today ? COLORS.text_secondary : events.some(event => event.kind === 'trial_end') ? COLORS.trial : COLORS.renewing_soon;
  return { label: `${events.length} ${trial_only ? 'trial' : 'due'}`, color };
}

// The bottom card: the viewed month's first event from today on, or null for All clear.
export function nearestEvent(events: HomeEvent[], today: string) {
  const event = events.find(item => item.date >= today);
  if (!event) return null;
  const is_today = event.date === today;
  const heading = event.kind === 'trial_end' ? (is_today ? 'Trial ends today' : 'Trial ending') : is_today ? 'Due today' : 'Next renewal';
  return { event, heading };
}
