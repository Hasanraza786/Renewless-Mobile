import { useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadPlatform } from '../../redux/actions/detail-action';
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
  const load = () => dispatch(loadPlatform(platform_id, exclude_id));

  useEffect(() => {
    dispatch(loadPlatform(platform_id, exclude_id));
  }, [dispatch, exclude_id, platform_id]);

  const count = records.length;
  return {
    title: exclude_id ? `More on ${name}` : name,
    // From Detail the current plan is excluded, so the rest are "other" subscriptions.
    summary: `${count}${exclude_id ? ' other' : ''} subscription${count === 1 ? '' : 's'}`,
    records,
    today: localToday(),
    status: loading ? 'loading' : error ? 'failed' : 'ready',
    error,
    retry: load,
  };
}
