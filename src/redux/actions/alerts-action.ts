import { getReminderSettings, listAlerts, previewReminderApply, saveReminderSettings } from '../../api_services/alerts';
import type { ReminderApply, ReminderSettings } from '../../types';
import { runRequest, type AppThunk } from '../runRequest';
import { setAlerts, setAlertsError, setAlertsLoading, setReminderSettings } from '../slices/alerts-slice';
import { setNotice } from '../slices/profile-slice';
import { loadDetail } from './detail-action';

const flag = (key: 'alerts' | 'settings' | 'save') => ({
  loading: (value: boolean) => setAlertsLoading({ key, value }),
  error: (value: string) => setAlertsError({ key, value }),
});

export function loadAlerts(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    await dispatch(runRequest({ request: () => listAlerts(token), ...flag('alerts'), success: setAlerts }));
  };
}

export function loadReminderSettings(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    await dispatch(runRequest({ request: () => getReminderSettings(token), ...flag('settings'), success: setReminderSettings }));
  };
}

// Resolves true once the server saved the settings (and any chosen existing-subscription timing).
export function saveReminders(settings: ReminderSettings, apply: ReminderApply): AppThunk<boolean> {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return false;
    const saved = await dispatch(runRequest({ request: () => saveReminderSettings(token, settings, apply), ...flag('save'), success: setReminderSettings }));
    if (!saved) return false;
    // A cached Detail shows the account default; refresh it.
    const open_detail = getState().detail.detail?.record.id;
    if (open_detail) dispatch(loadDetail(open_detail));
    dispatch(setNotice('Reminder settings saved.'));
    return true;
  };
}

// Affected-subscription count for the confirmation dialog, or null if it can't be read.
export function previewApply(keep_custom: boolean): AppThunk<number | null> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return null;
    try {
      return (await previewReminderApply(token, keep_custom)).count;
    } catch {
      return null;
    }
  };
}
