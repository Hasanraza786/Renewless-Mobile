import { formatAmount } from './money';
import type { MoneyTotal, PaymentRecord } from '../types';

export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Month is 'all' or '01'–'12'; periods use the local paid date, never the billing date.
export type PaymentMonth = string;

const cents = (amount: string) => Math.round(Number(amount) * 100);

// Newest year first.
export const paymentYears = (rows: PaymentRecord[]) => [...new Set(rows.map(row => row.paid_on.slice(0, 4)))].sort().reverse();

// The current year when it has payments, otherwise the newest one.
export const defaultYear = (years: string[], today: string) => (years.includes(today.slice(0, 4)) ? today.slice(0, 4) : years[0] ?? today.slice(0, 4));

// Currencies in first-seen order; each keeps its own total and graph.
export const paymentCurrencies = (rows: PaymentRecord[]) => [...new Set(rows.map(row => row.currency))];

export const inPeriod = (rows: PaymentRecord[], year: string, month: PaymentMonth) =>
  rows.filter(row => row.paid_on.slice(0, 4) === year && (month === 'all' || row.paid_on.slice(5, 7) === month));

export const matchesQuery = (row: PaymentRecord, query: string) => row.name.toLowerCase().includes(query.trim().toLowerCase());

export function paymentTotals(rows: PaymentRecord[]): MoneyTotal[] {
  const sums = new Map<string, number>();
  for (const row of rows) sums.set(row.currency, (sums.get(row.currency) ?? 0) + cents(row.amount));
  return [...sums].map(([currency, total]) => ({ currency, amount: formatAmount(currency, total / 100) }));
}

// Twelve monthly confirmed totals for one currency, as numbers; zero months stay explicit.
export function monthlySeries(rows: PaymentRecord[], year: string, currency: string) {
  const months = Array<number>(12).fill(0);
  for (const row of rows) {
    if (row.currency !== currency || row.paid_on.slice(0, 4) !== year) continue;
    months[Number(row.paid_on.slice(5, 7)) - 1] += cents(row.amount);
  }
  return months.map(total => total / 100);
}

// The month the graph inspects after a period change: the chosen month, or the newest payment month of the year.
export function alignedMonth(rows: PaymentRecord[], year: string, month: PaymentMonth) {
  if (month !== 'all') return month;
  return inPeriod(rows, year, 'all')[0]?.paid_on.slice(5, 7) ?? '01';
}

export const periodLabel = (year: string, month: PaymentMonth) => (month === 'all' ? year : `${MONTH_NAMES[Number(month) - 1]} ${year}`);
