import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Linking, TextInput } from 'react-native';
import { requestNotifications } from 'react-native-permissions';
import { goBack } from '../../navigation/service';
import { getReminderSettings, getApplyCount, saveReminderSettings } from '../../redux/actions/alerts-action';
import { setAlertsError } from '../../redux/slices/alerts-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { accountDisplay, accountValues, nextAccountValues } from '../../utils/alerts';
import { normalizeOffsets } from '../../utils/reminders';
import { useNotificationPermission } from '../Alerts/index.function';

export const SCOPES = ['New subscriptions only', 'Existing subscriptions too'];

type Draft = { push_enabled: boolean; renewals: boolean; trials: boolean; values: string[]; custom: string; time: string; scope: string };

// Back discards the draft; Save commits it (after the existing-subscriptions confirmation when chosen).
export default function useReminderSettings() {
  const dispatch = useAppDispatch();
  const { settings, loading, error } = useAppSelector(state => state.alerts);
  const { permission, refresh } = useNotificationPermission();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [custom_error, setCustomError] = useState('');
  const custom_ref = useRef<ComponentRef<typeof TextInput>>(null);
  const [confirm, setConfirm] = useState<{ keep_custom: boolean; count: number | null } | null>(null);

  useEffect(() => {
    dispatch(setAlertsError({ key: 'save', value: '' }));
    dispatch(getReminderSettings());
  }, [dispatch]);

  useEffect(() => {
    if (!settings || draft) return;
    const { values, custom } = accountValues(settings.days);
    setDraft({ push_enabled: settings.push_enabled, renewals: settings.renewals, trials: settings.trials, values, custom, time: settings.time, scope: SCOPES[0] });
  }, [settings, draft]);

  const status = draft ? 'ready' : error.settings && !loading.settings ? 'failed' : 'loading';
  const display = draft ? accountDisplay(draft.values) : '';
  const timezone = (Intl.DateTimeFormat().resolvedOptions().timeZone || 'Device timezone').replace(/_/g, ' ');
  const device: 'allowed' | 'blocked' | 'unavailable' | 'not_asked' | null = permission === 'granted' || permission === 'limited' ? 'allowed' : permission === 'blocked' ? 'blocked' : permission === 'unavailable' ? 'unavailable' : permission === 'denied' ? 'not_asked' : null;

  const update = <Key extends keyof Draft>(key: Key, value: Draft[Key]) => setDraft(current => (current ? { ...current, [key]: value } : current));
  const toggleValue = (value: string) => {
    if (!draft) return;
    update('values', nextAccountValues(draft.values, value));
    setCustomError('');
  };
  const updateCustom = (value: string) => {
    update('custom', value.replace(/\D/g, '').slice(0, 3));
    setCustomError('');
  };
  const retry = () => dispatch(getReminderSettings());

  // Settings opens the app's page in iOS Settings; a not-yet-asked permission shows the system prompt instead.
  const openDevice = async () => {
    if (device === 'not_asked') {
      await requestNotifications(['alert', 'sound', 'badge']);
      refresh();
    } else Linking.openSettings();
  };

  const onSaved = () => {
    setConfirm(null);
    goBack();
  };

  const commit = (existing: boolean, keep_custom: boolean) => {
    if (!draft || !settings) return;
    const custom_days = draft.values.includes('custom') ? Number(draft.custom) : null;
    dispatch(
      saveReminderSettings(
        { push_enabled: draft.push_enabled, renewals: draft.renewals, trials: draft.trials, days: normalizeOffsets(draft.values, custom_days), time: draft.time, revision: settings.revision },
        { existing, keep_custom },
        onSaved,
      ),
    );
  };

  const onSave = () => {
    if (!draft || loading.save) return;
    const custom_days = Number(draft.custom);
    if (draft.push_enabled && draft.values.includes('custom') && (!/^\d+$/.test(draft.custom) || custom_days < 1 || custom_days > 365)) {
      setCustomError('Enter a whole number from 1 to 365 days.');
      // First invalid field takes focus, which scrolls it above the pinned Save.
      custom_ref.current?.focus();
      return;
    }
    if (draft.push_enabled && draft.scope === SCOPES[1]) {
      setConfirm({ keep_custom: true, count: null });
      dispatch(getApplyCount(true, count => setConfirm(current => (current?.keep_custom ? { keep_custom: true, count } : current))));
      return;
    }
    commit(false, true);
  };

  const toggleKeepCustom = () => {
    if (!confirm) return;
    const keep_custom = !confirm.keep_custom;
    setConfirm({ keep_custom, count: confirm.count });
    dispatch(getApplyCount(keep_custom, count => setConfirm(current => (current && current.keep_custom === keep_custom ? { keep_custom, count } : current))));
  };

  const closeConfirm = () => setConfirm(null);
  const confirmApply = () => confirm && commit(true, confirm.keep_custom);

  return {
    draft,
    status,
    load_error: error.settings,
    save_error: error.save,
    saving: loading.save,
    display,
    timezone,
    device,
    custom_error,
    custom_ref,
    confirm,
    update,
    toggleValue,
    updateCustom,
    retry,
    openDevice,
    onSave,
    toggleKeepCustom,
    closeConfirm,
    confirmApply,
  };
}

export type ReminderSettingsController = ReturnType<typeof useReminderSettings>;
