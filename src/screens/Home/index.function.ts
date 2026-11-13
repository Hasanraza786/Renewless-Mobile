import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, AppState } from 'react-native';
import { useFocusEffect, type RouteProp } from '@react-navigation/native';
import { syncAiConsent } from '../../redux/actions/ai-action';
import { registerPush, savePushToken } from '../../redux/actions/auth-action';
import { getDashboard } from '../../redux/actions/dashboard-action';
import { MAX_INBOXES, getSyncLockedInbox } from '../../redux/actions/gmail-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { navigate } from '../../navigation/service';
import { setWidgetPromptSeen } from '../../redux/slices/constant-slice';
import type { ProfileInbox, TabParamList } from '../../types';
import { pinWidget, widgetEvent, widgetInstalled } from '../../utils/widget';
import { trackEvent } from '../../utils/analytics';
import { listenToPush } from '../../utils/push';

export type HomeRoute = RouteProp<TabParamList, 'Home'>;

export default function useHome(route: HomeRoute) {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.dashboard);
  const [selected_event, setSelectedEvent] = useState('');
  const [reduce_motion, setReduceMotion] = useState(false);
  const [add_open, setAddOpen] = useState(false);
  const widget_prompt_seen = useAppSelector(state => state.constant.widget_prompt_seen);
  const [widget_prompt, setWidgetPrompt] = useState<'closed' | 'prompt' | 'video'>('closed');
  const widget_checked = useRef(false);
  const [locked_inbox, setLockedInbox] = useState<ProfileInbox | null>(null);
  const [inbox_count, setInboxCount] = useState(0);

  // Refresh on every visit, on returning to the app and at local midnight (dates are relative to today);
  // a usable snapshot stays on screen while it reloads.
  useFocusEffect(
    useCallback(() => {
      const reload = () => dispatch(getDashboard());
      reload();
      const app_state = AppState.addEventListener('change', state => state === 'active' && reload());
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
      const timer = setTimeout(reload, midnight + 1000);
      return () => {
        app_state.remove();
        clearTimeout(timer);
      };
    }, [dispatch]),
  );

  // Reminder pushes: register this session's token (the OS asks once) and open the subscription a tapped reminder names.
  useEffect(() => {
    dispatch(syncAiConsent());
    dispatch(registerPush());
    return listenToPush(token => dispatch(savePushToken(token)));
  }, [dispatch]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  const has_subscriptions = !!data?.has_subscriptions;

  // Empty Home: when the connected inbox can't sync yet, the card offers other ways to add instead of Connect Gmail.
  useEffect(() => {
    if (!data || has_subscriptions) return;
    dispatch(
      getSyncLockedInbox((inbox, count) => {
        setLockedInbox(inbox);
        setInboxCount(count);
      }),
    );
  }, [data, has_subscriptions, dispatch]);

  // One-time prompt: only with a tracked subscription and only when the platform reports the widget is not placed.
  useEffect(() => {
    if (!has_subscriptions || widget_prompt_seen || widget_checked.current) return;
    widget_checked.current = true;
    widgetInstalled().then(installed => installed === false && setWidgetPrompt('prompt'));
  }, [has_subscriptions, widget_prompt_seen]);

  const add_widget = route.params?.add_widget;
  const add_sheet = route.params?.add_sheet;
  // Settings › Add the widget: open the prompt again, even after it was closed once.
  useEffect(() => {
    if (add_widget) setWidgetPrompt('prompt');
  }, [add_widget]);
  // AI chat consent Not now: reopen the Add sheet that opened AI chat.
  useEffect(() => {
    if (add_sheet) setAddOpen(true);
  }, [add_sheet]);

  const events = data?.nearest_events ?? [];
  const selected = events.find(item => item.id === selected_event) ?? events[0];

  // Skeleton only before the first snapshot; errors without data offer retry, never an empty account.
  const status = data ? 'ready' : error && !loading ? 'failed' : 'loading';

  const retry = () => dispatch(getDashboard());
  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);
  // Empty Home's own Add manually / Connect Gmail buttons.
  const openAddManual = () => {
    trackEvent('add_option_selected', { option: 'manual' });
    navigate('AddSubscription');
  };
  const openAddAi = () => {
    trackEvent('add_option_selected', { option: 'ai' });
    navigate('AiChat');
  };
  // With both free inboxes connected there is no Connect another Gmail.
  const can_add_inbox = inbox_count < MAX_INBOXES;
  const next_sync = locked_inbox?.nextSync ? new Date(locked_inbox.nextSync).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';
  const openConnectGmail = () => {
    trackEvent('add_option_selected', { option: 'gmail' });
    navigate('GmailScan');
  };
  const openDetail = (id: string) => navigate('SubscriptionDetail', { id });
  const openUpcoming = () => navigate('Upcoming');
  // Paid this month opens account Payments on the snapshot's current month.
  const openPayments = () => navigate('Payments', data ? { month: data.today.slice(0, 7) } : undefined);
  const openThisMonth = () => navigate('ThisMonth');
  const openSpending = () => navigate('SpendingBreakdown');
  const openPlatform = (platform_id: string, name: string) => navigate('PlatformSubscriptions', { platform_id, name });
  const widget_preview = data ? widgetEvent(data) : { event: null, more: 0 };
  // Any close (button, ×, scrim) ends the prompt for good on this device.
  const endWidgetPrompt = () => {
    dispatch(setWidgetPromptSeen());
    setWidgetPrompt('closed');
  };
  const closeWidgetPrompt = () => {
    trackEvent('widget_prompt_action', { action: 'dismiss' });
    endWidgetPrompt();
  };
  // Android: Add widget opens the launcher's pin dialog, then the prompt closes for good.
  const addWidget = () => {
    trackEvent('widget_prompt_action', { action: 'add' });
    pinWidget();
    endWidgetPrompt();
  };
  const openWidgetVideo = () => {
    trackEvent('widget_prompt_action', { action: 'video' });
    setWidgetPrompt('video');
  };
  const closeWidgetVideo = () => setWidgetPrompt('prompt');

  return {
    data,
    status,
    error,
    reduce_motion,
    selected,
    selectEvent: setSelectedEvent,
    add_open,
    retry,
    openAdd,
    closeAdd,
    locked_inbox,
    can_add_inbox,
    next_sync,
    openAddManual,
    openAddAi,
    openConnectGmail,
    openDetail,
    openUpcoming,
    openPayments,
    openThisMonth,
    openSpending,
    openPlatform,
    widget_prompt,
    widget_preview,
    closeWidgetPrompt,
    addWidget,
    openWidgetVideo,
    closeWidgetVideo,
  };
}

export type HomeController = ReturnType<typeof useHome>;
