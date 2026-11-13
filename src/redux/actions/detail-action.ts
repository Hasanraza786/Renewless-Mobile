import { fromReminder, toDetail, toSubscriptionBody } from '../../api_services/adapters';
import type { DetailDto } from '../../api_services/dto';
import apiServices from '../../api_services/request-handler';
import type { ReminderPreference, SubscriptionFormInput, SubscriptionRecord } from '../../types';
import { trackEvent, type AnalyticsEvent } from '../../utils/analytics';
import { successHaptic } from '../../utils/haptics';
import { requestHandler, type AppThunk } from '../request-handler';
import { setDetail, setDetailError, setDetailLoading, setPlatformRecords, setRemoved } from '../slices/detail-slice';
import { setNotice } from '../slices/profile-slice';
import { getDashboard } from './dashboard-action';
import { getAllSubscriptions, getCategoryList, getSubscriptions } from './list-action';

const flag = (key: 'detail' | 'platform' | 'mutation') => ({
  setLoading: (value: boolean) => setDetailLoading({ key, value }),
  setError: (value: string) => setDetailError({ key, value }),
});

// Backend platform IDs are ObjectIds; bundled catalog slugs (e.g. "netflix") are resolved by name.
const isServerId = (value: string | null) => !!value && /^[a-f0-9]{24}$/.test(value);

// Detail, its price changes and the account reminder default, read together.
async function getDetailData({ id }: { id: string }) {
  await getCategoryList();
  // The receipts count is extra: Detail still opens when it can't be read.
  const [detail, history, settings, receipts] = await Promise.all([
    apiServices.getSubscription({ id }),
    apiServices.getPriceHistory({ id }),
    apiServices.getReminderSettings(),
    apiServices.getSubscriptionReceipts({ id, limit: 1 }).catch(() => null),
  ]);
  return toDetail(detail, history, settings, receipts);
}

export function getSubscriptionDetail(id: string): AppThunk {
  return async (dispatch, getState) => {
    if (getState().detail.detail?.record.id !== id) dispatch(setDetail(null));
    await dispatch(requestHandler({ apiService: getDetailData, param_data: { id }, ...flag('detail'), onDone: detail => dispatch(setDetail(detail)) }));
  };
}

// The list on screen, so Undo can refresh it in place.
let shown_platform: { platform_id: string; exclude_id?: string } | null = null;

export function getPlatformSubscriptions(platform_id: string, exclude_id?: string): AppThunk {
  return async dispatch => {
    shown_platform = { platform_id, exclude_id };
    dispatch(setPlatformRecords([]));
    await dispatch(
      requestHandler({
        apiService: getAllSubscriptions,
        param_data: { platformId: platform_id, exclude: exclude_id },
        ...flag('platform'),
        onDone: records => dispatch(setPlatformRecords(records)),
      }),
    );
  };
}

// The record on Detail; every change sends its revision so a stale edit is refused, not overwritten.
const current = (state: { detail: { detail: { record: SubscriptionRecord } | null } }, id: string) =>
  state.detail.detail?.record.id === id ? state.detail.detail.record : null;

// Mutations refresh Detail, Home and List, then let the screen close its sheet. onFieldErrors gets the server's
// per-field messages (the form places them under its fields).
function saveChange<Param>(id: string, event: AnalyticsEvent, apiService: (param_data: Param) => Promise<unknown>, param_data: Param, onSaved: () => void, notice?: string, onFieldErrors?: (field_errors: Record<string, string>) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService,
        param_data,
        ...flag('mutation'),
        onDone: () => {
          trackEvent(event);
          dispatch(getSubscriptionDetail(id));
          dispatch(getDashboard());
          dispatch(getSubscriptions());
          if (notice) {
            successHaptic();
            dispatch(setNotice(notice));
          }
          onSaved();
        },
        onError: error => onFieldErrors?.(error.field_errors),
      }),
    );
  };
}

export function cancelSubscription(id: string, input: { cancelled_on: string; access_until: string | null }, onSaved: () => void): AppThunk {
  return async (dispatch, getState) => {
    const record = current(getState(), id);
    await dispatch(saveChange(id, 'subscription_cancelled', apiServices.cancelSubscription, { id, revision: record?.revision ?? 0, cancelledAt: input.cancelled_on, accessUntil: input.access_until }, onSaved));
  };
}

// "Account default" resumes with the account's default days; Off sends no reminder days.
export function resumeSubscription(id: string, input: { price: string; next_date: string; reminder: ReminderPreference }, onSaved: () => void): AppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    const record = current(state, id);
    const days = input.reminder.mode === 'days' ? input.reminder.days : input.reminder.mode === 'default' ? (state.detail.detail?.account_reminder_days ?? []) : [];
    await dispatch(
      saveChange(
        id,
        'subscription_resumed',
        apiServices.resumeSubscription,
        { id, revision: record?.revision ?? 0, price: { currency: record?.currency ?? 'USD', amount: input.price }, anchorDate: input.next_date, reminderOffsets: days },
        onSaved,
      ),
    );
  };
}

