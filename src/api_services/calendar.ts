import { USE_MOCK_API } from '../config/api';
import type { CalendarMonth, MoneyTotal } from '../types';
import { localToday } from '../utils/dates';
import { monthEvents, trackedForHome } from './home';
import { request } from './http';
import { allRecords } from './subscription-store';

// One month's events from the same schedule as Home; month is YYYY-MM in the user's calendar.
export async function getCalendarMonth(token: string, month: string): Promise<CalendarMonth> {
  if (!USE_MOCK_API) return request<CalendarMonth>(`/calendar?month=${month}`, { token });
  await new Promise<void>(resolve => setTimeout(resolve, 250));
  const today = localToday();
  const events = monthEvents(trackedForHome(allRecords(), today), month);
  const cents = new Map<string, number>();
  // Expected charges only: a trial ending without auto-renew is an event with no charge.
  for (const item of events.filter(event => event.expected_charge)) cents.set(item.currency, (cents.get(item.currency) ?? 0) + Math.round(Number(item.amount) * 100));
  const expected: MoneyTotal[] = [...cents].map(([currency, total]) => ({ currency, amount: (total / 100).toFixed(2) }));
  return { month, today, events, expected };
}
