import { useCallback, useEffect, useState } from 'react';
import { AppState, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { checkNotifications, type PermissionStatus } from 'react-native-permissions';
import { navigate } from '../../navigation/service';
import { getAlerts, getReminderSettings } from '../../redux/actions/alerts-action';
import { setNotice } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { SentAlert } from '../../types';
import { groupAlerts } from '../../utils/alerts';
import { localToday } from '../../utils/dates';
import { useIsTablet } from '../../utils/tablet';

// The OS notification permission, re-read whenever the app returns to the foreground (e.g. from Settings).
export function useNotificationPermission() {
  const [permission, setPermission] = useState<PermissionStatus | null>(null);
  const read = useCallback(() => {
    checkNotifications()
      .then(result => setPermission(result.status))
      .catch(() => setPermission('unavailable'));
  }, []);
  useEffect(() => {
    read();
    const subscription = AppState.addEventListener('change', state => state === 'active' && read());
    return () => subscription.remove();
  }, [read]);
  return { permission, refresh: read };
}

// Sent reminders only, grouped Today / Yesterday / Earlier; Back returns to wherever the bell was tapped.
export default function useAlerts() {
  const is_tablet = useIsTablet();
  const dispatch = useAppDispatch();
  const { alerts, settings, loading, error } = useAppSelector(state => state.alerts);
  const { permission } = useNotificationPermission();
  const today = localToday();

  useFocusEffect(
    useCallback(() => {
      dispatch(getAlerts());
      dispatch(getReminderSettings());
    }, [dispatch]),
  );

  const status = alerts ? 'ready' : error.alerts && !loading.alerts ? 'failed' : 'loading';
  const groups = groupAlerts(alerts ?? [], today);
  // Blocked device permission wins; otherwise an app-level pause shows its own notice.
  const banner = permission === 'blocked' ? 'blocked' : settings && !settings.push_enabled ? 'paused' : null;

  const retry = () => dispatch(getAlerts());
  const openSettings = () => navigate('ReminderSettings');
  const openDeviceSettings = () => Linking.openSettings();
  const openAlert = (alert: SentAlert) =>
    alert.subscription_available ? navigate('SubscriptionDetail', { id: alert.subscription_id }) : dispatch(setNotice('This subscription is no longer available.'));

  return { is_tablet, status, error: error.alerts, today, groups, banner, retry, openSettings, openDeviceSettings, openAlert };
}

export type AlertsController = ReturnType<typeof useAlerts>;
