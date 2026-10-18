import { listNotifications } from '../../api_services/subscriptions';
import { runRequest, type AppThunk } from '../runRequest';
import {
  setNotifications,
  setNotificationsError,
  setNotificationsLoading,
} from '../slices/notificationsSlice';

export function loadNotifications(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: async () => (await listNotifications(token)).notifications,
        loading: setNotificationsLoading,
        error: setNotificationsError,
        success: setNotifications,
      }),
    );
  };
}
