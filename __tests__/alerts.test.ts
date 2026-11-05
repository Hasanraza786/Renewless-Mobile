import type { SentAlert } from '../src/types';
import { accountDisplay, accountValues, alertMessage, groupAlerts, nextAccountValues, sentLabel } from '../src/utils/alerts';

const today = '2026-10-27';
const alert = (id: string, sent: string, kind: SentAlert['kind'], event_date: string): SentAlert => ({
  id, subscription_id: id, platform_id: id, name: id, kind, event_date, amount: '15.99', currency: 'USD', sent_at: new Date(sent).toISOString(), subscription_available: true,
});

test('alerts group by local sent date, newest first', () => {
  const groups = groupAlerts([alert('old', '2026-10-24T09:00:00', 'renewal', '2026-10-30'), alert('now', '2026-10-27T09:00:00', 'renewal', today), alert('y', '2026-10-26T09:00:00', 'trial_end', '2026-10-31')], today);
  expect(groups.map(group => [group.title, group.alerts.map(item => item.id)])).toEqual([['Today', ['now']], ['Yesterday', ['y']], ['Earlier', ['old']]]);
});

test('wording follows the event date and the sent time', () => {
  expect(alertMessage(alert('n', '2026-10-27T09:00:00', 'renewal', today), today)).toBe('Renews today · USD 15.99');
  expect(alertMessage(alert('s', '2026-10-26T09:00:00', 'trial_end', '2026-10-31'), today)).toBe('Trial ends 31 Oct');
  expect(sentLabel(alert('n', '2026-10-27T09:00:00', 'renewal', today), today)).toBe('9:00 AM');
  expect(sentLabel(alert('s', '2026-10-26T09:00:00', 'renewal', today), today)).toBe('26 Oct · 9:00 AM');
});

test('account Remind me: Off is exclusive and clearing every day means Off', () => {
  expect(nextAccountValues(['3'], '3')).toEqual(['off']);
  expect(nextAccountValues(['off'], 'daily')).toEqual(['1', '2', '3']);
  expect(accountValues([3, 4])).toEqual({ values: ['3', 'custom'], custom: '4' });
  expect(accountDisplay(['1', '2', '3'])).toBe('1, 2, 3 days before');
  expect(accountDisplay(['off'])).toBe('Off');
});
