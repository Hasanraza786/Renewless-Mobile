import { useEffect } from 'react';
import { getDashboard } from '../redux/actions/dashboard-action';
import { useAppDispatch, useAppSelector } from '../redux/store';

// The Home drill-downs read the same snapshot as Home; opened directly they load it themselves.
export default function useHomeSnapshot() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.dashboard);

  useEffect(() => {
    if (!data) dispatch(getDashboard());
  }, [data, dispatch]);

  const status = data ? ('ready' as const) : error && !loading ? ('failed' as const) : ('loading' as const);
  const retry = () => dispatch(getDashboard());

  return { data, status, error, retry };
}
