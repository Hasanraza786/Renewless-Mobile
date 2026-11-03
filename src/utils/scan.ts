import type { ScanCandidate } from '../types';

type Totals = Record<string, number>;

export function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(year, month - 1, day + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// "27 Oct"
export function dayMonth(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// Money stays in integer cents per currency; currencies are never converted or merged.
function addCents(totals: Totals, item: ScanCandidate) {
  totals[item.currency] = (totals[item.currency] ?? 0) + Math.round(Number(item.price) * 100);
  return totals;
}

export function formatTotals(totals: Totals) {
  const parts = Object.entries(totals).map(([currency, cents]) => `${currency} ${(cents / 100).toFixed(2)}`);
  return parts.length ? parts.join(' · ') : '—';
}

export const eventDate = (item: ScanCandidate) => item.trial?.ends_on ?? item.next_date;

// Estimated monthly cost of paid plans; active free trials are excluded.
export function paidMonthlyTotals(items: ScanCandidate[]) {
  return items.filter(item => !item.trial).reduce(addCents, {});
}

export function allMonthlyTotals(items: ScanCandidate[]) {
  return items.reduce(addCents, {});
}

// Events from today through today + 7 inclusive; a trial that will not auto-renew charges nothing.
export function upcomingWeek(items: ScanCandidate[], today: string) {
  const last = addDays(today, 7);
  const upcoming = items.filter(item => eventDate(item) >= today && eventDate(item) <= last);
  return {
    count: upcoming.length,
    totals: upcoming.filter(item => item.trial?.auto_renew !== false).reduce(addCents, {}),
  };
}

export function nextEvent(items: ScanCandidate[], today: string) {
  return [...items].filter(item => eventDate(item) >= today).sort((a, b) => eventDate(a).localeCompare(eventDate(b)))[0];
}

// "$15.99" for USD as in the approved design; other currencies keep their code.
export const priceLabel = (item: ScanCandidate) => (item.currency === 'USD' ? `$${item.price}` : `${item.currency} ${item.price}`);
