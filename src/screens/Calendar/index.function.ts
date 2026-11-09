import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, type RouteProp } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { getCalendarMonth } from '../../redux/actions/calendar-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { HomeEvent, TabParamList } from '../../types';
import { nearestEvent, shiftMonth } from '../../utils/calendar';
import { localToday } from '../../utils/dates';

const EMPTY: HomeEvent[] = [];

export type PickerAnchor = { x: number; y: number; height: number };

// The viewed month and picker state stay while the user opens Detail, the day list or Add and comes back.
export type CalendarRoute = RouteProp<TabParamList, 'Calendar'>;

export default function useCalendar(route: CalendarRoute) {
  const dispatch = useAppDispatch();
  const { months, loading, error } = useAppSelector(state => state.calendar);
  const [month, setMonth] = useState(() => localToday().slice(0, 7));
  const [picker_anchor, setPickerAnchor] = useState<PickerAnchor | null>(null);
  const [add_open, setAddOpen] = useState(false);
  // AI chat consent Not now: reopen the Add sheet that opened AI chat.
  const add_sheet = route.params?.add_sheet;
  useEffect(() => {
    if (add_sheet) setAddOpen(true);
  }, [add_sheet]);

  // Refresh on every visit so Detail/Add changes show; each month is fetched when it is viewed.
  useFocusEffect(
    useCallback(() => {
      dispatch(getCalendarMonth(month));
    }, [dispatch, month]),
  );

  // Any month change (arrows, swipe, Today, Show month) closes the picker.
  useEffect(() => setPickerAnchor(null), [month]);

  const data = months[month];
  const today = data?.today ?? localToday();
  const events = data?.events ?? EMPTY;
  const status = data ? 'ready' : error && !loading ? 'failed' : 'loading';
  const expected_text = data?.expected.length ? data.expected.map(item => `${item.currency} ${item.amount}`).join(' · ') : 'No scheduled charges';
  const event_count = events.length;
  const nearest = nearestEvent(events, today);

  const showPrevious = () => setMonth(current => shiftMonth(current, -1));
  const showNext = () => setMonth(current => shiftMonth(current, 1));
  const showToday = () => setMonth(localToday().slice(0, 7));
  const openPicker = (anchor: PickerAnchor) => setPickerAnchor(anchor);
  const closePicker = () => setPickerAnchor(null);
  const showMonth = (value: string) => setMonth(value);
  // Stable, so the grid's swipe responder isn't rebuilt mid-gesture.
  const swipeMonth = useCallback((direction: -1 | 1) => setMonth(current => shiftMonth(current, direction)), []);
  const retry = () => dispatch(getCalendarMonth(month));
  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);
  const openDetail = (id: string) => navigate('SubscriptionDetail', { id });

  // Zero events → Add sheet, one → its Detail, several → the day list.
  const pressDate = (date: string) => {
    const on_date = events.filter(event => event.date === date);
    if (!on_date.length) openAdd();
    else if (on_date.length === 1) openDetail(on_date[0].subscription_id);
    else navigate('CalendarDay', { date });
  };

  return {
    month,
    today,
    events,
    status,
    error,
    expected_text,
    event_count,
    nearest,
    picker_anchor,
    showPrevious,
    showNext,
    showToday,
    openPicker,
    closePicker,
    showMonth,
    swipeMonth,
    retry,
    add_open,
    openAdd,
    closeAdd,
    openDetail,
    pressDate,
  };
}

export type CalendarController = ReturnType<typeof useCalendar>;
