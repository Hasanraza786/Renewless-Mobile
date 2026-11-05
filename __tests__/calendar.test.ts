import { monthEvents } from '../src/api_services/home';
import type { HomeEvent } from '../src/types';
import { dayMarker, nearestEvent, shiftMonth } from '../src/utils/calendar';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));

const today = '2026-10-27';
const ev = (id: string, date: string, kind: HomeEvent['kind'] = 'renewal'): HomeEvent => ({
  id: `${id}:${date}`, subscription_id: id, platform_id: id, name: id, plan: null, date, kind, amount: '1.00', currency: 'USD', cycle: 'Monthly', expected_charge: true, estimated: false,
});

test('months shift across years', () => {
  expect(shiftMonth('2026-12', 1)).toBe('2027-01');
  expect(shiftMonth('2026-01', -1)).toBe('2025-12');
});

test('date markers follow today, past, trial-only and due counts', () => {
  expect(dayMarker([], today, today)).toBeNull();
  expect(dayMarker([ev('a', today)], today, today)!.label).toBe('1 due');
  expect(dayMarker([ev('a', '2026-10-31', 'trial_end')], '2026-10-31', today)!.label).toBe('1 trial');
  expect(dayMarker([ev('a', '2026-10-31', 'trial_end'), ev('b', '2026-10-31')], '2026-10-31', today)!.label).toBe('2 due');
});

test('the nearest card skips past events and names the event', () => {
  expect(nearestEvent([ev('a', '2026-10-02'), ev('b', today)], today)!.heading).toBe('Due today');
  expect(nearestEvent([ev('a', '2026-10-31', 'trial_end')], today)!.heading).toBe('Trial ending');
  expect(nearestEvent([ev('a', '2026-10-02')], today)).toBeNull();
});

test('month events clamp month ends and stop at the start date', () => {
  const base = { platform_id: 'x', name: 'x', plan: null, price: '5.00', currency: 'USD', estimated: false };
  const items = [
    { ...base, id: 'monthly', cycle: 'Monthly' as const, next_date: '2027-01-31', start_date: '2026-11-30' },
    { ...base, id: 'unknown-start', cycle: 'Monthly' as const, next_date: '2026-11-10', start_date: null },
  ];
  expect(monthEvents(items, '2027-02').map(item => item.date)).toEqual(['2027-02-10', '2027-02-28']);
  expect(monthEvents(items, '2026-12').map(item => item.id)).toEqual(['unknown-start:2026-12-10', 'monthly:2026-12-31']);
  // Before the start date nothing projects; with no start only the previous cycle does.
  expect(monthEvents(items, '2026-10').map(item => item.id)).toEqual(['unknown-start:2026-10-10']);
  expect(monthEvents(items, '2026-09')).toEqual([]);
});
