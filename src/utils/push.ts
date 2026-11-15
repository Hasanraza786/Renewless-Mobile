import { getInitialNotification, getMessaging, getToken, onNotificationOpenedApp, onTokenRefresh } from '@react-native-firebase/messaging';
import { requestNotifications, RESULTS } from 'react-native-permissions';
import { navigate } from '../navigation/service';
import { getSupportMessages } from '../redux/actions/support-action';
import store from '../redux/store';

const messaging = getMessaging();
let initial_checked = false;

// The OS asks only the first time; later calls just read the answer. null when push is not allowed.
export async function pushToken() {
  const { status } = await requestNotifications(['alert', 'sound', 'badge']);
  if (status !== RESULTS.GRANTED && status !== RESULTS.LIMITED) return null;
  return getToken(messaging).catch(() => null);
}

// A reminder push carries its subscription and opens Detail. A support reply opens Help & support with the
// messages reloaded (Help & support may already be the open screen), so the reply shows as New reply.
function openReminder(message: { data?: Record<string, unknown> } | null) {
  const data = message?.data;
  if (data?.type === 'support_reply') {
    store.dispatch(getSupportMessages());
    navigate('HelpSupport');
  } else if (typeof data?.subscriptionId === 'string') navigate('SubscriptionDetail', { id: data.subscriptionId });
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
