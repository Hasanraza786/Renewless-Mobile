import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getPlatformSubscriptions } from '../../redux/actions/detail-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { localToday } from '../../utils/dates';

export type Route = NativeStackScreenProps<AppStackParamList, 'PlatformSubscriptions'>['route'];

export default function usePlatformSubscriptions(route: Route) {
  const dispatch = useAppDispatch();
  const { platform_id, name, exclude_id } = route.params;
  const records = useAppSelector(state => state.detail.platform);
  const loading = useAppSelector(state => state.detail.loading.platform);
  const error = useAppSelector(state => state.detail.error.platform);
  const load = () => dispatch(getPlatformSubscriptions(platform_id, exclude_id));

  // Reload on every visit: a plan may have been removed, and nested lists share one store slot.
  useFocusEffect(
    useCallback(() => {
      dispatch(getPlatformSubscriptions(platform_id, exclude_id));
    }, [dispatch, exclude_id, platform_id]),
  );

  const count = records.length;
  const title = exclude_id ? `More on ${name}` : name;
  // From Detail the current plan is excluded, so the rest are "other" subscriptions.
  const summary = `${count}${exclude_id ? ' other' : ''} subscription${count === 1 ? '' : 's'}`;
  const today = localToday();
  const status = loading ? 'loading' : error ? 'failed' : 'ready';

  return { title, summary, records, today, status, error, retry: load };
}
