jest.unmock('../src/utils/push');
jest.mock('@react-native-firebase/messaging', () => ({ getMessaging: jest.fn(), getInitialNotification: jest.fn(), getToken: jest.fn(), deleteToken: jest.fn(), onMessage: jest.fn(), onNotificationOpenedApp: jest.fn(), onTokenRefresh: jest.fn() }));
jest.mock('@notifee/react-native', () => ({ __esModule: true, EventType: { PRESS: 1 }, default: { createChannel: jest.fn(async (channel: { id: string }) => channel.id), displayNotification: jest.fn(), onForegroundEvent: jest.fn() } }));
jest.mock('react-native-permissions', () => ({ requestNotifications: jest.fn(), RESULTS: {} }));
jest.mock('../src/navigation/service', () => ({ navigate: jest.fn() }));
jest.mock('../src/redux/actions/support-action', () => ({ getSupportMessages: jest.fn() }));
jest.mock('../src/redux/store', () => ({ __esModule: true, default: { dispatch: jest.fn() } }));

import { navigate } from '../src/navigation/service';
import { openReminder } from '../src/utils/push';

const tap = (data: Record<string, unknown>) => openReminder({ data });

test('an admin push opens its screen, unknown screens open Home', () => {
  tap({ type: 'admin_push', screen: 'home', pushId: 'p' });
  tap({ type: 'admin_push', screen: 'add_subscription', pushId: 'p' });
  tap({ type: 'admin_push', screen: 'inboxes', pushId: 'p' });
  tap({ type: 'admin_push', screen: 'help_support', pushId: 'p' });
  tap({ type: 'admin_push', screen: 'settings', pushId: 'p' });
  tap({ type: 'admin_push', screen: 'constructor', pushId: 'p' });
  expect((navigate as jest.Mock).mock.calls.map(c => c[0])).toEqual(['Home', 'AddSubscription', 'Profile', 'HelpSupport', 'Home', 'Home']);
});

test('reminder pushes still open Detail', () => {
  (navigate as jest.Mock).mockClear();
  tap({ subscriptionId: 's1' });
  expect(navigate).toHaveBeenCalledWith('SubscriptionDetail', { id: 's1' });
});

test('a push that arrives while the app is open is shown by Notifee on Android only, on the FCM fallback channel', async () => {
  const { Platform } = require('react-native');
  const notifee = jest.requireMock('@notifee/react-native').default;
  const { showInApp } = require('../src/utils/push');
  jest.replaceProperty(Platform, 'OS', 'ios');
  await showInApp({ notification: { title: 'Netflix renews tomorrow' } });
  expect(notifee.displayNotification).not.toHaveBeenCalled();
  jest.replaceProperty(Platform, 'OS', 'android');
  await showInApp({ notification: { title: 'Netflix renews tomorrow', body: 'PKR 1,100' }, data: { subscriptionId: 's1' } });
  expect(notifee.createChannel).toHaveBeenCalledWith(expect.objectContaining({ id: 'fcm_fallback_notification_channel' }));
  expect(notifee.displayNotification).toHaveBeenCalledWith(expect.objectContaining({ title: 'Netflix renews tomorrow', body: 'PKR 1,100', data: { subscriptionId: 's1' } }));
});
