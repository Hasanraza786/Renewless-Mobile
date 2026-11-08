import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect, type RouteProp } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { loadList } from '../../redux/actions/list-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { SubscriptionRecord, TabParamList } from '../../types';
import { LIST_SORTS, filterRecords, groupCounts, listGroup, sortRecords, type ListGroup, type ListSort } from '../../utils/list';

export type ListRoute = RouteProp<TabParamList, 'List'>;

export default function useList(route: ListRoute) {
  const dispatch = useAppDispatch();
  const { records, today, loading, error } = useAppSelector(state => state.list);
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState<ListGroup[]>([]);
  const [sort, setSort] = useState<ListSort>('next');
  const [dialog, setDialog] = useState<'sort' | 'filters' | null>(null);
  const [add_open, setAddOpen] = useState(false);
  // AI chat consent Not now: reopen the Add sheet that opened AI chat.
  const add_sheet = route.params?.add_sheet;
  useEffect(() => {
    if (add_sheet) setAddOpen(true);
  }, [add_sheet]);

  // Refresh on every visit; query, filters and sort stay as the user left them.
  useFocusEffect(
    useCallback(() => {
      dispatch(loadList());
    }, [dispatch]),
  );

  const all = useMemo(() => records ?? [], [records]);
  const matching = useMemo(() => filterRecords(all, query, groups, today), [all, groups, query, today]);
  const sections = useMemo(() => sortRecords(matching, sort, today), [matching, sort, today]);
  // Counts are global: every record before search or status filtering.
  const counts = useMemo(() => groupCounts(all, today), [all, today]);

  const status = records ? 'ready' : error && !loading ? 'failed' : 'loading';
  const has_records = all.length > 0;
  const sort_label = LIST_SORTS.find(item => item.key === sort)!.label;
  const matching_count = matching.length;

  // Needs date rows open Edit to supply the date; others open Detail.
  const open = (record: SubscriptionRecord) =>
    listGroup(record, today) === 'needs_date' ? navigate('EditSubscription', { id: record.id }) : navigate('SubscriptionDetail', { id: record.id });
  const toggleGroup = (group: ListGroup) => setGroups(current => (current.includes(group) ? current.filter(item => item !== group) : [...current, group]));
  const clearGroups = () => setGroups([]);
  const applySort = (next: ListSort) => {
    setSort(next);
    setDialog(null);
  };
  const retry = () => dispatch(loadList());
  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);
  const openAddManual = () => navigate('AddSubscription');

  return {
    status,
    error,
    today,
    has_records,
    query,
    setQuery,
    groups,
    toggleGroup,
    clearGroups,
    sort,
    sort_label,
    applySort,
    dialog,
    setDialog,
    counts,
    matching_count,
    sections,
    open,
    add_open,
    retry,
    openAdd,
    closeAdd,
    openAddManual,
  };
}

export type ListController = ReturnType<typeof useList>;
