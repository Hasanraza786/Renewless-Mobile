import {
  cancelTracking,
  getSubscriptionDetail,
  listPlatformSubscriptions,
  removeTracking,
  restoreTracking,
  resumeTracking,
  setNotes,
  setReminder,
} from '../../api_services/subscriptions';
import type { ReminderPreference, SubscriptionDetail } from '../../types';
import { runRequest, type AppThunk } from '../runRequest';
import { setDetail, setDetailError, setDetailLoading, setPlatformRecords, setRemoved } from '../slices/detail-slice';
import { loadDashboard } from './dashboard-action';
import { loadList } from './list-action';

const flag = (key: 'detail' | 'platform' | 'mutation') => ({
  loading: (value: boolean) => setDetailLoading({ key, value }),
  error: (value: string) => setDetailError({ key, value }),
});

export function loadDetail(id: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    if (getState().detail.detail?.record.id !== id) dispatch(setDetail(null));
    await dispatch(runRequest({ request: () => getSubscriptionDetail(token, id), ...flag('detail'), success: setDetail }));
  };
}

export function loadPlatform(platform_id: string, exclude_id?: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    dispatch(setPlatformRecords([]));
    await dispatch(runRequest({ request: () => listPlatformSubscriptions(token, platform_id, exclude_id), ...flag('platform'), success: setPlatformRecords }));
  };
}

// Mutations update Detail and refresh Home's projection; resolve true on success.
function mutate(request: (token: string) => Promise<SubscriptionDetail | { ok: true }>): AppThunk<boolean> {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return false;
    const result = await dispatch(
      runRequest({
        request: () => request(token),
        ...flag('mutation'),
        success: value => ('record' in value ? setDetail(value) : setDetail(null)),
      }),
    );
    if (result === undefined) return false;
    dispatch(loadDashboard());
    dispatch(loadList());
    return true;
  };
}

export const cancelSubscription = (id: string, input: { cancelled_on: string; access_until: string | null }) => mutate(token => cancelTracking(token, id, input));
export const resumeSubscription = (id: string, input: { price: string; next_date: string; reminder: ReminderPreference }) => mutate(token => resumeTracking(token, id, input));
export const saveReminder = (id: string, reminder: ReminderPreference) => mutate(token => setReminder(token, id, reminder));
export const saveNotes = (id: string, notes: string) => mutate(token => setNotes(token, id, notes));
// Remove tracking, then offer Undo for eight seconds.
export function removeSubscription(id: string, name: string): AppThunk<boolean> {
  return async dispatch => {
    const ok = await dispatch(mutate(token => removeTracking(token, id)));
    if (ok) dispatch(setRemoved({ id, name }));
    return ok;
  };
}

export function restoreSubscription(id: string): AppThunk<boolean> {
  return async dispatch => {
    dispatch(setRemoved(null));
    return dispatch(mutate(token => restoreTracking(token, id)));
  };
}
