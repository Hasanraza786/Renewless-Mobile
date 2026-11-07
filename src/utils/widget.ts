import { Linking, NativeModules } from 'react-native';
import { navigate } from '../navigation/service';
import type { HomeEvent, HomeSnapshot } from '../types';

// iOS widget bridge (ios/Renewless/WidgetBridge.swift); absent on Android and in tests, so every call is a no-op there.
const bridge: { setSnapshot(json: string): void; clear(): void; isInstalled(): Promise<boolean> } | undefined = NativeModules.RenewlessWidget;

// The widget shows the earliest upcoming renewal or trial end, the same order as Home, and how many more share its date.
export function widgetEvent(home: HomeSnapshot): { event: HomeEvent | null; more: number } {
  const event = home.nearest_events[0] ?? home.upcoming[0] ?? null;
  const same_day = home.nearest_events.length ? home.nearest_events : home.upcoming.filter(item => item.date === event?.date);
  return { event, more: event ? Math.max(0, same_day.length - 1) : 0 };
}

// Small widget wording, shared with the native widget (ios/RenewlessWidget).
export function widgetCopy(event: HomeEvent, today: string) {
  const days = Math.round((Date.parse(`${event.date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000);
  const trial = event.kind === 'trial_end';
  const price = Number(event.amount);
  const [year, month, day] = event.date.split('-').map(Number);
  const short_date = new Date(year, month - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return {
    tone: trial ? ('trial' as const) : days === 0 ? ('today' as const) : ('renewal' as const),
    eyebrow: trial ? 'TRIAL ENDING' : days === 0 ? 'DUE TODAY' : 'NEXT RENEWAL',
    amount: !event.expected_charge ? 'Auto-renew off' : event.amount !== '' && Number.isFinite(price) ? `${event.currency} ${price.toFixed(2)}` : 'Amount not set',
    line: `${days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`} · ${short_date}`,
  };
}

export function saveWidgetSnapshot(home: HomeSnapshot) {
  const { event: next, more } = widgetEvent(home);
  const event = next && {
    subscription_id: next.subscription_id,
    platform_id: next.platform_id,
    name: next.name,
    date: next.date,
    kind: next.kind,
    amount: next.amount,
    currency: next.currency,
    expected_charge: next.expected_charge,
    estimated: next.estimated,
  };
  bridge?.setSnapshot(JSON.stringify({ version: 1, event: event ?? null, more }));
}

// Logout or account switch: no subscription data stays on the Home Screen.
export function clearWidgetSnapshot() {
  bridge?.clear();
}

// null when the platform cannot tell (Android for now).
export function widgetInstalled(): Promise<boolean | null> {
  return bridge ? bridge.isInstalled().catch(() => null) : Promise.resolve(null);
}

// Widget taps: renewless://subscription/<id> opens Detail, renewless://home opens Home. Signed out, the URL is ignored.
export function openWidgetUrl(url: string | null | undefined, signed_in: boolean) {
  if (!url || !signed_in) return;
  const match = /^renewless:\/\/subscription\/([^/?#]+)$/.exec(url);
  if (match) navigate('SubscriptionDetail', { id: decodeURIComponent(match[1]) });
  else if (url === 'renewless://home') navigate('Home');
}

export function listenForWidgetUrls(signedIn: () => boolean) {
  Linking.getInitialURL().then(url => openWidgetUrl(url, signedIn()));
  const subscription = Linking.addEventListener('url', ({ url }) => openWidgetUrl(url, signedIn()));
  return () => subscription.remove();
}
