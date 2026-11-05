import { View } from 'react-native';
import { switch_off_icon, switch_on_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import type { ScanCycle } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { dateLabel } from '../../utils/scan';
import { CATEGORIES, CURRENCIES, CYCLES, NOTES_LIMIT, PRICE_REASONS, TRIAL_OPTIONS, catalogMatches, trialEnd, trialSummary, type DraftErrors, type SubscriptionDraft, type TrialOrigin } from '../../utils/subscription-form';
import CustomText from '../CustomText';
import DateField from '../DateField';
import Dropdown from '../Dropdown';
import Icons from '../Icons';
import InputField from '../InputField';
import RowView from '../RowView';
import SizedBox from '../SizedBox';
import { styles } from './styles';

type Props = {
  draft: SubscriptionDraft;
  errors: DraftErrors;
  onChange: <Key extends keyof SubscriptionDraft>(key: Key, value: SubscriptionDraft[Key]) => void;
  // Picking a catalog suggestion fills name, platform and category together.
  onPickService: (name: string, platform_id: string, category: string) => void;
  origin: TrialOrigin;
  // Edit with a changed amount/currency/cycle shows the reason and effective date.
  show_price_change: boolean;
  today: string;
  editable: boolean;
};

const GAP = SIZES.padding * 0.7;

function FieldError({ text }: { text?: string }) {
  return text ? <CustomText mt={SIZES.padding * 0.3} text={text} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} accessibility_role="alert" /> : null;
}

// The one Add/Edit field set: service, amount/currency, cycle, category, trial, dates, notes.
export default function SubscriptionFields({ draft, errors, onChange, onPickService, origin, show_price_change, today, editable }: Props) {
  const on_trial = draft.trial !== 'No trial';
  const matches = draft.platform_id ? [] : catalogMatches(draft.name);
  const calculated = !!trialEnd(draft, origin);
  const categories = CATEGORIES.includes(draft.category) ? CATEGORIES : [...CATEGORIES, draft.category];

  return (
    <View>
      <View style={styles.service}>
        <InputField
          variant="form"
          label="Platform or service"
          value={draft.name}
          onChangeText={value => {
            onChange('name', value);
            onChange('platform_id', null);
          }}
          placeholder="Type a service name"
          autoCorrect={false}
          error={errors.name}
          editable={editable}
        />
        {matches.length ? (
          <View accessibilityRole="menu" accessibilityLabel="Matching services" style={styles.suggestions}>
            {matches.map(entry => (
              <RowView key={entry.platform_id} justify_content="space-between" accessibilityRole="menuitem" onPress={() => onPickService(entry.name, entry.platform_id, entry.category)} style={styles.suggestion}>
                <CustomText text={entry.name} weight={FONTS.regular} size={SIZES.sm} />
                <CustomText text={entry.category} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
              </RowView>
            ))}
          </View>
        ) : null}
      </View>
      <SizedBox height={GAP} />
      <RowView align_items="flex-start" gap={SIZES.padding / 2}>
        <View style={common_styles.flex_1}>
          <InputField variant="form" label={on_trial ? 'Price after trial' : 'Amount'} value={draft.price} onChangeText={value => onChange('price', value)} placeholder="0.00" keyboardType="decimal-pad" error={errors.price} editable={editable} />
        </View>
        <View style={styles.currency}>
          <Dropdown label="Currency" value={draft.currency} options={CURRENCIES} onChange={value => onChange('currency', value)} />
        </View>
      </RowView>
      {show_price_change ? (
        <>
          <SizedBox height={GAP} />
          <Dropdown label="Reason for price update" value={draft.price_reason} options={PRICE_REASONS} onChange={value => onChange('price_reason', value)} />
          <FieldError text={errors.price_reason} />
          {draft.price_reason !== 'Correcting a mistake' ? (
            <>
              <SizedBox height={GAP} />
              <DateField variant="form" label="Effective from" value={draft.effective_on || today} maximum={today} onChange={value => onChange('effective_on', value)} error={errors.effective_on} />
            </>
          ) : null}
          <CustomText mt={SIZES.padding3} text="Previous payment receipts stay unchanged." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </>
      ) : null}
      <SizedBox height={GAP} />
      <Dropdown label="Billing cycle" value={draft.cycle} options={CYCLES} onChange={(value: ScanCycle) => onChange('cycle', value)} />
      <SizedBox height={GAP} />
      <Dropdown label="Category" value={draft.category} options={categories} onChange={value => onChange('category', value)} />
      <SizedBox height={GAP} />
      <Dropdown label="Trial days · Optional" value={draft.trial} options={TRIAL_OPTIONS} onChange={value => onChange('trial', value)} />
      {draft.trial === 'Custom' ? (
        <>
          <SizedBox height={GAP} />
          <InputField variant="form" label="Custom trial days" value={draft.custom_days} onChangeText={value => onChange('custom_days', value.replace(/\D/g, '').slice(0, 3))} placeholder="e.g. 21" keyboardType="number-pad" error={errors.custom_days} editable={editable} />
        </>
      ) : null}
      <SizedBox height={GAP} />
      <DateField variant="form" label={`Start date  ${on_trial ? 'Required for trial' : 'Optional'}`} value={draft.start_date} onChange={value => onChange('start_date', value)} error={errors.start_date} />
      {on_trial ? (
        <>
          <CustomText mt={SIZES.padding / 2} accessibility_role="text" text={trialSummary(draft, origin, dateLabel)} weight={FONTS.regular} color={calculated ? COLORS.primary : COLORS.text_secondary} size={SIZES.sm} />
          <RowView
            justify_content="space-between"
            gap={SIZES.padding2}
            accessibilityRole="switch"
            accessibilityLabel="Renews automatically after trial"
            accessibilityState={{ checked: draft.auto_renew }}
            onPress={() => onChange('auto_renew', !draft.auto_renew)}
            style={styles.switch_row}>
            <CustomText text="Renews automatically after trial" weight={FONTS.regular} size={SIZES.sm} style={common_styles.flex_1} />
            <Icons name={draft.auto_renew ? switch_on_icon : switch_off_icon} />
          </RowView>
          <CustomText
            text={`${draft.auto_renew ? 'Tracks future renewals in Renewless.' : 'Tracks the trial end only. No renewals are projected.'} It doesn’t change your settings on the service or confirm payment.`}
            weight={FONTS.regular}
            color={COLORS.text_secondary}
            size={SIZES.sm}
          />
        </>
      ) : (
        <>
          <SizedBox height={GAP} />
          <DateField variant="form" label="Next renewal" value={draft.next_date} onChange={value => onChange('next_date', value)} error={errors.next_date} />
        </>
      )}
      <SizedBox height={GAP} />
      <InputField
        variant="form"
        label="Notes  Optional"
        value={draft.notes}
        onChangeText={value => onChange('notes', value)}
        placeholder="Anything you’d like to remember"
        multiline
        maxLength={NOTES_LIMIT}
        editable={editable}
        style={styles.notes}
      />
    </View>
  );
}
