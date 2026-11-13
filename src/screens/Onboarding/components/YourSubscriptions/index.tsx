import PlatformLogo from '../../../../components/PlatformLogo';
import { Fragment, useEffect, useState } from 'react';
import { common_styles } from '../../../../utils/common_styles';
import { Pressable, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { check_dark_icon, edit_icon } from '../../../../assets/icons';
import AppSheet from '../../../../components/AppSheet';
import AddChoiceLinks from '../../../../components/AddChoiceLinks';
import CustomButton from '../../../../components/CustomButton';
import RowView from '../../../../components/RowView';
import CustomText from '../../../../components/CustomText';
import DateField from '../../../../components/DateField';
import Icons from '../../../../components/Icons';
import InfoTooltip from '../../../../components/InfoTooltip';
import InputField from '../../../../components/InputField';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import Dropdown from '../../../../components/Dropdown';
import SizedBox from '../../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { ScanCandidate, ScanCycle } from '../../../../types';
import { localToday } from '../../../../utils/dates';
import { dateLabel, formatTotals, moneyLabel, paidMonthlyTotals, upcomingWeek } from '../../../../utils/scan';
import type { OnboardingController } from '../../index.function';
import { RING, RING_WIDTH, styles } from './styles';
import { CURRENCIES, CURRENCY_NAMES, CURRENCY_SEARCH } from '../../../../utils/money';
import { AMOUNT_ERROR, isValidAmount } from '../../../../utils/subscription-form';

type Props = { onboarding: OnboardingController };

const CYCLES: readonly ScanCycle[] = ['Monthly', 'Quarterly', 'Yearly', 'Weekly'];

// Selected / total as a ring: mint for the selected share, sage for the rest. Also used by the Gmail review.
export function SelectionRing({ selected, total }: { selected: number; total: number }) {
  const radius = (RING - RING_WIDTH) / 2;
  const length = 2 * Math.PI * radius;
  const share = total ? selected / total : 0;
  return (
    <View style={styles.ring} accessible accessibilityRole="image" accessibilityLabel={`${selected} of ${total} subscriptions selected`}>
      <Svg width={RING} height={RING} style={common_styles.absolute}>
        <Circle cx={RING / 2} cy={RING / 2} r={radius} stroke={COLORS.donut_mid} strokeWidth={RING_WIDTH} fill={COLORS.card} />
        {share > 0 ? (
          <Circle
            cx={RING / 2}
            cy={RING / 2}
            r={radius}
            stroke={COLORS.primary}
            strokeWidth={RING_WIDTH}
            fill="none"
            strokeDasharray={[length * share, length]}
            transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
          />
        ) : null}
      </Svg>
      <CustomText text={`${selected}/${total}`} weight={FONTS.regular} size={SIZES.lg} />
    </View>
  );
}

function EditSheet({ onboarding }: Props) {
  const item = onboarding.editing;
  const [draft, setDraft] = useState<ScanCandidate | undefined>(item);
  const [price_text, setPriceText] = useState('');

  // The last draft stays rendered while the sheet fades out.
  useEffect(() => {
    if (!item) return;
    setDraft(item);
    setPriceText(item.price);
  }, [item]);

  const price = Number(price_text);
  const valid = isValidAmount(price_text) && (!draft?.trial || !!draft.next_date);

  const submit = () => {
    if (!item || !draft || !valid) return;
    // A changed date counts as reviewed; an amount-only edit keeps the date's confidence.
    onboarding.saveEdit({ ...draft, price: price.toFixed(2), estimated: draft.next_date === item.next_date ? item.estimated : false });
  };

  return (
    <AppSheet visible={!!item} title={draft ? `Review ${draft.name}` : ''} subtitle="Changes apply when you save your subscriptions." onClose={onboarding.closeEdit}>
      {draft ? (
        <Fragment>
          <RowView align_items="stretch" gap={SIZES.padding / 2}>
            <View style={common_styles.flex_1}>
              <InputField
                variant="sheet"
                label={draft.trial ? 'Price after trial' : 'Amount'}
                placeholder="0.00"
                value={price_text}
                onChangeText={setPriceText}
                keyboardType="decimal-pad"
                error={price_text && !isValidAmount(price_text) ? AMOUNT_ERROR : onboarding.edit_error || undefined}
              />
            </View>
            <View style={styles.currency}>
              <Dropdown label="Currency" value={draft.currency} options={CURRENCIES.includes(draft.currency) ? CURRENCIES : [draft.currency, ...CURRENCIES]} option_details={CURRENCY_NAMES} search={CURRENCY_SEARCH} onChange={currency => setDraft({ ...draft, currency })} />
            </View>
          </RowView>

          <SizedBox height={SIZES.padding * 1.3} />

          <Dropdown label="Billing cycle" value={draft.cycle} options={CYCLES} onChange={cycle => setDraft({ ...draft, cycle })} />

          <SizedBox height={SIZES.padding * 1.3} />

          <DateField label={draft.trial ? 'Trial end' : 'Next renewal · Optional'} value={draft.next_date} onChange={next_date => setDraft({ ...draft, next_date })} />

          <SizedBox height={SIZES.padding2} />

          <CustomButton variant="primary" style={styles.sheet_button} text="Update details" disabled={!valid} onPress={submit} />
        </Fragment>
      ) : null}
    </AppSheet>
  );
}

export function YourSubscriptionsBody({ onboarding }: Props) {
  const { candidates, selected_ids, save_loading } = onboarding;
  const selected = candidates.filter(item => selected_ids.includes(item.id));
  const week = upcomingWeek(selected, localToday());

  return (
    <Fragment>
      <SizedBox height={SIZES.padding3 / 2} />

      <OnboardingTitle
        eyebrow="YOUR FIRST LOOK"
        title="Your subscriptions,"
        emphasis="in one place."
        copy={`We found ${candidates.length} possible subscriptions. Choose the ones you want to track.`}
        title_spacing={-0.5}
      />

      <CustomText mt={SIZES.padding * 0.7} text={`Found in ${onboarding.inbox_email}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />

      <RowView gap={SIZES.padding2} style={styles.total}>
        <View style={common_styles.flex_1}>
          <CustomText text="Estimated monthly cost" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <CustomText mt={SIZES.padding * 0.35} text={formatTotals(paidMonthlyTotals(selected))} weight={FONTS.regular} size={SIZES.h3} />
          <CustomText mt={SIZES.padding * 0.35} text="Free trials aren’t included in this total." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
        <SelectionRing selected={selected.length} total={candidates.length} />
      </RowView>

      <RowView align_items="stretch" justify_content="space-between" gap={0} style={styles.week} accessibilityLabel="Upcoming renewals and trial endings">
        <CustomText
          weight={FONTS.regular}
          color={COLORS.text_secondary}
          size={SIZES.sm}
          text={
            <>
              <CustomText text={`${week.count} upcoming ${week.count === 1 ? 'renewal' : 'renewals'}`} size={SIZES.sm} />
              {' in 7 days'}
            </>
          }
        />
        <CustomText text={formatTotals(week.totals)} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
      </RowView>

      <RowView align_items="stretch" justify_content="space-between" gap={0} style={styles.caption}>
        <CustomText text="SUBSCRIPTIONS FOUND" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} letter_spacing={0.5} />
        <CustomText text="Review before saving" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </RowView>

      <View style={styles.results}>
        {candidates.map((item, index) => {
          const checked = selected_ids.includes(item.id);
          const date = `${item.trial ? 'Trial ends' : 'Renews'} ${item.next_date ? dateLabel(item.next_date) : 'Date not set'}${item.estimated ? ' · estimated' : ''}`;
          const price = `${item.trial ? 'Then ' : ''}${moneyLabel(item)} · ${item.cycle}`;
          return (
            <RowView gap={0} key={item.id} style={index < candidates.length - 1 && styles.row_divider}>
              <RowView gap={SIZES.padding * 0.45}
                accessibilityRole="checkbox"
                accessibilityState={{ checked, disabled: save_loading }}
                accessibilityLabel={`Select ${item.name}, ${date}, ${price}`}
                disabled={save_loading}
                onPress={() => onboarding.toggleCandidate(item.id)}
                style={styles.row_select}>
                <View style={[styles.checkbox, checked && styles.checkbox_checked]}>
                  {checked ? <Icons name={check_dark_icon} /> : null}
                </View>
                <View style={styles.logo_tile}>
                  <PlatformLogo platform_id={item.platform_id} name={item.name} />
                </View>
                <View style={common_styles.flex_1}>
                  <CustomText text={item.name} size={SIZES.sm} />
                  <CustomText mt={SIZES.padding / 4} text={date} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                  <CustomText mt={SIZES.padding / 4} text={price} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                </View>
              </RowView>
              <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${item.name}`} disabled={save_loading} onPress={() => onboarding.openEdit(item.id)} style={styles.edit}>
                <Icons name={edit_icon} />
              </Pressable>
            </RowView>
          );
        })}
      </View>

      <SizedBox height={SIZES.padding2} />

      <InfoTooltip
        label="How these estimates work"
        paragraphs={[
          'Receipts may refer to older or cancelled plans. Review each subscription before saving. You can correct the amount and date with Edit.',
          'Monthly cost averages paid billing cycles and excludes active free trials. Trial rows show the price after trial. Upcoming expected charges cover today and the next 6 calendar days. Currencies stay separate without conversion.',
        ]}
      />
      <EditSheet onboarding={onboarding} />
    </Fragment>
  );
}

export function YourSubscriptionsFooter({ onboarding }: Props) {
  const count = onboarding.selected_ids.length;
  return (
    <Fragment>
      {onboarding.save_error ? (
        <View accessibilityRole="alert" style={styles.save_error}>
          <CustomText text={onboarding.save_error} weight={FONTS.regular} size={SIZES.sm} />
        </View>
      ) : null}

      <SizedBox height={SIZES.padding * 1.1} />

      <CustomButton
        variant="primary"
        text={onboarding.save_loading ? 'Saving…' : count ? `Save ${count} ${count === 1 ? 'subscription' : 'subscriptions'} →` : 'Select subscriptions to save'}
        disabled={!count || onboarding.save_loading}
        busy={onboarding.save_loading}
        onPress={onboarding.save}
      />

      <SizedBox height={SIZES.padding * 0.65} />

      {count ? (
        <AddChoiceLinks onAi={onboarding.openAi} onManual={onboarding.openManual} />
      ) : (
        <CustomButton variant="link" text="Continue without saving" onPress={onboarding.skipSave} />
      )}
    </Fragment>
  );
}
