import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  listSubscriptions,
  updateSubscription,
  type SubscriptionInput,
} from '../../api_services/subscriptions';
import type { SubscriptionRequest } from '../../types';
import { runRequest, type AppThunk } from '../runRequest';
import {
  removeSubscription,
  setCurrentSubscription,
  setSubscriptionItems,
  subscriptionError,
  subscriptionLoading,
  upsertSubscription,
} from '../slices/subscriptionsSlice';

function loadOne(id: string, key: Extract<SubscriptionRequest, 'detail' | 'edit'>): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => getSubscription(token, id),
        loading: subscriptionLoading(key),
        error: subscriptionError(key),
        success: setCurrentSubscription,
      }),
    );
  };
}

export function loadSubscriptions(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: async () => (await listSubscriptions(token)).subscriptions,
        loading: subscriptionLoading('list'),
        error: subscriptionError('list'),
        success: setSubscriptionItems,
      }),
    );
  };
}

export function loadSubscription(id: string): AppThunk {
  return loadOne(id, 'detail');
}

export function loadSubscriptionForEdit(id: string): AppThunk {
  return loadOne(id, 'edit');
}

export function saveSubscription(input: SubscriptionInput, onDone?: () => void): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => createSubscription(token, input),
        loading: subscriptionLoading('create'),
        error: subscriptionError('create'),
        success: upsertSubscription,
        onDone,
      }),
    );
  };
}

export function saveSubscriptionEdits(
  id: string,
  input: SubscriptionInput,
  onDone?: () => void,
): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => updateSubscription(token, id, input),
        loading: subscriptionLoading('update'),
        error: subscriptionError('update'),
        success: upsertSubscription,
        onDone,
      }),
    );
  };
}

export function removeSubscriptionById(id: string, onDone?: () => void): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => deleteSubscription(token, id),
        loading: subscriptionLoading('delete'),
        error: subscriptionError('detail'),
        success: () => removeSubscription(id),
        onDone,
      }),
    );
  };
}
