import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, type RouteProp } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { getCalendarMonth } from '../../redux/actions/calendar-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { HomeEvent, TabParamList } from '../../types';
import { nearestEvent, shiftMonth } from '../../utils/calendar';
import { localToday } from '../../utils/dates';
import { trackEvent } from '../../utils/analytics';
import { money } from '../../utils/money';
import { useIsTablet } from '../../utils/tablet';
import { useCurrencySwitch } from '../../utils/currency-switch';

const EMPTY: HomeEvent[] = [];

export type PickerAnchor = { x: number; y: number; height: number };

// The viewed month and picker state stay while the user opens Detail, the day list or Add and comes back.
export type CalendarRoute = RouteProp<TabParamList, 'Calendar'>;

export default function useCalendar(route: CalendarRoute) {
  const is_tablet = useIsTablet();
  const dispatch = useAppDispatch();
  const { months, loading, error } = useAppSelector(state => state.calendar);
  const [month, setMonth] = useState(() => localToday().slice(0, 7));
  const [picker_anchor, setPickerAnchor] = useState<PickerAnchor | null>(null);
  const [add_open, setAddOpen] = useState(false);
  // The date whose day sheet is open (a date with several events).
  const [day_date, setDayDate] = useState<string | null>(null);
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
  // Several currencies: the month card shows the selected currency's total and events; the grid stays complete.
  const currency = useCurrencySwitch([...(data?.expected ?? []), ...events].map(item => item.currency));
  const expected = currency.only(data?.expected ?? []);
  const expected_text = expected.length ? expected.map(item => money(item.currency, item.amount)).join(' · ') : '0.00';
  const event_count = currency.only(events).length;
  const nearest = nearestEvent(events, today);
  // A past month has nothing upcoming to promise.
  const empty_copy = month < today.slice(0, 7) ? 'No renewals in this month.' : 'No upcoming renewals in this month.';

  const showPrevious = () => {
    trackEvent('calendar_month_changed', { via: 'arrow' });
    setMonth(current => shiftMonth(current, -1));
  };
  const showNext = () => {
    trackEvent('calendar_month_changed', { via: 'arrow' });
    setMonth(current => shiftMonth(current, 1));
  };
  const showToday = () => {
    trackEvent('calendar_month_changed', { via: 'today' });
    setMonth(localToday().slice(0, 7));
  };
  const openPicker = (anchor: PickerAnchor) => setPickerAnchor(anchor);
  const closePicker = () => setPickerAnchor(null);
  const showMonth = (value: string) => {
    trackEvent('calendar_month_changed', { via: 'picker' });
    setMonth(value);
  };
  // Stable, so the grid's swipe responder isn't rebuilt mid-gesture.
  const swipeMonth = useCallback((direction: -1 | 1) => {
    trackEvent('calendar_month_changed', { via: 'swipe' });
    setMonth(current => shiftMonth(current, direction));
  }, []);
  const retry = () => dispatch(getCalendarMonth(month));
  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);
  const openDetail = (id: string) => navigate('SubscriptionDetail', { id });

  // Zero events → Add sheet, one → its Detail, several → the day sheet over Calendar.
  const pressDate = (date: string) => {
    const on_date = events.filter(event => event.date === date);
    if (!on_date.length) openAdd();
    else if (on_date.length === 1) openDetail(on_date[0].subscription_id);
    else setDayDate(date);
  };
  const day_events = day_date ? events.filter(event => event.date === day_date) : EMPTY;
  const day_totals = new Map<string, number>();
  for (const event of day_events.filter(item => item.expected_charge)) day_totals.set(event.currency, (day_totals.get(event.currency) ?? 0) + Math.round(Number(event.amount) * 100));
  // "2 scheduled · USD 27.98 · PKR 1,100.00": totals stay per currency.
  const day_note = [`${day_events.length} scheduled`, ...[...day_totals].map(([code, cents]) => money(code, cents / 100))].join(' · ');
  const closeDay = () => setDayDate(null);
  const openDayDetail = (id: string) => {
    setDayDate(null);
    openDetail(id);
  };

  return {
    is_tablet,
    currency,
    month,
    today,
    events,
    status,
    error,
    expected_text,
    event_count,
    nearest,
    empty_copy,
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
    day_date,
    day_events,
    day_note,
    closeDay,
    openDayDetail,
  };
}

export type CalendarController = ReturnType<typeof useCalendar>;
