import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { HomeEvent, HomeSnapshot, HomeSpending, HomeTrial, MoneyTotal, ScanCycle, SubscriptionRecord } from '../types';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';
import { request } from './http';
import { allReceipts, allRecords } from './subscription-store';

export function getHome(token: string): Promise<HomeSnapshot> {
  return USE_MOCK_API ? mockHome() : request<HomeSnapshot>('/home', { token });
}

// ---- Development mock: builds the snapshot the way the backend contract describes. ----

type MockRecord = {
  id: string;
  platform_id: string;
  name: string;
  plan: string | null;
  price: string;
  currency: string;
  cycle: ScanCycle;
  next_date: string | null;
  estimated: boolean;
  trial?: { auto_renew: boolean };
};

let failed_once = false;

export function resetMockHome() {
  failed_once = false;
}

const cents = (value: string) => Math.round(Number(value) * 100);
const decimal = (value: number) => (value / 100).toFixed(2);
const MONTHLY_FACTOR: Record<ScanCycle, number> = { Weekly: 52 / 12, Monthly: 1, Quarterly: 1 / 3, Yearly: 1 / 12 };
const MONTH_STEP: Record<ScanCycle, number> = { Weekly: 0, Monthly: 1, Quarterly: 3, Yearly: 12 };

const monthOf = (iso: string) => iso.slice(0, 7);

