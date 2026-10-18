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
} from '../slices/connectorsSlice';
import { upsertSubscription } from '../slices/subscriptionsSlice';

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

export function loadReview(connectorId: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: async () => ({
          connectorId,
          items: (await listReview(token, connectorId)).items,
        }),
        loading: connectorLoading('review'),
        error: connectorError('review'),
        success: setReview,
      }),
    );
  };
}

function reviewAction(itemId: string, kind: 'add' | 'dismiss'): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token || getState().connectors.reviewBusyId) return;
    dispatch(setReviewBusyId(itemId));
    dispatch(setReviewActionError(''));
    try {
      if (kind === 'add') {
        const created = await addReviewItem(token, itemId);
        dispatch(removeReviewItem(itemId));
        dispatch(upsertSubscription(created));
      } else {
        await dismissReviewItem(token, itemId);
        dispatch(removeReviewItem(itemId));
      }
    } catch (caught) {
      if (isUnauthorized(caught)) await dispatch(endSession());
      dispatch(setReviewActionError(errorMessage(caught)));
    } finally {
      dispatch(setReviewBusyId(''));
    }
  };
}

export function addReview(itemId: string): AppThunk {
  return reviewAction(itemId, 'add');
}

export function dismissReview(itemId: string): AppThunk {
  return reviewAction(itemId, 'dismiss');
}
