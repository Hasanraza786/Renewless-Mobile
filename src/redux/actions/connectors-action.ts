import {
  addReviewItem,
  createConnector,
  dismissReviewItem,
  listConnectors,
  listReview,
} from '../../api_services/connectors';
import { errorMessage, isUnauthorized } from '../../utils/errors';
import { endSession } from '../endSession';
import { runRequest, type AppThunk } from '../runRequest';
import {
  connectorError,
  connectorLoading,
  removeReviewItem,
  setConnectors,
  setReview,
  setReviewActionError,
  setReviewBusyId,
} from '../slices/connectors-slice';
import { upsertSubscription } from '../slices/subscriptions-slice';

export function loadConnectors(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: async () => (await listConnectors(token)).connectors,
        loading: connectorLoading('list'),
        error: connectorError('list'),
        success: setConnectors,
      }),
    );
  };
}

export function saveConnector(email: string, onDone?: () => void): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => createConnector(token, email),
        loading: connectorLoading('create'),
        error: connectorError('create'),
        onDone,
      }),
    );
  };
}

export function loadReview(connector_id: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: async () => ({
          connectorId: connector_id,
          items: (await listReview(token, connector_id)).items,
        }),
        loading: connectorLoading('review'),
        error: connectorError('review'),
        success: setReview,
      }),
    );
  };
}

function reviewAction(item_id: string, kind: 'add' | 'dismiss'): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token || getState().connectors.reviewBusyId) return;
    dispatch(setReviewBusyId(item_id));
    dispatch(setReviewActionError(''));
    try {
      if (kind === 'add') {
        const created = await addReviewItem(token, item_id);
        dispatch(removeReviewItem(item_id));
        dispatch(upsertSubscription(created));
      } else {
        await dismissReviewItem(token, item_id);
        dispatch(removeReviewItem(item_id));
      }
    } catch (caught) {
      if (isUnauthorized(caught)) await dispatch(endSession());
      dispatch(setReviewActionError(errorMessage(caught)));
    } finally {
      dispatch(setReviewBusyId(''));
    }
  };
}

export function addReview(item_id: string): AppThunk {
  return reviewAction(item_id, 'add');
}

export function dismissReview(item_id: string): AppThunk {
  return reviewAction(item_id, 'dismiss');
}
