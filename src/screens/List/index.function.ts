import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { loadList } from '../../redux/actions/list-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { SubscriptionRecord } from '../../types';
import { LIST_SORTS, filterRecords, groupCounts, listGroup, sortRecords, type ListGroup, type ListSort } from '../../utils/list';

export default function useList() {
  const dispatch = useAppDispatch();
  const { records, today, loading, error } = useAppSelector(state => state.list);
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState<ListGroup[]>([]);
  const [sort, setSort] = useState<ListSort>('next');
  const [dialog, setDialog] = useState<'sort' | 'filters' | null>(null);

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

  // shortcut: the Add sheet and Edit form are later sections; they open the dev-only ComingSoon screen.
  const open = (record: SubscriptionRecord) =>
    listGroup(record, today) === 'needs_date' ? navigate('ComingSoon', { title: 'Edit' }) : navigate('SubscriptionDetail', { id: record.id });

  return {
    status: records ? 'ready' : error && !loading ? 'failed' : 'loading',
    error,
    today,
    has_records: all.length > 0,
    query,
    setQuery,
    groups,
    toggleGroup: (group: ListGroup) => setGroups(current => (current.includes(group) ? current.filter(item => item !== group) : [...current, group])),
    clearGroups: () => setGroups([]),
    sort,
    sort_label: LIST_SORTS.find(item => item.key === sort)!.label,
    applySort: (next: ListSort) => {
      setSort(next);
      setDialog(null);
    },
    dialog,
    setDialog,
    counts,
    matching_count: matching.length,
    sections,
    open,
    retry: () => dispatch(loadList()),
    openAdd: () => navigate('ComingSoon', { title: 'Add' }),
    openAddManual: () => navigate('ComingSoon', { title: 'Add subscription' }),
  };
}

export type ListController = ReturnType<typeof useList>;
