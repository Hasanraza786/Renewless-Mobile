import { COLORS } from '../constants/theme';
import type { HomeEvent, SubscriptionRecord } from '../types';
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

// Shared card content for an event row. Home names the plan alone ("Family"); lists add "plan".
export function eventCardProps(event: HomeEvent, today: string, plan_suffix = false) {
  return {
    name: event.name,
    platform_id: event.platform_id,
    status: eventStatus(event, today),
    lines: [eventTiming(event, today), ...(event.plan ? [plan_suffix ? `${event.plan} plan` : event.plan] : []), ...(event.estimated && event.kind === 'renewal' ? ['Estimated renewal date'] : [])],
    amount: eventAmount(event),
    caption: eventCaption(event),
    accessibility_label: `View ${event.name}${event.plan ? ` ${event.plan}` : ''} subscription`,
  };
}

// Lifecycle status of a tracked record, as List and Platform subscriptions show it.
export function recordStatus(record: SubscriptionRecord, today: string) {
  if (record.status === 'cancelled') return { label: 'Cancelled', color: COLORS.text_secondary };
  if (record.status === 'expired') return { label: 'Expired', color: COLORS.expired };
  if (record.trial && record.trial.end_date < today) {
    if (!record.trial.auto_renew) return { label: 'Trial ended', color: COLORS.text_secondary };
  } else if (record.trial) {
    return { label: daysBetween(today, record.trial.end_date) <= 7 ? 'Trial ending soon' : 'Trial', color: COLORS.trial };
  }
  if (!record.next_date) return { label: 'Needs date', color: COLORS.trial };
  const days = daysBetween(today, record.next_date);
  if (days === 0) return { label: 'Due today', color: COLORS.due_today };
  if (days > 0 && days <= 7) return { label: 'Renewing soon', color: COLORS.renewing_soon };
  return { label: 'Active', color: COLORS.primary };
}

const relative = (today: string, date: string) => {
  const days = daysBetween(today, date);
  return days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : days < 0 ? 'Past date' : `In ${days} days`;
};

export function recordCardProps(record: SubscriptionRecord, today: string) {
  const in_trial = record.trial && record.trial.end_date >= today;
  const timing =
    record.status === 'cancelled'
      ? `Cancelled ${record.cancelled_on ? dateLabel(record.cancelled_on) : ''}`.trim()
      : record.trial && !in_trial && !record.trial.auto_renew
        ? `Trial ended ${dateLabel(record.trial.end_date)}`
        : in_trial
          ? `Trial ends · ${relative(today, record.trial!.end_date)} · ${dateLabel(record.trial!.end_date)}`
          : record.next_date
            ? `${relative(today, record.next_date)} · ${dateLabel(record.next_date)}`
            : null;
  return {
    name: record.name,
    platform_id: record.platform_id,
    status: recordStatus(record, today),
    lines: [
      timing ?? { text: 'Add renewal date ›', color: COLORS.trial },
      ...(record.plan ? [`${record.plan} plan`] : []),
      ...(record.estimated && record.status === 'active' && record.next_date && !in_trial ? ['Estimated renewal date'] : []),
    ],
    amount: amountLabel(record.price, record.currency),
    caption: `${in_trial ? 'After trial · ' : ''}${record.cycle}`,
    accessibility_label: `View ${record.name}${record.plan ? ` ${record.plan}` : ''} subscription`,
  };
}
