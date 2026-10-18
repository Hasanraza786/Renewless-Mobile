import { getDashboard } from '../../api_services/subscriptions';
import { runRequest, type AppThunk } from '../runRequest';
import {
  setDashboardData,
  setDashboardError,
  setDashboardLoading,
} from '../slices/dashboardSlice';

export function loadDashboard(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => getDashboard(token),
        loading: setDashboardLoading,
        error: setDashboardError,
        success: setDashboardData,
      }),
    );
  };
}
