import { useCallback, useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadDashboard } from '../../redux/actions/dashboard-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { navigate } from '../../navigation/service';

export default function useHome() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.dashboard);
  const [selected_event, setSelectedEvent] = useState('');
  const [reduce_motion, setReduceMotion] = useState(false);

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

  const events = data?.nearest_events ?? [];
  const selected = events.find(item => item.id === selected_event) ?? events[0];

  // shortcut: destinations whose sections are not built yet open the dev-only ComingSoon screen.
  const open = (title: string) => navigate('ComingSoon', { title });

  return {
    data,
    // Skeleton only before the first snapshot; errors without data offer retry, never an empty account.
    status: data ? 'ready' : error && !loading ? 'failed' : 'loading',
    error,
    reduce_motion,
    selected,
    selectEvent: setSelectedEvent,
    retry: () => dispatch(loadDashboard()),
    openAdd: () => open('Add'),
    openAddManual: () => open('Add subscription'),
    openConnectGmail: () => open('Connect Gmail'),
    openDetail: () => open('Subscription detail'),
    openUpcoming: () => open('Upcoming'),
    openPayments: () => navigate('Payments'),
    openThisMonth: () => open('This month'),
    openSpending: () => open('Spending breakdown'),
    openPlatform: () => open('Platform subscriptions'),
  };
}

export type HomeController = ReturnType<typeof useHome>;
