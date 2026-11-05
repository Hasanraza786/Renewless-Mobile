import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { navigate } from '../../navigation/service';
import { loadImported } from '../../redux/actions/inbox-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { localToday } from '../../utils/dates';

export type InboxSubscriptionsRoute = NativeStackScreenProps<AppStackParamList, 'InboxSubscriptions'>['route'];

// Subscriptions originally imported from this inbox; manual/AI records are excluded.
export default function useInboxSubscriptions(route: InboxSubscriptionsRoute) {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const { inbox, imported, loading, error } = useAppSelector(state => state.inbox);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadImported(id));
    }, [dispatch, id]),
  );

  const records = imported ?? [];
  const status = imported ? 'ready' : error.imported && !loading.imported ? 'failed' : 'loading';
  const email = inbox?.id === id ? inbox.email : 'Inbox disconnected';
  const today = localToday();
  const count_text = `${records.length} subscription${records.length === 1 ? '' : 's'} imported from this inbox.`;

  const retry = () => dispatch(loadImported(id));
  const openDetail = (record_id: string) => navigate('SubscriptionDetail', { id: record_id });

  return { records, status, error: error.imported, email, today, count_text, retry, openDetail };
}
