import { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../../constants/theme';
import { goBack, navigate } from '../../navigation/service';
import { cancelSubscription, loadDetail, removeSubscription, resumeSubscription, saveNotes, saveReminder } from '../../redux/actions/detail-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, ReminderPreference, SubscriptionDetail } from '../../types';
import { amountLabel, daysBetween, recordStatus } from '../../utils/events';
import { reminderText } from '../../utils/reminders';
import { dateLabel } from '../../utils/scan';

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
export function detailView({ record, today, receipts, annual_estimate, related_count, account_reminder_days }: SubscriptionDetail) {
  const status = recordStatus(record, today);
  const in_trial = !!record.trial && record.trial.end_date >= today;
  const trial_ended = !!record.trial && !in_trial && !record.trial.auto_renew;
  const cancelled = record.status !== 'active';
  const event_date = in_trial ? record.trial!.end_date : record.next_date;
  const remaining = event_date ? Math.max(0, daysBetween(today, event_date)) : 0;

  const event = cancelled
    ? { label: 'Access until', value: record.access_until ? dateLabel(record.access_until) : 'Not set' }
    : trial_ended
      ? { label: 'Trial ended', value: `Auto-renew tracking off · ${dateLabel(record.trial!.end_date)}` }
      : in_trial
        ? { label: 'Trial ends', value: `${relative(daysBetween(today, record.trial!.end_date))} · ${dateLabel(record.trial!.end_date)}` }
        : record.next_date
          ? { label: 'Next renewal', value: `${relative(daysBetween(today, record.next_date))} · ${dateLabel(record.next_date)}` }
          : { label: 'Next renewal', value: 'Add a renewal date' };

  // Reminder is actionable only while an advance reminder can still be sent.
  const reminder = cancelled || trial_ended
    ? { text: 'Off', actionable: false }
    : !event_date
      ? { text: 'Add a renewal date', actionable: false }
      : { text: reminderText(record.reminder, account_reminder_days, remaining), actionable: true };

  const latest = record.price_history[0];
  return {
    record,
    status: { ...status, fill: STATUS_FILL[status.color] ?? COLORS.status_muted_bg },
    cost: { currency: record.currency, amount: Number(record.price).toFixed(2), caption: `${in_trial ? 'After trial · ' : ''}${record.cycle}` },
    event,
    // Only an active trial uses the trial title; an ended trial is back to renewal billing.
    billing_title: in_trial ? 'Trial & billing' : 'Renewal & billing',
    trial_end: record.trial ? dateLabel(record.trial.end_date) : null,
    // Inactive records (cancelled, expired, trial ended) no longer renew.
    auto_renew: cancelled || trial_ended ? 'Off' : record.auto_renew === null ? 'Not set' : record.auto_renew ? 'On' : 'Off',
    reminder,
    remaining,
    event_date,
    estimated_note: record.estimated && !cancelled && !!record.next_date,
    cancelled,
    receipts: {
      total: receipts.totals.length ? receipts.totals.map(item => `${item.currency} ${item.amount}`).join('\n') : 'No receipts yet',
      caption: `${receipts.count ? `${receipts.count} payment${receipts.count === 1 ? '' : 's'}` : 'No payments'} found · Available Gmail receipts only`,
    },
    since: record.start_date ? dateLabel(record.start_date) : 'Not set',
    annual_label: cancelled ? 'Last price · annual equivalent' : in_trial ? 'After trial · annual equivalent' : 'Current price · annual equivalent',
    annual_value: `${record.currency} ${annual_estimate} estimated`,
    price_history: latest
      ? `${latest.currency} ${latest.from_amount} · ${latest.from_cycle} → ${latest.currency} ${latest.to_amount} · ${latest.to_cycle}`
      : 'No price changes recorded',
    source: record.source.kind === 'gmail'
      ? { title: 'Scanned inbox', badge: 'Found in Gmail', caption: record.inbox?.disconnected ? 'The inbox this subscription was found in. It is now disconnected.' : 'The connected inbox this subscription was found in.' }
      : { title: 'Added under', badge: 'Added manually', caption: 'Your Renewless account when this subscription was added.' },
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
  const [sheet, setSheet] = useState<Sheet>(null);
  const [message, setMessage] = useState('');

  // Refresh on every visit so returning from Edit or Platform shows the latest record.
  useFocusEffect(
    useCallback(() => {
      dispatch(loadDetail(id));
    }, [dispatch, id]),
  );

  const view = detail && detail.record.id === id ? detailView(detail) : null;
  const close = () => setSheet(null);
  const done = (ok: boolean, text = '') => {
    if (!ok) return;
    setSheet(null);
    setMessage(text);
  };

  const status = view ? 'ready' : error.detail && !loading.detail ? 'failed' : 'loading';
  const today = detail?.today ?? '';

  const retry = () => dispatch(loadDetail(id));
  const openEdit = () => navigate('EditSubscription', { id });
  const openPayments = () => view && navigate('SubscriptionPayments', { id, name: view.record.name });
  const openPriceHistory = () => navigate('PriceHistory', { id });
  const openRelated = () => view && navigate('PlatformSubscriptions', { platform_id: view.record.platform_id, name: view.record.name, exclude_id: id });
  const openManage = () => view?.record.manage_url && Linking.openURL(view.record.manage_url);
  const saveReminderPreference = async (reminder: ReminderPreference) => done(await dispatch(saveReminder(id, reminder)));
  const saveNoteText = async (notes: string) => done(await dispatch(saveNotes(id, notes)));
  const confirmCancel = async (input: { cancelled_on: string; access_until: string | null }) => done(await dispatch(cancelSubscription(id, input)));
  const resume = async (input: { price: string; next_date: string; reminder: ReminderPreference }) => done(await dispatch(resumeSubscription(id, input)), 'Tracking resumed in Renewless.');
  const remove = async () => {
    if (!(await dispatch(removeSubscription(id, view?.record.name ?? 'Subscription')))) return;
    setSheet(null);
    goBack();
  };

  return {
    view,
    today,
    status,
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
