import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadDashboard } from '../../redux/actions/dashboard-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { navigate } from '../../navigation/service';
import { setWidgetPromptSeen } from '../../redux/slices/constant-slice';
import { pinWidget, widgetEvent, widgetInstalled } from '../../utils/widget';

export default function useHome() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.dashboard);
  const [selected_event, setSelectedEvent] = useState('');
  const [reduce_motion, setReduceMotion] = useState(false);
  const [add_open, setAddOpen] = useState(false);
  const widget_prompt_seen = useAppSelector(state => state.constant.widget_prompt_seen);
  const [widget_prompt, setWidgetPrompt] = useState<'closed' | 'prompt' | 'video'>('closed');
  const widget_checked = useRef(false);

  // Refresh on every visit; a usable snapshot stays on screen while it reloads.
  useFocusEffect(
    useCallback(() => {
      dispatch(loadDashboard());
    }, [dispatch]),
  );

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  const has_subscriptions = !!data?.has_subscriptions;

  // One-time prompt: only with a tracked subscription and only when the platform reports the widget is not placed.
  useEffect(() => {
    if (!has_subscriptions || widget_prompt_seen || widget_checked.current) return;
    widget_checked.current = true;
    widgetInstalled().then(installed => installed === false && setWidgetPrompt('prompt'));
  }, [has_subscriptions, widget_prompt_seen]);

  const events = data?.nearest_events ?? [];
  const selected = events.find(item => item.id === selected_event) ?? events[0];

  // Skeleton only before the first snapshot; errors without data offer retry, never an empty account.
  const status = data ? 'ready' : error && !loading ? 'failed' : 'loading';

  const retry = () => dispatch(loadDashboard());
  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);
  const openAddManual = () => navigate('AddSubscription');
  const openConnectGmail = () => navigate('GmailScan');
  const openDetail = (id: string) => navigate('SubscriptionDetail', { id });
  const openUpcoming = () => navigate('Upcoming');
  // Paid this month opens account Payments on the snapshot's current month.
  const openPayments = () => navigate('Payments', data ? { month: data.today.slice(0, 7) } : undefined);
  const openThisMonth = () => navigate('ThisMonth');
  const openSpending = () => navigate('SpendingBreakdown');
  const openPlatform = (platform_id: string, name: string) => navigate('PlatformSubscriptions', { platform_id, name });
  const widget_preview = data ? widgetEvent(data) : { event: null, more: 0 };
  // Any close (button, ×, scrim) ends the prompt for good on this device.
  const closeWidgetPrompt = () => {
    dispatch(setWidgetPromptSeen());
    setWidgetPrompt('closed');
  };
  // Android: Add widget opens the launcher's pin dialog, then the prompt closes for good.
  const addWidget = () => {
    pinWidget();
    closeWidgetPrompt();
  };
  const openWidgetVideo = () => setWidgetPrompt('video');
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
    openAddManual,
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
