import { getAnalytics, logEvent, logScreenView, setAnalyticsCollectionEnabled } from '@react-native-firebase/analytics';

// Development builds never send analytics, so Firebase holds only real usage. Collection starts off natively
// (firebase.json analytics_auto_collection_enabled: false) and only a release build turns it on here.
const analytics = getAnalytics();
setAnalyticsCollectionEnabled(analytics, !__DEV__);

// Feature use. Names and fixed values only: never a subscription name, price, email, note or message text.
export type AnalyticsEvent =
  | 'login'
  | 'sign_up'
  | 'subscription_added'
  | 'receipt_file_opened'
  | 'subscription_edited'
  | 'subscription_cancelled'
  | 'subscription_resumed'
  | 'subscription_removed'
  | 'subscription_restored'
  | 'reminder_changed'
  | 'note_saved'
  | 'reminder_settings_saved'
  | 'ai_message_sent'
  | 'ai_consent_changed'
  | 'add_option_selected'
  | 'gmail_connect_tapped'
  | 'social_login_tapped'
  | 'list_sorted'
  | 'list_filtered'
  | 'calendar_month_changed'
  | 'history_filtered'
  | 'payments_period_changed'
  | 'widget_prompt_action'
  | 'widget_opened'
  | 'otp_resent'
  | 'password_reset'
  | 'password_changed'
  | 'profile_updated'
  | 'logout'
  | 'account_deleted'
  | 'inbox_disconnected';

export function trackEvent(name: AnalyticsEvent, params?: Record<string, string>) {
  // The typed overloads split standard (login, sign_up) and custom names; the native call is the same.
  (logEvent as (instance: typeof analytics, event: string, values?: Record<string, string>) => void)(analytics, name, params);
}

// Route names only; Analytics measures time on each screen from these.
export function trackScreen(name: string) {
  logScreenView(analytics, { screen_name: name, screen_class: name });
}
