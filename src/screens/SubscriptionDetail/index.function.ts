import { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../../constants/theme';
import { goBack, navigate } from '../../navigation/service';
import { cancelSubscription, getSubscriptionDetail, deleteSubscription, resumeSubscription, updateNotes, updateReminder } from '../../redux/actions/detail-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, ReminderPreference, SubscriptionDetail } from '../../types';
import { USAGE_AMOUNT, amountLabel, daysBetween, recordStatus, shortDate } from '../../utils/events';
import { defaultTooClose, reminderText } from '../../utils/reminders';
import { dateLabel } from '../../utils/scan';
import { formatAmount, money } from '../../utils/money';
import { useIsTablet } from '../../utils/tablet';
import { INBOX_BRAND } from '../../utils/inbox';

export type Route = NativeStackScreenProps<AppStackParamList, 'SubscriptionDetail'>['route'];
export type Sheet = 'reminder' | 'cancel' | 'delete' | 'resume' | 'notes' | null;

const STATUS_FILL: Record<string, string> = {
  [COLORS.due_today]: COLORS.status_due_bg,
  [COLORS.renewing_soon]: COLORS.status_soon_bg,
  [COLORS.trial]: COLORS.status_trial_bg,
  [COLORS.primary]: COLORS.status_active_bg,
  [COLORS.expired]: COLORS.status_expired_bg,
  [COLORS.text_secondary]: COLORS.status_muted_bg,
};


const relative = (days: number) => (days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : days < 0 ? 'Past date' : `In ${days} days`);

// Everything Detail shows, derived once from the server record.
export function detailView({ record, today, receipts, receipt_emails, annual_estimate, last_charges, related_count, account_reminder_days }: SubscriptionDetail) {
  const status = recordStatus(record, today);
  const in_trial = !!record.trial && record.trial.end_date >= today;
  const trial_ended = !!record.trial && !in_trial && !record.trial.auto_renew;
  const cancelled = record.status !== 'active';
  const event_date = in_trial ? record.trial!.end_date : record.next_date;
  const remaining = event_date ? Math.max(0, daysBetween(today, event_date)) : 0;
  // Usage bill (Detail · usage, locked 23 Nov 2026): when a bill is expected and the last bills, never a fixed price.
  const usage = record.billing === 'usage';
  const last_bill = last_charges.at(-1);
  const bill_currency = last_bill?.currency ?? record.currency;
  const typical = last_charges.filter(item => item.currency === bill_currency);
  const usage_view = usage
    ? {
        last_bill: last_bill ? `Last bill ${money(last_bill.currency, last_bill.amount)} · ${shortDate(last_bill.date)}` : '',
        bills: last_charges.map(item => ({ key: item.date, amount: money(item.currency, item.amount), month: new Date(`${item.date}T00:00:00`).toLocaleDateString('en-GB', { month: 'short' }) })),
        typical: typical.length ? `${money(bill_currency, typical.reduce((sum, item) => sum + Number(item.amount), 0) / typical.length)} average` : 'Not enough bills yet',
      }
    : null;

  const event = cancelled
    ? { label: 'Access until', value: record.access_until ? dateLabel(record.access_until) : 'Not set' }
    : trial_ended
      ? { label: 'Trial ended', value: `Auto-renew tracking off · ${dateLabel(record.trial!.end_date)}` }
      : in_trial
        ? { label: 'Trial ends', value: `${relative(daysBetween(today, record.trial!.end_date))} · ${dateLabel(record.trial!.end_date)}` }
        : usage
          ? { label: 'Next bill', value: record.next_date ? `Expected around ${shortDate(record.next_date)} · check your usage` : 'Add a renewal date' }
        : record.next_date
          ? { label: 'Next renewal', value: `${relative(daysBetween(today, record.next_date))} · ${dateLabel(record.next_date)}` }
          : { label: 'Next renewal', value: 'Add a renewal date' };

  // Reminder is actionable only while an advance reminder can still be sent.
  const too_close_note = in_trial ? 'Too close to remind you before this trial ends.' : 'Too close for this renewal. Reminders start with the next one.';
  const reminder = cancelled || trial_ended
    ? { text: 'Off', actionable: false, note: null }
    : !event_date
      ? { text: 'Add a renewal date', actionable: false, note: null }
      : {
          text: reminderText(record.reminder, account_reminder_days, remaining),
          actionable: true,
          note: defaultTooClose(record.reminder, account_reminder_days, remaining) ? too_close_note : null,
        };

  const latest = record.price_history[0];
  return {
    record,
    status: { ...status, fill: STATUS_FILL[status.color] ?? COLORS.status_muted_bg },
    cost: usage_view
      ? { text: USAGE_AMOUNT, caption: usage_view.last_bill }
      : { text: money(record.currency, formatAmount(record.currency, record.price)), caption: `${in_trial ? 'After trial · ' : ''}${record.cycle}` },
    usage: usage_view,
    event,
    // Only an active trial uses the trial title; an ended trial is back to renewal billing.
    billing_title: in_trial ? 'Trial & billing' : 'Renewal & billing',
    trial_end: record.trial ? dateLabel(record.trial.end_date) : null,
    // Inactive records (cancelled, expired, trial ended) no longer renew.
    auto_renew: cancelled || trial_ended ? 'Off' : record.auto_renew === null ? 'Not set' : record.auto_renew ? 'On' : 'Off',
    reminder,
    remaining,
    event_date,
    // Estimated-date note (Studio Detail): inbox records say where the date came from; inactive records point to Track again.
    estimated_note: record.estimated && !usage && (cancelled ? !!record.access_until : !!event_date)
      ? `${record.source.kind === 'gmail' ? 'Date estimated from a receipt.' : 'Estimated date.'} ${cancelled ? 'Review your next date when you track again.' : 'You can update it in Edit.'}`
      : null,
    cancelled,
    receipts: {
      total: receipts.totals.length ? receipts.totals.map(item => money(item.currency, item.amount)).join('\n') : 'No receipts yet',
      caption: `${receipts.count ? `${receipts.count} payment${receipts.count === 1 ? '' : 's'}` : 'No payments'} found · Available inbox receipts only`,
    },
    since: record.start_date ? dateLabel(record.start_date) : 'Not set',
    annual_label: usage_view ? 'Typical bill · last 3' : cancelled ? 'Last price · annual equivalent' : in_trial ? 'After trial · annual equivalent' : 'Current price · annual equivalent',
    annual_value: usage_view ? usage_view.typical : annual_estimate === null ? 'Not available' : `${money(record.currency, annual_estimate)} estimated`,
    // Detail draws the arrow between the two prices as an icon.
    price_history: latest
      ? { from: `${money(latest.currency, latest.from_amount)} · ${latest.from_cycle}`, to: `${money(latest.currency, latest.to_amount)} · ${latest.to_cycle}` }
      : 'No price changes recorded',
    // Receipts row: how many billing emails are kept and the newest one's date.
    receipt_emails: receipt_emails.count && receipt_emails.latest ? { title: `Receipts · ${receipt_emails.count}`, caption: `Latest ${dateLabel(receipt_emails.latest)} · from your inbox` } : { title: 'Receipts', caption: 'No receipts yet' },
    source: record.source.kind === 'gmail'
      ? { title: 'Scanned inbox', badge: `Found in ${INBOX_BRAND[record.source.provider].name}`, caption: record.inbox?.disconnected ? 'The inbox this subscription was found in. It is now disconnected.' : 'The connected inbox this subscription was found in.' }
      : { title: 'Added under', badge: record.source.kind === 'ai' ? 'Added with AI' : 'Added manually', caption: 'Your Renewless account when this subscription was added.' },
    related: related_count ? `${related_count} other subscription${related_count === 1 ? '' : 's'}` : null,
    related_count,
    account_reminder_days,
    resume_price: amountLabel(record.price, record.currency),
  };
}

export type DetailView = ReturnType<typeof detailView>;

export default function useSubscriptionDetail(route: Route) {
  const dispatch = useAppDispatch();
  const { id } = route.params;
  const detail = useAppSelector(state => state.detail.detail);
  const loading = useAppSelector(state => state.detail.loading);
  const error = useAppSelector(state => state.detail.error);
  const is_tablet = useIsTablet();
  const [sheet, setSheet] = useState<Sheet>(null);
  const [message, setMessage] = useState('');

  // Refresh on every visit so returning from Edit or Platform shows the latest record.
  useFocusEffect(
    useCallback(() => {
      dispatch(getSubscriptionDetail(id));
    }, [dispatch, id]),
  );

  const view = detail && detail.record.id === id ? detailView(detail) : null;
  const close = () => setSheet(null);
  const done = (text = '') => () => {
    setSheet(null);
    setMessage(text);
  };

  const status = view ? 'ready' : error.detail && !loading.detail ? 'failed' : 'loading';
  const today = detail?.today ?? '';

  const retry = () => dispatch(getSubscriptionDetail(id));
  const openEdit = () => navigate('EditSubscription', { id });
  const openPayments = () => view && navigate('SubscriptionPayments', { id, name: view.record.name });
  const openPriceHistory = () => navigate('PriceHistory', { id });
  const openReceipts = () => navigate('Receipts', { id });
  const openRelated = () => view && navigate('PlatformSubscriptions', { platform_id: view.record.platform_id, name: view.record.name, exclude_id: id });
  const openManage = () => view?.record.manage_url && Linking.openURL(view.record.manage_url);
  const saveReminderPreference = (reminder: ReminderPreference) => dispatch(updateReminder(id, reminder, done()));
  const saveNoteText = (notes: string) => dispatch(updateNotes(id, notes, done()));
  const confirmCancel = (input: { cancelled_on: string; access_until: string | null }) => dispatch(cancelSubscription(id, input, done()));
  const resume = (input: { price: string; next_date: string; reminder: ReminderPreference }) => dispatch(resumeSubscription(id, input, done('Tracking resumed in Renewless.')));
  const onRemoved = () => {
    setSheet(null);
    goBack();
  };
  const remove = () => dispatch(deleteSubscription(id, view?.record.name ?? 'Subscription', onRemoved));

  return {
    view,
    today,
    status,
    is_tablet,
    error: error.detail,
    saving: loading.mutation,
    save_error: error.mutation,
    message,
    sheet,
    setSheet,
    close,
    retry,
    openEdit,
    openPayments,
    openPriceHistory,
    openReceipts,
    openRelated,
    openManage,
    saveReminder: saveReminderPreference,
    saveNotes: saveNoteText,
    confirmCancel,
    resume,
    remove,
  };
}

export type DetailController = ReturnType<typeof useSubscriptionDetail>;
