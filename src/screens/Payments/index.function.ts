import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect, useNavigation, type RouteProp } from '@react-navigation/native';
import { goBack, navigate } from '../../navigation/service';
import { loadPayments } from '../../redux/actions/payments-action';
import { setNotice } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, PaymentRecord, TabParamList } from '../../types';
import { alignedMonth, defaultYear, inPeriod, matchesQuery, monthlySeries, paymentCurrencies, paymentTotals, paymentYears, periodLabel, type PaymentMonth } from '../../utils/payments';

export type PaymentsRoute = RouteProp<TabParamList, 'Payments'> | RouteProp<AppStackParamList, 'SubscriptionPayments'>;

const EMPTY: PaymentRecord[] = [];

export const sourceLabel = (source: PaymentRecord['source']) => ({ gmail: 'Gmail receipt', reviewed: 'Receipt confirmed', manual: 'Marked by you' })[source];

// One screen for the account Payments tab and Detail's scoped SubscriptionPayments route.
export default function usePayments(route: PaymentsRoute) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const scoped = route.name === 'SubscriptionPayments' ? route.params : null;
  const scope = scoped?.id ?? 'account';
  const { scopes, today, loading, error } = useAppSelector(state => state.payments);
  const rows = scopes[scope] ?? EMPTY;
  const [year_choice, setYearChoice] = useState('');
  const [month, setMonth] = useState<PaymentMonth>('all');
  const [query, setQuery] = useState('');
  // null follows the period (chosen month, or the newest payment month); a column tap or page change pins it.
  const [inspect_choice, setInspectChoice] = useState<string | null>(null);
  const [selected, setSelected] = useState<PaymentRecord | null>(null);
  const home_month = route.name === 'Payments' ? route.params?.month : undefined;

  useFocusEffect(
    useCallback(() => {
      dispatch(loadPayments(scope));
    }, [dispatch, scope]),
  );

  // Home Paid this month: select that month once, then drop the param so later tab visits keep the user's filters.
  useEffect(() => {
    if (!home_month) return;
    setYearChoice(home_month.slice(0, 4));
    setMonth(home_month.slice(5, 7));
    setInspectChoice(null);
    navigation.setParams({ month: undefined } as never);
  }, [home_month, navigation]);

  const years = useMemo(() => paymentYears(rows), [rows]);
  const year = years.includes(year_choice) ? year_choice : defaultYear(years, today);
  const period = useMemo(() => inPeriod(rows, year, month), [rows, year, month]);
  const matched = useMemo(() => period.filter(row => matchesQuery(row, query)), [period, query]);
  const inspect = inspect_choice ?? alignedMonth(rows, year, month);
  const totals = paymentTotals(period);
  const charts = paymentCurrencies(rows).map(currency => ({
    currency,
    amount: totals.find(item => item.currency === currency)?.amount ?? '0.00',
    months: monthlySeries(rows, year, currency),
  }));

  const status = scopes[scope] ? 'ready' : error && !loading ? 'failed' : 'loading';
  const has_payments = rows.length > 0;
  const period_label = periodLabel(year, month);
  const period_count = period.length;
  // The six-month page holding the inspected month: 0 = Jan–Jun, 6 = Jul–Dec.
  const page_start = Number(inspect) <= 6 ? 0 : 6;

  const chooseYear = (value: string) => {
    setYearChoice(value);
    setInspectChoice(null);
  };

  const chooseMonth = (value: PaymentMonth) => {
    setMonth(value);
    setInspectChoice(null);
  };

  // Paging inspects the first month of the new page; the list period never changes.
  const showPage = (start: number) => setInspectChoice(String(start + 1).padStart(2, '0'));

  const retry = () => dispatch(loadPayments(scope));

  const openList = () => navigate('List');

  const viewSubscription = () => {
    if (!selected) return;
    setSelected(null);
    // The app toast sits under modals, so the dialog closes before the unavailable notice shows.
    if (!selected.subscription_available) {
      dispatch(setNotice('This subscription is no longer available. Your payment record is kept.'));
      return;
    }
    if (scoped?.id === selected.subscription_id) goBack();
    else navigate('SubscriptionDetail', { id: selected.subscription_id });
  };

  return {
    scoped,
    status,
    error,
    has_payments,
    years,
    year,
    month,
    period_label,
    period_count,
    charts,
    inspect,
    page_start,
    query,
    setQuery,
    matched,
    selected,
    setSelected,
    chooseYear,
    chooseMonth,
    inspectMonth: setInspectChoice,
    showPage,
    retry,
    openList,
    viewSubscription,
  };
}

export type PaymentsController = ReturnType<typeof usePayments>;
