import { getHome } from '../../api_services/home';
import { runRequest, type AppThunk } from '../runRequest';
import {
  setDashboardData,
  setDashboardError,
  setDashboardLoading,
} from '../slices/dashboard-slice';

export function loadDashboard(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => getHome(token),
        loading: setDashboardLoading,
        error: setDashboardError,
        success: setDashboardData,
      }),
    );
  };
}