function addMonths(month: string, count: number) {
  const [year, value] = month.split('-').map(Number);
  const date = new Date(year, value - 1 + count, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function lastDayOf(month: string) {
  const [year, value] = month.split('-').map(Number);
  return `${month}-${String(new Date(year, value, 0).getDate()).padStart(2, '0')}`;
}

// The nth occurrence after the anchor, clamping the anchor day to short months (31 Jan → 28 Feb).
function occurrence(anchor: string, cycle: ScanCycle, index: number) {
  if (cycle === 'Weekly') return addDays(anchor, index * 7);
  const month = addMonths(monthOf(anchor), index * MONTH_STEP[cycle]);
  const day = Math.min(Number(anchor.slice(8)), Number(lastDayOf(month).slice(8)));
  return `${month}-${String(day).padStart(2, '0')}`;
}

// Scheduled charges from the next renewal up to `last`; a trial charges at its end only when it auto-renews.
function charges(record: MockRecord, last: string) {
  const dates: string[] = [];
  if (!record.next_date || (record.trial && !record.trial.auto_renew)) return dates;
  for (let index = 0; ; index++) {
    const date = occurrence(record.next_date, record.cycle, index);
    if (date > last) return dates;
    dates.push(date);
  }
}

function sumByCurrency(items: { currency: string; amount: number }[]): MoneyTotal[] {
  const totals = new Map<string, number>();
  for (const item of items) totals.set(item.currency, (totals.get(item.currency) ?? 0) + item.amount);
  return [...totals].map(([currency, amount]) => ({ currency, amount: decimal(amount) }));
}

// Home counts actively tracked plans: not cancelled/expired, and not a trial that ended without renewing.
export function trackedForHome(list: SubscriptionRecord[], today: string): MockRecord[] {
  return list
    .filter(item => item.status === 'active' && !(item.trial && item.trial.end_date < today && !item.trial.auto_renew))
    .map(item => {
      const in_trial = item.trial && item.trial.end_date >= today;
      return {
        id: item.id,
        platform_id: item.platform_id,
        name: item.name,
        plan: item.plan,
        price: item.price,
        currency: item.currency,
        cycle: item.cycle,
        next_date: in_trial ? item.trial!.end_date : item.next_date,
        estimated: item.estimated,
        ...(in_trial ? { trial: { auto_renew: item.trial!.auto_renew } } : null),
      };
    });
}

export function buildHomeSnapshot(items: MockRecord[], receipts: { subscription_id: string; amount: string; currency: string; paid_on: string }[], today: string): HomeSnapshot {
  const month = monthOf(today);
  const month_end = lastDayOf(month);
  const upcoming_end = lastDayOf(addMonths(month, 2));

  const event = (item: MockRecord, date: string, kind: HomeEvent['kind']): HomeEvent => ({
    id: `${item.id}:${date}`,
    subscription_id: item.id,
    platform_id: item.platform_id,
    name: item.name,
    plan: item.plan,
    date,
    kind,
    amount: item.price,
    currency: item.currency,
    cycle: item.cycle,
    expected_charge: kind === 'renewal' || !!item.trial?.auto_renew,
    estimated: item.estimated,
  });
  const byDate = (a: HomeEvent, b: HomeEvent) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name) || a.subscription_id.localeCompare(b.subscription_id);

  // Upcoming: each dated subscription's next event, date ascending, distinct by subscription.
  const events: HomeEvent[] = items
    .filter(item => item.next_date && item.next_date >= today && item.next_date <= upcoming_end)
    .map(item => event(item, item.next_date!, item.trial ? 'trial_end' : 'renewal'));
  events.sort(byDate);

  // This month: every scheduled event in the month, including a paid plan's earlier cycle.
  const month_events: HomeEvent[] = [];
  for (const item of items) {
    if (!item.next_date) continue;
    if (item.trial) {
      if (monthOf(item.next_date) === month) month_events.push(event(item, item.next_date, 'trial_end'));
      continue;
    }
    for (let index = -1; ; index++) {
      const date = occurrence(item.next_date, item.cycle, index);
      if (date > month_end) break;
      if (monthOf(date) === month) month_events.push(event(item, date, 'renewal'));
    }
  }
  month_events.sort(byDate);
  const nearest = events[0] && events[0].date <= addDays(today, 6) ? events.filter(item => item.date === events[0].date) : [];

  const paid = receipts.filter(item => monthOf(item.paid_on) === month && item.paid_on <= today);
  const month_charges = items.flatMap(item => charges(item, month_end).filter(date => date >= today).map(() => ({ currency: item.currency, amount: cents(item.price) })));

  // Monthly-equivalent spend of paid plans, one row per platform within each currency.
  const spending: HomeSpending[] = [];
  const paid_plans = items.filter(item => !item.trial);
  for (const currency of [...new Set(paid_plans.map(item => item.currency))]) {
    const platforms = new Map<string, { name: string; amount: number; count: number }>();
    for (const item of paid_plans.filter(plan => plan.currency === currency)) {
      const row = platforms.get(item.platform_id) ?? { name: item.name, amount: 0, count: 0 };
      row.amount += cents(item.price) * MONTHLY_FACTOR[item.cycle];
      row.count += 1;
      platforms.set(item.platform_id, row);
    }
    const sorted = [...platforms].sort((a, b) => b[1].amount - a[1].amount);
    const total = sorted.reduce((sum, [, row]) => sum + row.amount, 0);
    const percent = (amount: number) => (total ? Math.round((amount / total) * 100) : 0);
    const rest = sorted.slice(3);
    const rest_amount = rest.reduce((sum, [, row]) => sum + row.amount, 0);
    spending.push({
      currency,
      total: decimal(Math.round(total)),
      platforms: sorted.slice(0, 3).map(([platform_id, row]) => ({ platform_id, name: row.name, amount: decimal(Math.round(row.amount)), percent: percent(row.amount), subscription_count: row.count })),
      all_platforms: sorted.map(([platform_id, row]) => ({ platform_id, name: row.name, amount: decimal(Math.round(row.amount)), percent: percent(row.amount), subscription_count: row.count })),
      others: rest.length ? { amount: decimal(Math.round(rest_amount)), percent: percent(rest_amount), platform_count: rest.length } : null,
    });
  }

  const trials: HomeTrial[] = items
    .filter(item => item.trial && item.next_date && item.next_date >= today)
    .map(item => ({ subscription_id: item.id, platform_id: item.platform_id, name: item.name, end_date: item.next_date!, then_amount: item.price, currency: item.currency, cycle: item.cycle }));

  const forecast_end = lastDayOf(addMonths(month, 5));
  const forecast = [...new Set(items.map(item => item.currency))].map(currency => {
    const totals = new Map<string, number>();
    for (const item of items.filter(record => record.currency === currency)) {
      const dates = charges(item, forecast_end);
      // Full-month view: a paid plan's previous cycle earlier this month still counts for the current month.
      const previous = item.next_date && !item.trial ? occurrence(item.next_date, item.cycle, -1) : '';
      if (previous && monthOf(previous) === month) dates.push(previous);
      for (const date of dates) totals.set(monthOf(date), (totals.get(monthOf(date)) ?? 0) + cents(item.price));
    }
    return { currency, months: Array.from({ length: 6 }, (_, index) => addMonths(month, index)).map(key => ({ month: key, amount: decimal(totals.get(key) ?? 0) })) };
  });

  return {
    as_of: new Date().toISOString(),
    today,
    has_subscriptions: items.length > 0,
    nearest_events: nearest,
    upcoming_count: events.length,
    upcoming: events,
    upcoming_until: upcoming_end,
    month: {
      month,
      paid: sumByCurrency(paid.map(item => ({ currency: item.currency, amount: cents(item.amount) }))),
      receipt_count: paid.length,
      upcoming: sumByCurrency(month_charges),
      charge_count: month_charges.length,
      expected: sumByCurrency(month_events.filter(item => item.expected_charge).map(item => ({ currency: item.currency, amount: cents(item.amount) }))),
      events: month_events,
    },
    spending,
    trials,
    forecast,
  };
}

async function mockHome(): Promise<HomeSnapshot> {
  await new Promise<void>(resolve => setTimeout(resolve, MOCK_DATA.home_latency_ms));
  if (MOCK_DATA.home_scenario === 'error' && !failed_once) {
    failed_once = true;
    throw new Error('We couldn’t load your dashboard. Check your connection and try again.');
  }
  const today = localToday();
  return buildHomeSnapshot(trackedForHome(allRecords(), today), allReceipts(), today);
}
