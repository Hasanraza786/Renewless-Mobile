import { amountError, isValidAmount } from '../../../utils/subscription-form';
import { amountKeyboard, amountPlaceholder, formatAmount } from '../../../utils/money';
import PlatformLogo from '../../../components/PlatformLogo';
import { useState } from 'react';
import { View } from 'react-native';
import { option_check_icon } from '../../../assets/icons';
import { INBOX_BRAND } from '../../../utils/inbox';
import AppSheet from '../../../components/AppSheet';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import PriceChange from '../../../components/PriceChange';
import DateField from '../../../components/DateField';
import Dropdown from '../../../components/Dropdown';
import Icons from '../../../components/Icons';
import InputField from '../../../components/InputField';
import RowView from '../../../components/RowView';
import SizedBox from '../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { GmailCandidate } from '../../../types';
import { common_styles } from '../../../utils/common_styles';
import { addDays, dateLabel } from '../../../utils/scan';
import type { GmailScanController } from '../index.function';
import { styles } from '../styles';
import { Checkbox } from './GmailViews';
import { money } from '../../../utils/money';

type Props = { gmail: GmailScanController };

const NOTE = 'Nothing is added until you save selected subscriptions.';

// Review details for one new plan; nothing changes until Keep these details, and closing discards the draft.
function CandidateSheet({ gmail, item }: Props & { item: GmailCandidate }) {
  const value = gmail.view(item);
  const original = item.trial;
  // An unknown trial length (0) offers the usual choices and starts at 14 days.
  const durations = [...new Set([7, 14, 30, ...(original?.days ? [original.days] : [])])].sort((a, b) => a - b).map(days => `${days} days`);
  const [price, setPrice] = useState(value.price);
  const [next_date, setNextDate] = useState(value.next_date);
  const [start_date, setStartDate] = useState(value.start_date);
  const [duration, setDuration] = useState(`${value.trial?.days || 14} days`);
  const [auto_renew, setAutoRenew] = useState(value.trial?.auto_renew ?? true);
  const [errors, setErrors] = useState<{ price?: string; date?: string }>({});
  const days = Number.parseInt(duration, 10);
  // An unchanged start and duration keep the receipt's exact end date.
  const end = start_date ? (original && original.days === days && item.start_date === start_date ? original.end_date : addDays(start_date, days)) : null;

  const keep = () => {
    const next = {
      price: isValidAmount(price, item.currency) ? undefined : amountError(item.currency),
      date: (value.trial ? start_date : next_date) ? undefined : 'Choose a valid date.',
    };
    setErrors(next);
    if (next.price || next.date) return;
    gmail.keepDetails(item.id, {
      price: formatAmount(item.currency, price),
      next_date: value.trial ? null : next_date,
      start_date,
      trial: value.trial && end ? { days, end_date: end, auto_renew } : null,
    });
  };

  return (
    <AppSheet visible title={value.trial ? `Review ${item.name} trial` : `Review ${item.name}`} onClose={gmail.closeSheet}>
      <RowView gap={SIZES.padding2} style={styles.identity}>
        <View style={styles.avatar}><PlatformLogo platform_id={item.platform_id} /></View>
        <CustomText text={item.plan ?? item.name} weight={FONTS.regular} size={SIZES.sm} />
      </RowView>
      <InputField variant="form" label={`${value.trial ? 'Price after trial' : 'Amount'} · ${item.currency}`} value={price} onChangeText={setPrice} keyboardType={amountKeyboard(item.currency)} placeholder={amountPlaceholder(item.currency)} error={errors.price} />
      <SizedBox height={SIZES.padding * 0.7} />
      {value.trial ? (
        <>
          <DateField variant="form" label="Trial start date" value={start_date} onChange={setStartDate} error={errors.date} />
          <SizedBox height={SIZES.padding * 0.7} />
          <Dropdown label="Trial duration" value={duration} options={durations} onChange={setDuration} />
          <RowView justify_content="space-between" style={styles.trial_end} accessibilityLiveRegion="polite">
            <CustomText text="Trial ends" weight={FONTS.regular} size={SIZES.sm} />
            <CustomText text={end ? dateLabel(end) : 'Choose a start date'} weight={FONTS.medium} size={SIZES.sm} />
          </RowView>
          <RowView gap={SIZES.padding2} accessibilityRole="checkbox" accessibilityState={{ checked: auto_renew }} onPress={() => setAutoRenew(current => !current)} style={styles.check_row}>
            <Checkbox checked={auto_renew} />
            <CustomText text="Track renewals after trial" weight={FONTS.regular} size={SIZES.sm} />
          </RowView>
          <CustomText mt={SIZES.padding / 2} text={`${item.cycle} after trial. This doesn’t change your service settings.`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </>
      ) : (
        <DateField variant="form" label="Next renewal" value={next_date} onChange={setNextDate} error={errors.date} />
      )}
      <CustomButton variant="primary" text="Keep these details" onPress={keep} style={styles.sheet_button} />
      <CustomText mt={SIZES.padding3} text={NOTE} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
    </AppSheet>
  );
}

function Field({ label, value }: { label: string; value: string | { from: string; to: string } }) {
  return (
    <RowView justify_content="space-between" gap={SIZES.padding2} style={styles.field}>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      {typeof value === 'string' ? <CustomText text={value} weight={FONTS.regular} size={SIZES.sm} /> : <PriceChange from={value.from} to={value.to} />}
    </RowView>
  );
}

// Current saved values against the receipt; the saved date stays unless the user replaces it.
function ChangesSheet({ gmail, item }: Props & { item: GmailCandidate }) {
  const [replace, setReplace] = useState(gmail.replace_date);
  return (
    <AppSheet visible title={`Review ${item.name} changes`} onClose={gmail.closeSheet}>
      <Field label="Monthly price" value={{ from: money(item.currency, item.old?.price ?? ''), to: item.price }} />
      <Field label="Saved renewal" value={item.old?.next_date ? dateLabel(item.old.next_date) : 'Not set'} />
      <Field label="Found in receipt" value={item.next_date ? dateLabel(item.next_date) : 'Not found'} />
      <RowView align_items="flex-start" gap={SIZES.padding2} accessibilityRole="checkbox" accessibilityState={{ checked: replace }} onPress={() => setReplace(current => !current)} style={styles.check_row}>
        <Checkbox checked={replace} />
        <View style={common_styles.flex_1}>
          <CustomText text="Replace my saved renewal date" weight={FONTS.regular} size={SIZES.sm} />
          <CustomText mt={SIZES.padding / 5} text="Keep your saved date unless you choose to replace it." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
      </RowView>
      <CustomText mt={SIZES.padding / 2} text="Price updates apply when you save selected results." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomButton variant="primary" text="Keep these choices" onPress={() => gmail.keepChanges(item.id, replace)} style={styles.sheet_button} />
    </AppSheet>
  );
}

const shortDay = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

// Which plan is this for? One radio row per tracked plan, then It's a separate plan; Save records the pick.
function MatchSheet({ gmail, entry }: Props & { entry: GmailScanController['needs_match'][number] }) {
  const [pick, setPick] = useState(gmail.matches[entry.receipt_id] ?? '');
  const options = [
    ...entry.options.map(option => ({
      id: option.subscription_id,
      label: option.plan ?? option.name,
      detail: `${option.price ? `${money(option.currency, option.price)} ${option.cycle.toLowerCase()}` : option.cycle}${option.next_date ? ` · renews ${shortDay(option.next_date)}` : ''}`,
    })),
    { id: 'separate', label: 'It’s a separate plan', detail: 'Add it as its own subscription' },
  ];
  return (
    <AppSheet visible title="Which plan is this for?" onClose={gmail.closeSheet}>
      <CustomText text={`${entry.name} · ${money(entry.currency, entry.amount)} paid ${shortDay(entry.paid_date)}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <SizedBox height={SIZES.padding * 0.6} />
      <View accessibilityRole="radiogroup" accessibilityLabel="Choose the plan for this payment">
        {options.map((option, index) => {
          const on = pick === option.id;
          return (
            <RowView
              key={option.id}
              gap={SIZES.padding * 0.6}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
              accessibilityLabel={`${option.label}, ${option.detail}`}
              onPress={() => setPick(option.id)}
              style={[styles.option, index > 0 && styles.option_gap]}>
              <View style={[styles.radio, on && styles.radio_on]}>{on ? <View style={styles.radio_dot} /> : null}</View>
              <View style={common_styles.flex_1}>
                <CustomText text={option.label} size={SIZES.sm} />
                <CustomText mt={SIZES.padding / 8} text={option.detail} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
              </View>
            </RowView>
          );
        })}
      </View>
      {gmail.match_error ? <CustomText mt={SIZES.padding / 2} text={gmail.match_error} weight={FONTS.regular} color={COLORS.danger} size={SIZES.sm} /> : null}
      <CustomButton variant="primary" text="Save" disabled={!pick || gmail.match_busy} busy={gmail.match_busy} onPress={() => gmail.saveMatch(entry.receipt_id, pick)} style={styles.sheet_button} />
    </AppSheet>
  );
}

// Owned inboxes only; Connect another inbox opens Choose inbox for a Gmail or Outlook inbox.
function InboxSheet({ gmail }: Props) {
  return (
    <AppSheet visible title="Choose an inbox" onClose={gmail.closeSheet}>
      {gmail.inboxes.map(inbox => {
        const current = inbox.id === gmail.inbox?.id;
        return (
          <RowView key={inbox.id} gap={SIZES.padding2} accessibilityRole="button" accessibilityState={{ selected: current }} onPress={() => gmail.chooseInbox(inbox)} style={styles.inbox_option}>
            <Icons name={INBOX_BRAND[inbox.provider].logo} icon_height={SIZES.padding * 1.2} icon_width={SIZES.padding * 1.2} />
            <CustomText text={inbox.email} weight={FONTS.medium} size={SIZES.sm} style={common_styles.flex_1} />
            {current ? <Icons name={option_check_icon} /> : null}
          </RowView>
        );
      })}
      <CustomButton variant="secondary" text="Connect another inbox" onPress={gmail.connectAnother} style={styles.sheet_button} />
      <CustomText mt={SIZES.padding2} text="Inbox access is separate from signing in. Connect your inboxes and keep subscriptions up to date at no cost." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
    </AppSheet>
  );
}

export default function GmailSheets({ gmail }: Props) {
  if (!gmail.sheet) return null;
  if (gmail.sheet.kind === 'inboxes') return <InboxSheet gmail={gmail} />;
  if (gmail.sheet.kind === 'match') return gmail.sheet_match ? <MatchSheet key={gmail.sheet_match.receipt_id} gmail={gmail} entry={gmail.sheet_match} /> : null;
  const item = gmail.sheet_candidate;
  if (!item) return null;
  return gmail.sheet.kind === 'changes' ? <ChangesSheet gmail={gmail} item={item} /> : <CandidateSheet key={item.id} gmail={gmail} item={item} />;
}
