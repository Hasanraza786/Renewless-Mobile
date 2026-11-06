import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { loadList } from '../../redux/actions/list-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { filterHistory, historyRecords, type HistoryStatus } from '../../utils/history';

// Cancelled and expired subscriptions from the same records as List; search and filters survive visits to Detail.
export default function useHistory() {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(state => state.list);
  const [query, setQuery] = useState('');
  const [statuses, setStatuses] = useState<HistoryStatus[]>([]);
  const [filters_open, setFiltersOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadList());
    }, [dispatch]),
  );

  const all = useMemo(() => historyRecords(records ?? []), [records]);
  const matching = useMemo(() => filterHistory(all, query, statuses), [all, query, statuses]);
  const status = records ? 'ready' : error && !loading ? 'failed' : 'loading';
  const has_history = all.length > 0;
  const counts = { all: all.length, cancelled: all.filter(item => item.status === 'cancelled').length, expired: all.filter(item => item.status === 'expired').length };

  // All clears the selection; a status toggles in or out.
  const toggleStatus = (key: HistoryStatus | 'all') =>
    key === 'all' ? setStatuses([]) : setStatuses(current => (current.includes(key) ? current.filter(item => item !== key) : [...current, key]));
  const clearAll = () => {
    setQuery('');
    setStatuses([]);
  };
  const openFilters = () => setFiltersOpen(true);
  const closeFilters = () => setFiltersOpen(false);
  const retry = () => dispatch(loadList());
  const openDetail = (id: string) => navigate('SubscriptionDetail', { id });
  const openList = () => navigate('List');

  return { status, error, has_history, query, setQuery, statuses, matching, counts, filters_open, toggleStatus, clearAll, openFilters, closeFilters, retry, openDetail, openList };
}

export type HistoryController = ReturnType<typeof useHistory>;
