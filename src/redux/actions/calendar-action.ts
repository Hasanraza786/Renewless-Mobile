import { toCalendarMonth } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import { requestHandler, type AppThunk } from '../request-handler';
import { setCalendarError, setCalendarLoading, setCalendarMonth } from '../slices/calendar-slice';

export function getCalendarMonth(month: string): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.getCalendar,
        param_data: { month },
        setLoading: setCalendarLoading,
        setError: setCalendarError,
        onDone: calendar => dispatch(setCalendarMonth(toCalendarMonth(calendar))),
      }),
    );
  };
}
