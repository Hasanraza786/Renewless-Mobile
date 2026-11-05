import { COLORS } from '../constants/theme';
import type { HomeEvent } from '../types';
import { dateLabel } from './scan';

// Whole calendar days from `today` to `date`, both local YYYY-MM-DD.
export function daysBetween(today: string, date: string) {
  const [a, b] = [today, date].map(iso => {
    const [year, month, day] = iso.split('-').map(Number);
    return Date.UTC(year, month - 1, day);
  });
  return Math.round((b - a) / 86400000);
}

export function eventStatus(event: HomeEvent, today: string) {
  const days = daysBetween(today, event.date);
  if (event.kind === 'trial_end') return { label: days === 0 ? 'Trial ends today' : 'Trial ending', color: COLORS.trial };
  if (days === 0) return { label: 'Due today', color: COLORS.due_today };
  if (days > 0 && days <= 7) return { label: 'Renewing soon', color: COLORS.renewing_soon };
  return { label: 'Scheduled renewal', color: COLORS.primary };
}

// "In 2 days · 29 Oct 2026"; trials lead with "Trial ends ·".
export function eventTiming(event: HomeEvent, today: string) {
  const days = daysBetween(today, event.date);
  const relative = days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : days < 0 ? 'Past date' : `In ${days} days`;
  return `${event.kind === 'trial_end' ? 'Trial ends · ' : ''}${relative} · ${dateLabel(event.date)}`;
}

// "$9.99" for USD, otherwise the currency code: "EUR 9.99".
export function amountLabel(amount: string, currency: string) {
  return `${currency === 'USD' ? '$' : `${currency} `}${Number(amount).toFixed(2)}`;
}

export function eventAmount(event: HomeEvent) {
  return event.expected_charge ? amountLabel(event.amount, event.currency) : 'No charge scheduled';
}

export function eventCaption(event: HomeEvent) {
  return `${event.kind === 'trial_end' ? 'After trial · ' : ''}${event.cycle}`;
}
