jest.unmock('../src/utils/push');
jest.mock('@react-native-firebase/messaging', () => ({ getMessaging: jest.fn(), getInitialNotification: jest.fn(), getToken: jest.fn(), onNotificationOpenedApp: jest.fn(), onTokenRefresh: jest.fn() }));
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
