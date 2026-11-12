import { getInitialNotification, getMessaging, getToken, onNotificationOpenedApp, onTokenRefresh } from '@react-native-firebase/messaging';
import { requestNotifications, RESULTS } from 'react-native-permissions';
import { navigate } from '../navigation/service';

const messaging = getMessaging();
let initial_checked = false;

// The OS asks only the first time; later calls just read the answer. null when push is not allowed.
export async function pushToken() {
  const { status } = await requestNotifications(['alert', 'sound', 'badge']);
  if (status !== RESULTS.GRANTED && status !== RESULTS.LIMITED) return null;
  return getToken(messaging).catch(() => null);
}

// A reminder push carries its subscription; tapping it opens Detail.
function openReminder(message: { data?: Record<string, unknown> } | null) {
  const id = message?.data?.subscriptionId;
  if (typeof id === 'string') navigate('SubscriptionDetail', { id });
}

// Token refreshes and taps while the app runs; the push that launched the app is opened once.
export function listenToPush(onToken: (token: string) => void) {
  if (!initial_checked) {
    initial_checked = true;
    getInitialNotification(messaging).then(openReminder).catch(() => undefined);
  }
  const offs = [onTokenRefresh(messaging, onToken), onNotificationOpenedApp(messaging, openReminder)];
  return () => offs.forEach(off => off());
}
