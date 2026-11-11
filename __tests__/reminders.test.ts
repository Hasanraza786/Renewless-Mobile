import { daysText, defaultTooClose, nextReminderValues, preferenceFromValues, reminderText } from '../src/utils/reminders';

test('default and off are exclusive; days add and remove; last 3 days toggles as a group', () => {
  expect(nextReminderValues(['default'], '3')).toEqual(['3']);
  expect(nextReminderValues(['3'], '7')).toEqual(['3', '7']);
  expect(nextReminderValues(['3', '7'], 'off')).toEqual(['off']);
  expect(nextReminderValues(['3'], 'daily')).toEqual(['3', '1', '2']);
  expect(nextReminderValues(['1', '2', '3'], 'daily')).toEqual(['default']);
  expect(nextReminderValues(['7'], '7')).toEqual(['default']);
});

test('values become a preference with unique ascending days', () => {
  expect(preferenceFromValues(['default'], null)).toEqual({ mode: 'default' });
  expect(preferenceFromValues(['7', 'custom', '3'], 4)).toEqual({ mode: 'days', days: [3, 4, 7] });
  expect(preferenceFromValues(['off'], null)).toEqual({ mode: 'off' });
});

test('labels show the account default and only days that fit', () => {
  expect(daysText([1])).toBe('1 day before');
  expect(daysText([1, 3])).toBe('1, 3 days before');
  expect(reminderText({ mode: 'default' }, [7, 3], 4)).toBe('Default · 3 days before');
  // No default day fits: still the default, not Off (Detail adds the too-close note).
  expect(reminderText({ mode: 'default' }, [3], 2)).toBe('Default · 3 days before');
  expect(defaultTooClose({ mode: 'default' }, [3], 2)).toBe(true);
  expect(defaultTooClose({ mode: 'default' }, [7, 3], 4)).toBe(false);
  expect(defaultTooClose({ mode: 'default' }, [], 2)).toBe(false);
  expect(reminderText({ mode: 'days', days: [2, 1] }, [3], 4)).toBe('2, 1 days before');
  expect(reminderText({ mode: 'off' }, [3], 4)).toBe('Off');
});
