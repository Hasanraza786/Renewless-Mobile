import { toHome } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import { saveWidgetSnapshot } from '../../utils/widget';
import { requestHandler, type AppThunk } from '../request-handler';
import { setDashboardData, setDashboardError, setDashboardLoading } from '../slices/dashboard-slice';
import { getCategoryList } from './list-action';

// Home reads four projections at once: the snapshot, Upcoming, this month's events and full spending.
async function getHomeData() {
  await getCategoryList();
  const [home, upcoming, spending] = await Promise.all([apiServices.getHome(), apiServices.getUpcoming(), apiServices.getSpending()]);
  const calendar = await apiServices.getCalendar({ month: home.month.label });
  return toHome(home, upcoming, calendar, spending);
}

export function getDashboard(): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: getHomeData,
        setLoading: setDashboardLoading,
        setError: setDashboardError,
        onDone: snapshot => {
          dispatch(setDashboardData(snapshot));
          saveWidgetSnapshot(snapshot);
        },
      }),
    );
  };
}
