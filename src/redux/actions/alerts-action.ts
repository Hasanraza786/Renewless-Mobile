import { fromReminderSettings, toAlert, toReminderSettings } from '../../api_services/adapters';
import type { AlertDto } from '../../api_services/dto';
import apiServices from '../../api_services/request-handler';
import type { ReminderApply, ReminderSettings } from '../../types';
import { trackEvent } from '../../utils/analytics';
import { successHaptic } from '../../utils/haptics';
import { requestHandler, type AppThunk } from '../request-handler';
import { setAlerts, setAlertsError, setAlertsLoading, setReminderSettings } from '../slices/alerts-slice';
import { setNotice } from '../slices/profile-slice';
import { getSubscriptionDetail } from './detail-action';

const flag = (key: 'alerts' | 'settings' | 'save') => ({
  setLoading: (value: boolean) => setAlertsLoading({ key, value }),
  setError: (value: string) => setAlertsError({ key, value }),
});

async function getAllAlerts() {
  const items: AlertDto[] = [];
  let cursor: string | undefined;
  do {
    const page = await apiServices.getAlerts({ cursor, limit: 100 });
    items.push(...page.items);
    cursor = page.nextCursor ?? undefined;
  } while (cursor);
  return items.map(toAlert);
}

export function getAlerts(): AppThunk {
  return async dispatch => {
    await dispatch(requestHandler({ apiService: getAllAlerts, ...flag('alerts'), onDone: alerts => dispatch(setAlerts(alerts)) }));
  };
}

export function getReminderSettings(): AppThunk {
  return async dispatch => {
    await dispatch(requestHandler({ apiService: apiServices.getReminderSettings, ...flag('settings'), onDone: settings => dispatch(setReminderSettings(toReminderSettings(settings))) }));
  };
}

// Save the defaults; "Existing subscriptions too" then applies them to the eligible records counted now.
async function saveSettingsAndApply({ settings, apply }: { settings: ReminderSettings; apply: ReminderApply }) {
  const saved = await apiServices.saveReminderSettings(fromReminderSettings(settings));
  if (apply.existing) {
    const { affectedCount } = await apiServices.previewReminderApply({ preserveCustom: apply.keep_custom });
    if (affectedCount) await apiServices.applyReminderDefault({ revision: saved.revision, preserveCustom: apply.keep_custom, expectedCount: affectedCount });
  }
  return saved;
}

export function saveReminderSettings(settings: ReminderSettings, apply: ReminderApply, onSaved: () => void): AppThunk {
  return async (dispatch, getState) => {
    await dispatch(
      requestHandler({
        apiService: saveSettingsAndApply,
        param_data: { settings, apply },
        ...flag('save'),
        onDone: saved => {
          trackEvent('reminder_settings_saved');
          dispatch(setReminderSettings(toReminderSettings(saved)));
          // A cached Detail shows the account default; refresh it.
          const open_detail = getState().detail.detail?.record.id;
          if (open_detail) dispatch(getSubscriptionDetail(open_detail));
          successHaptic();
          dispatch(setNotice('Reminder settings saved.'));
          onSaved();
        },
      }),
    );
  };
}

// Affected-subscription count for the confirmation dialog, or null if it can't be read.
export function getApplyCount(keep_custom: boolean, onCount: (count: number | null) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.previewReminderApply,
        param_data: { preserveCustom: keep_custom },
        onDone: ({ affectedCount }) => onCount(affectedCount),
        onError: () => onCount(null),
      }),
    );
  };
}
