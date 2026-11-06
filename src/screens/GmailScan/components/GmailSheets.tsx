import { useState } from 'react';
import { View } from 'react-native';
import { gmail_logo, option_check_icon, platform_logos } from '../../../assets/icons';
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
import type { GmailCandidate } from '../../../types';
import { common_styles } from '../../../utils/common_styles';
import { addDays, dateLabel } from '../../../utils/scan';
import type { GmailScanController } from '../index.function';
import { styles } from '../styles';
import { Checkbox } from './GmailViews';

type Props = { gmail: GmailScanController };

const NOTE = 'Nothing is added until you save selected subscriptions.';

// Review details for one new plan; nothing changes until Keep these details, and closing discards the draft.
function CandidateSheet({ gmail, item }: Props & { item: GmailCandidate }) {
  const value = gmail.view(item);
  const original = item.trial;
  const durations = [...new Set([7, 14, 30, ...(original ? [original.days] : [])])].sort((a, b) => a - b).map(days => `${days} days`);
  const [price, setPrice] = useState(value.price);
  const [next_date, setNextDate] = useState(value.next_date);
  const [start_date, setStartDate] = useState(value.start_date);
  const [duration, setDuration] = useState(`${value.trial?.days ?? 14} days`);
  const [auto_renew, setAutoRenew] = useState(value.trial?.auto_renew ?? true);
  const [errors, setErrors] = useState<{ price?: string; date?: string }>({});
  const days = Number.parseInt(duration, 10);
  // An unchanged start and duration keep the receipt's exact end date.
  const end = start_date ? (original && original.days === days && item.start_date === start_date ? original.end_date : addDays(start_date, days)) : null;

  const keep = () => {
    const next = {
      price: !(Number(price) > 0) ? 'Enter an amount greater than zero.' : undefined,
      date: (value.trial ? start_date : next_date) ? undefined : 'Choose a valid date.',
    };
    setErrors(next);
    if (next.price || next.date) return;
    gmail.keepDetails(item.id, {
      price: Number(price).toFixed(2),
      next_date: value.trial ? null : next_date,
      start_date,
      trial: value.trial && end ? { days, end_date: end, auto_renew } : null,
    });
  };

  const logo = platform_logos[item.platform_id];
  return (
    <AppSheet visible title={value.trial ? `Review ${item.name} trial` : `Review ${item.name}`} onClose={gmail.closeSheet}>
      <RowView gap={SIZES.padding2} style={styles.identity}>
        <View style={styles.avatar}>{logo ? <Icons name={logo} /> : null}</View>
        <CustomText text={item.plan ?? item.name} weight={FONTS.regular} size={SIZES.sm} />
      </RowView>
      <InputField variant="form" label={`${value.trial ? 'Price after trial' : 'Amount'} · ${item.currency}`} value={price} onChangeText={setPrice} keyboardType="decimal-pad" error={errors.price} />
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <RowView justify_content="space-between" gap={SIZES.padding2} style={styles.field}>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomText text={value} weight={FONTS.regular} size={SIZES.sm} />
    </RowView>
  );
}

// Current saved values against the receipt; the saved date stays unless the user replaces it.
function ChangesSheet({ gmail, item }: Props & { item: GmailCandidate }) {
  const [replace, setReplace] = useState(gmail.replace_date);
  return (
    <AppSheet visible title={`Review ${item.name} changes`} onClose={gmail.closeSheet}>
      <Field label="Monthly price" value={`${item.currency} ${item.old?.price ?? ''} → ${item.price}`} />
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

// Owned inboxes only; a new inbox needs Google consent, which is not available yet.
function InboxSheet({ gmail }: Props) {
  return (
    <AppSheet visible title="Choose an inbox" onClose={gmail.closeSheet}>
      {gmail.inboxes.map(inbox => {
        const current = inbox.id === gmail.inbox?.id;
        return (
          <RowView key={inbox.id} gap={SIZES.padding2} accessibilityRole="button" accessibilityState={{ selected: current }} onPress={() => gmail.chooseInbox(inbox)} style={styles.inbox_option}>
            <Icons name={gmail_logo} icon_height={SIZES.padding * 1.2} icon_width={SIZES.padding * 1.2} />
            <CustomText text={inbox.email} weight={FONTS.medium} size={SIZES.sm} style={common_styles.flex_1} />
            {current ? <Icons name={option_check_icon} /> : null}
          </RowView>
        );
      })}
      <CustomButton variant="secondary" text="Connect another Gmail inbox" onPress={gmail.connectAnother} style={styles.sheet_button} />
      <CustomText mt={SIZES.padding2} text="Gmail access is separate from signing in. Connect your inboxes and keep subscriptions up to date at no cost." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
    </AppSheet>
  );
}

export default function GmailSheets({ gmail }: Props) {
  if (!gmail.sheet) return null;
  if (gmail.sheet.kind === 'inboxes') return <InboxSheet gmail={gmail} />;
  const item = gmail.sheet_candidate;
  if (!item) return null;
  return gmail.sheet.kind === 'changes' ? <ChangesSheet gmail={gmail} item={item} /> : <CandidateSheet key={item.id} gmail={gmail} item={item} />;
}
