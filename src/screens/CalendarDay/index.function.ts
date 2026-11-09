import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { getCalendarMonth } from '../../redux/actions/calendar-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';

// One date's events from the same month snapshot as the Calendar tab.
export default function useCalendarDay(date: string) {
  const dispatch = useAppDispatch();
  const month = date.slice(0, 7);
  const data = useAppSelector(state => state.calendar.months[month]);
  const { loading, error } = useAppSelector(state => state.calendar);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCalendarMonth(month));
    }, [dispatch, month]),
  );

  const events = data?.events.filter(event => event.date === date) ?? [];
  const today = data?.today ?? '';
  const status = data ? 'ready' : error && !loading ? 'failed' : 'loading';
  const totals = new Map<string, number>();
  for (const event of events.filter(item => item.expected_charge)) totals.set(event.currency, (totals.get(event.currency) ?? 0) + Math.round(Number(event.amount) * 100));
  // "2 scheduled · USD 27.98"; a direct link to an empty date gets fallback copy.
  const note = events.length ? [`${events.length} scheduled`, ...[...totals].map(([currency, cents]) => `${currency} ${(cents / 100).toFixed(2)}`)].join(' · ') : 'Nothing is scheduled on this date.';

  const retry = () => dispatch(getCalendarMonth(month));
  const openDetail = (id: string) => navigate('SubscriptionDetail', { id });

  return { events, today, status, error, note, retry, openDetail };
}
