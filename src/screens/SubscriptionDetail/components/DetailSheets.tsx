import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { check_dark_icon } from '../../../assets/icons';
import AppSheet from '../../../components/AppSheet';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import DateField from '../../../components/DateField';
import Dropdown from '../../../components/Dropdown';
import Icons from '../../../components/Icons';
import InputField from '../../../components/InputField';
import RowView from '../../../components/RowView';
import SizedBox from '../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { daysBetween } from '../../../utils/events';
import { REMINDER_PRESETS, daysText, nextReminderValues, normalizeOffsets, preferenceFromValues } from '../../../utils/reminders';
import { dateLabel } from '../../../utils/scan';
import type { DetailController, DetailView } from '../index.function';
import { styles } from './styles';

type Props = { view: DetailView; detail: DetailController };

function SaveError({ detail }: { detail: DetailController }) {
  return detail.save_error ? <CustomText mt={SIZES.padding3} text={detail.save_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} /> : null;
}

// Per-subscription override: the account default, Off, or one or more days before the event (shared multi-select).
function ReminderSheet({ view, detail }: Props) {
  const current = view.record.reminder;
  const remaining = view.remaining;
  const presets = REMINDER_PRESETS.filter(days => days <= remaining);
  const saved_days = current.mode === 'days' ? current.days.filter(days => days <= remaining) : [];
  const saved_custom = saved_days.find(days => !presets.includes(days));
  const [values, setValues] = useState<string[]>(
    current.mode === 'default' ? ['default'] : current.mode === 'off' ? ['off'] : [...saved_days.filter(days => presets.includes(days)).map(String), ...(saved_custom ? ['custom'] : [])],
  );
  const [custom, setCustom] = useState(saved_custom ? String(saved_custom) : '');
  const [error, setError] = useState('');
  const event = view.record.trial && view.event_date === view.record.trial.end_date ? 'trial ends' : 'renewal';
  const account = daysText(view.account_reminder_days);

  const items = [
    { value: 'default', label: 'Account default' },
    { value: 'off', label: 'Off' },
    ...(remaining >= 3 ? [{ value: 'daily', label: 'Every day for the last 3 days' }] : []),
    ...presets.map(days => ({ value: String(days), label: `${days} day${days === 1 ? '' : 's'} before` })),
    { value: 'custom', label: 'Custom days' },
  ];
  const chosen_days = normalizeOffsets(values, null);
  const display = values.includes('default')
    ? 'Account default'
    : values.includes('off')
      ? 'Off'
      : [chosen_days.length ? daysText(chosen_days) : '', values.includes('custom') ? 'Custom days' : ''].filter(Boolean).join(' + ');

  const save = () => {
    const custom_days = values.includes('custom') ? Number(custom) : null;
    if (custom_days !== null && (!Number.isInteger(custom_days) || custom_days < 1 || custom_days > remaining)) return setError(`Enter a whole number between 1 and ${remaining}.`);
    detail.saveReminder(preferenceFromValues(values, custom_days));
  };

  return (
    <AppSheet visible title="Remind me" subtitle={`${remaining} days until ${event} · ${view.event_date ? dateLabel(view.event_date) : ''}`} onClose={detail.close}>
      <CustomText text={`Account default · ${account}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding * 0.7} />
      <Dropdown multiple label="Remind me" values={values} items={items} display={display} onToggle={value => { setValues(nextReminderValues(values, value)); setError(''); }} />
      {values.includes('custom') ? (
        <>
          <SizedBox height={SIZES.padding2} />
          <InputField variant="sheet" label={`Days before ${event}`} value={custom} onChangeText={value => { setCustom(value); setError(''); }} keyboardType="number-pad" placeholder="e.g. 4" error={error} />
        </>
      ) : null}
      <SaveError detail={detail} />
      <CustomButton variant="primary" text="Save reminder" busy={detail.saving} disabled={detail.saving} onPress={save} style={styles.sheet_button} />
      <CustomText mt={SIZES.padding3} text={`Choose one or more days. Only options that fit before this ${event === 'renewal' ? 'renewal' : 'trial ending'} are shown.`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
    </AppSheet>
  );
}

function NotesSheet({ view, detail }: Props) {
  const [notes, setNotes] = useState(view.record.notes ?? '');
  return (
    <AppSheet visible title={view.record.notes ? 'Edit note' : 'Add note'} onClose={detail.close}>
      <InputField variant="sheet" label="Note" value={notes} onChangeText={setNotes} multiline placeholder="Anything to remember about this subscription" style={styles.notes_input} />
      <SaveError detail={detail} />
      <CustomButton variant="primary" text="Save note" busy={detail.saving} disabled={detail.saving} onPress={() => detail.saveNotes(notes)} style={styles.sheet_button} />
    </AppSheet>
  );
}

// Records Renewless tracking only; the draft is discarded on close.
function CancelSheet({ view, detail }: Props) {
  const [cancelled_on, setCancelledOn] = useState(detail.today);
  const [access_until, setAccessUntil] = useState<string | null>(null);
  const [remind, setRemind] = useState(false);
  const [error, setError] = useState('');
  const name = view.record.name;

  const confirm = () => {
    if (access_until && access_until < cancelled_on) return setError('Access can’t end before the cancellation date.');
    detail.confirmCancel({ cancelled_on, access_until });
  };

  return (
    <AppSheet visible title={`Mark ${name} as cancelled?`} subtitle="Record your cancellation details." onClose={detail.close}>
      <DateField label="Cancellation date" value={cancelled_on} maximum={detail.today} onChange={value => { setCancelledOn(value); setError(''); }} />
      <SizedBox height={SIZES.padding2} />
      <DateField label="Access until · Optional" value={access_until} minimum={cancelled_on} onChange={value => { setAccessUntil(value); setError(''); }} />
      {error ? <CustomText mt={SIZES.padding * 0.35} text={error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} /> : null}
      {access_until && daysBetween(detail.today, access_until) >= 0 ? (
        <RowView gap={SIZES.padding2} accessibilityRole="checkbox" accessibilityState={{ checked: remind }} onPress={() => setRemind(!remind)} style={styles.check_row}>
          <View style={[styles.checkbox, remind && styles.checkbox_checked]}>{remind ? <Icons name={check_dark_icon} /> : null}</View>
          <CustomText text="Remind me when access ends" weight={FONTS.regular} size={SIZES.sm} />
        </RowView>
      ) : null}
      <CustomText mt={SIZES.padding2} text={`This updates your tracking in Renewless. Cancel your plan on ${name} separately.`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <SaveError detail={detail} />
      <RowView gap={SIZES.padding2} style={styles.sheet_actions}>
        <CustomButton variant="secondary" text="Go back" onPress={detail.close} style={styles.half} />
        <CustomButton variant="primary" text="Confirm cancellation" busy={detail.saving} disabled={detail.saving} onPress={confirm} style={styles.half} />
      </RowView>
    </AppSheet>
  );
}

function DeleteDialog({ view, detail }: Props) {
  const name = view.record.name;
  return (
    <Modal transparent visible animationType="fade" onRequestClose={detail.close}>
      <Pressable accessibilityLabel="Go back" onPress={detail.close} style={styles.scrim} />
      <View style={styles.dialog_wrap} pointerEvents="box-none">
        <View accessibilityViewIsModal style={styles.dialog}>
          <CustomText text={`Remove ${name} from Renewless?`} size={SIZES.lg} accessibility_role="header" />
          <CustomText mt={SIZES.padding2} text={`This removes its tracking and stops future reminders. Your ${name} subscription won’t be cancelled.`} weight={FONTS.regular} size={SIZES.sm} />
          <CustomText mt={SIZES.padding2} text="Recorded payment history stays available." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <SaveError detail={detail} />
          <RowView gap={SIZES.padding2} style={styles.sheet_actions}>
            <CustomButton variant="secondary" text="Go back" onPress={detail.close} style={styles.half} />
            <CustomButton variant="primary" text="Remove tracking" busy={detail.saving} disabled={detail.saving} onPress={detail.remove} style={[styles.half, styles.danger]} />
          </RowView>
        </View>
      </View>
    </Modal>
  );
}

// Track again: reviewed amount and a today-or-future date; the reminder shows only when it can fit.
function ResumeSheet({ view, detail }: Props) {
  const { record } = view;
  const [price, setPrice] = useState(record.price);
  const [next_date, setNextDate] = useState<string | null>(record.next_date && record.next_date >= detail.today ? record.next_date : null);
  const [reminder, setReminder] = useState('Off');
  const [errors, setErrors] = useState<{ price?: string; date?: string }>({});
  const days_left = next_date ? daysBetween(detail.today, next_date) : 0;
  const options = ['Off', ...[1, 3, 5, 7].filter(days => days < days_left).map(days => `${days} day${days === 1 ? '' : 's'} before`)];

  // A chosen timing that no longer fits the new date falls back to Off.
  const timing = options.includes(reminder) ? reminder : 'Off';

  const save = () => {
    const next: typeof errors = {};
    if (!(Number(price) > 0)) next.price = 'Enter an amount greater than 0.';
    if (!next_date) next.date = 'Choose the next renewal date.';
    setErrors(next);
    if (next.price || next.date) return;
    const days = parseInt(timing, 10);
    detail.resume({ price: Number(price).toFixed(2), next_date: next_date!, reminder: Number.isInteger(days) ? { mode: 'days', days: [days] } : { mode: 'off' } });
  };

  return (
    <AppSheet visible title={record.plan ? `${record.name} · ${record.plan}` : record.name} subtitle="Track this subscription again." onClose={detail.close}>
      <InputField variant="sheet" label={`Amount · ${record.currency} · ${record.cycle}`} value={price} onChangeText={value => { setPrice(value); setErrors({ ...errors, price: undefined }); }} keyboardType="decimal-pad" error={errors.price} />
      <SizedBox height={SIZES.padding2} />
      <DateField label="Next renewal" value={next_date} minimum={detail.today} onChange={value => { setNextDate(value); setErrors({ ...errors, date: undefined }); }} />
      {errors.date ? <CustomText mt={SIZES.padding * 0.35} text={errors.date} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} /> : null}
      {days_left > 0 ? (
        <>
          <SizedBox height={SIZES.padding2} />
          <Dropdown label="Reminder" value={timing} options={options} onChange={setReminder} />
        </>
      ) : null}
      <SaveError detail={detail} />
      <CustomButton variant="primary" text="Resume tracking" busy={detail.saving} disabled={detail.saving} onPress={save} style={styles.sheet_button} />
    </AppSheet>
  );
}

export default function DetailSheets(props: Props) {
  switch (props.detail.sheet) {
    case 'reminder':
      return <ReminderSheet {...props} />;
    case 'notes':
      return <NotesSheet {...props} />;
    case 'cancel':
      return <CancelSheet {...props} />;
    case 'delete':
      return <DeleteDialog {...props} />;
    case 'resume':
      return <ResumeSheet {...props} />;
    default:
      return null;
  }
}