export function updateReminder(id: string, reminder: ReminderPreference, onSaved: () => void): AppThunk {
  return async (dispatch, getState) => {
    await dispatch(saveChange(id, 'reminder_changed', apiServices.setSubscriptionReminder, { id, revision: current(getState(), id)?.revision ?? 0, ...fromReminder(reminder) }, onSaved));
  };
}

export function updateNotes(id: string, notes: string, onSaved: () => void): AppThunk {
  return async (dispatch, getState) => {
    await dispatch(saveChange(id, 'note_saved', apiServices.updateSubscription, { id, revision: current(getState(), id)?.revision ?? 0, note: notes.trim() || null }, onSaved));
  };
}

// A typed catalog name links its backend platform; unknown names are saved as entered.
// A record without a platform uses its own ID as the logo key (adapters), which is not a platform: never send it.
async function getPlatformId(input: SubscriptionFormInput, own_id?: string) {
  if (isServerId(input.platform_id) && input.platform_id !== own_id) return input.platform_id;
  const { platforms } = await apiServices.getPlatforms({ q: input.name });
  return platforms.find(item => item.name.toLowerCase() === input.name.toLowerCase())?.id ?? null;
}

// Edit: only what the form changed. An unchanged trial keeps its exact end date.
async function updateFromForm({ id, input, record }: { id: string; input: SubscriptionFormInput; record: SubscriptionRecord }) {
  await getCategoryList();
  const body: Record<string, unknown> = { ...toSubscriptionBody(input, await getPlatformId(input, record.id)), id, revision: record.revision };
  const same_trial = record.trial && input.trial && record.trial.start_date === input.start_date && record.trial.end_date === input.trial.end_date;
  if (same_trial) delete body.trial;
  return apiServices.updateSubscription(body as { id: string });
}

// Edit: save, then Changes saved.
export function updateSubscription(id: string, input: SubscriptionFormInput, onSaved: () => void, onFieldErrors?: (field_errors: Record<string, string>) => void): AppThunk {
  return async (dispatch, getState) => {
    const record = current(getState(), id);
    if (!record) return;
    await dispatch(saveChange(id, 'subscription_edited', updateFromForm, { id, input, record }, onSaved, 'Changes saved.', onFieldErrors));
  };
}

async function createFromForm(input: SubscriptionFormInput) {
  await getCategoryList();
  return apiServices.createSubscription(toSubscriptionBody(input, await getPlatformId(input)));
}

// Add form: hands the new subscription's ID to the screen once the server confirms it.
export function createSubscription(input: SubscriptionFormInput, onAdded: (id: string) => void, source: 'manual' | 'ai' = 'manual', onFieldErrors?: (field_errors: Record<string, string>) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: createFromForm,
        param_data: input,
        ...flag('mutation'),
        onDone: (created: DetailDto) => {
          trackEvent('subscription_added', { source });
          dispatch(getDashboard());
          dispatch(getSubscriptions());
          successHaptic();
          dispatch(setNotice('Subscription added.'));
          onAdded(created.id);
        },
        onError: error => onFieldErrors?.(error.field_errors),
      }),
    );
  };
}

// Remove tracking, then offer Undo for eight seconds.
export function deleteSubscription(id: string, name: string, onRemoved: () => void): AppThunk {
  return async (dispatch, getState) => {
    await dispatch(
      requestHandler({
        apiService: apiServices.removeSubscription,
        param_data: { id, revision: current(getState(), id)?.revision ?? 0 },
        ...flag('mutation'),
        onDone: ({ undoToken }) => {
          trackEvent('subscription_removed');
          dispatch(setRemoved({ id, name, undo_token: undoToken }));
          dispatch(setDetail(null));
          dispatch(getDashboard());
          dispatch(getSubscriptions());
          onRemoved();
        },
      }),
    );
  };
}

export function restoreSubscription(id: string, undo_token: string): AppThunk {
  return async dispatch => {
    dispatch(setRemoved(null));
    await dispatch(
      requestHandler({
        apiService: apiServices.restoreSubscription,
        param_data: { id, undoToken: undo_token },
        ...flag('mutation'),
        onDone: () => {
          trackEvent('subscription_restored');
          dispatch(getDashboard());
          dispatch(getSubscriptions());
          if (shown_platform) dispatch(getPlatformSubscriptions(shown_platform.platform_id, shown_platform.exclude_id));
        },
      }),
    );
  };
}
