import { hasCategories, setCategories, toRecord } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import { localToday } from '../../utils/dates';
import { requestHandler, type AppThunk } from '../request-handler';
import { setListError, setListLoading, setListRecords } from '../slices/list-slice';

// Category names on records come from the backend list, read once per app run.
export async function getCategoryList() {
  if (!hasCategories()) setCategories((await apiServices.getCategories()).categories);
}

// Every page of the owned records matching the filter (List filters and sorts on the phone).
export async function getAllSubscriptions(filter: { platformId?: string; exclude?: string; connectorId?: string } = {}) {
  await getCategoryList();
  const items = [];
  let cursor: string | undefined;
  do {
    const page = await apiServices.getSubscriptions({ ...filter, cursor, limit: 100 });
    items.push(...page.items);
    cursor = page.nextCursor ?? undefined;
  } while (cursor);
  return items.map(toRecord);
}

export function getSubscriptions(): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: getAllSubscriptions,
        param_data: {},
        setLoading: setListLoading,
        setError: setListError,
        onDone: records => dispatch(setListRecords({ records, today: localToday() })),
      }),
    );
  };
}
