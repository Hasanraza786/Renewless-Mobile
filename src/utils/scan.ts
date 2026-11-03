import type { ScanCandidate, ScanCycle } from '../types';

type Totals = Record<string, number>;

export function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(year, month - 1, day + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// "27 Oct 2026"
export function dateLabel(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const moneyLabel = (item: ScanCandidate) => `${item.currency} ${Number(item.price).toFixed(2)}`;

const cents = (item: ScanCandidate) => Math.round(Number(item.price) * 100);
const MONTHLY_FACTOR: Record<ScanCycle, number> = { Weekly: 52 / 12, Monthly: 1, Quarterly: 1 / 3, Yearly: 1 / 12 };

// Totals stay in cents per currency; currencies are never converted or merged.
export function formatTotals(totals: Totals) {
  const parts = Object.entries(totals).map(([currency, amount]) => `${currency} ${(amount / 100).toFixed(2)}`);
  return parts.length ? parts.join(' · ') : '—';
}

// Estimated monthly cost: paid plans normalised to a month; active free trials are excluded. With
// only trials selected, their currencies show a zero total rather than a dash.
export function paidMonthlyTotals(items: ScanCandidate[]) {
  const totals: Totals = {};
  for (const item of items) {
    if (item.trial || !(cents(item) >= 0)) continue;
    totals[item.currency] = (totals[item.currency] ?? 0) + cents(item) * MONTHLY_FACTOR[item.cycle];
  }
  if (!Object.keys(totals).length) for (const item of items) if (item.trial) totals[item.currency] = 0;
  return Object.fromEntries(Object.entries(totals).map(([currency, amount]) => [currency, Math.round(amount)]));
}

// Events on exactly seven calendar dates, today through today + 6. Trial endings count as events but
// add a charge only when the trial auto-renews.
export function upcomingWeek(items: ScanCandidate[], today: string) {
  const last = addDays(today, 6);
  const upcoming = items.filter(item => item.next_date && item.next_date >= today && item.next_date <= last);
  const totals: Totals = {};
  for (const item of upcoming) {
    if (item.trial && !item.trial.auto_renew) continue;
    totals[item.currency] = (totals[item.currency] ?? 0) + cents(item);
  }
  return { count: upcoming.length, totals };
}

export function nextEvent(items: ScanCandidate[], today: string) {
  return items
    .filter(item => item.next_date && item.next_date >= today)
    .sort((a, b) => a.next_date!.localeCompare(b.next_date!) || a.id.localeCompare(b.id))[0];
}
