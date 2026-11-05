import { listTrackedSubscriptions } from '../../api_services/subscriptions';
import { runRequest, type AppThunk } from '../runRequest';
import { setListError, setListLoading, setListRecords } from '../slices/list-slice';

export function loadList(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    await dispatch(runRequest({ request: () => listTrackedSubscriptions(token), loading: setListLoading, error: setListError, success: setListRecords }));
  };
}
