import { getCalendarMonth } from '../../api_services/calendar';
import { runRequest, type AppThunk } from '../runRequest';
import { setCalendarError, setCalendarLoading, setCalendarMonth } from '../slices/calendar-slice';

export function loadCalendarMonth(month: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    await dispatch(runRequest({ request: () => getCalendarMonth(token, month), loading: setCalendarLoading, error: setCalendarError, success: setCalendarMonth }));
  };
}
