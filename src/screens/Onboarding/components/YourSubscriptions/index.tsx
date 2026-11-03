import { Fragment, useEffect, useState } from 'react';
import { common_styles } from '../../../../utils/common_styles';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { check_icon, edit_icon, platform_logos } from '../../../../assets/icons';
import AppSheet from '../../../../components/AppSheet';
import CustomButton from '../../../../components/CustomButton';
import RowView from '../../../../components/RowView';
import CustomText from '../../../../components/CustomText';
import DateField from '../../../../components/DateField';
import Icons from '../../../../components/Icons';
import InfoTooltip from '../../../../components/InfoTooltip';
import InputField from '../../../../components/InputField';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import SelectField from '../../../../components/SelectField';
import SizedBox from '../../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { ScanCandidate, ScanCycle } from '../../../../types';
import { localToday } from '../../../../utils/dates';
import { dateLabel, formatTotals, moneyLabel, paidMonthlyTotals, upcomingWeek } from '../../../../utils/scan';
import type { OnboardingController } from '../../index.function';
import { RING, RING_WIDTH, styles } from './styles';

type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding * 0.9;
const CURRENCIES = ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'INR'] as const;
const CYCLES: readonly ScanCycle[] = ['Monthly', 'Quarterly', 'Yearly', 'Weekly'];

// Selected / total as a ring: mint for the selected share, sage for the rest.
function SelectionRing({ selected, total }: { selected: number; total: number }) {
  const radius = (RING - RING_WIDTH) / 2;
  const length = 2 * Math.PI * radius;
  const share = total ? selected / total : 0;
  return (
    <View style={styles.ring} accessible accessibilityRole="image" accessibilityLabel={`${selected} of ${total} subscriptions selected`}>
      <Svg width={RING} height={RING} style={styles.ring_svg}>
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
      <CustomText text={`${selected}/${total}`} weight={FONTS.regular} size={SIZES.lg} line_height={SIZES.padding * 1.1} />
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
  const valid = price_text.trim() !== '' && Number.isFinite(price) && price >= 0 && (!draft?.trial || !!draft.next_date);

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
                value={price_text}
                onChangeText={setPriceText}
                keyboardType="decimal-pad"
                error={price_text && !valid ? 'Enter an amount of 0 or more.' : undefined}
              />
            </View>
            <View style={styles.currency}>
              <SelectField label="Currency" value={draft.currency} options={CURRENCIES.includes(draft.currency as (typeof CURRENCIES)[number]) ? CURRENCIES : [draft.currency, ...CURRENCIES]} onChange={currency => setDraft({ ...draft, currency })} />
            </View>
          </RowView>

          <SizedBox height={SIZES.padding * 1.3} />

          <SelectField label="Billing cycle" value={draft.cycle} options={CYCLES} onChange={cycle => setDraft({ ...draft, cycle })} />

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
  const [card, setCard] = useState({ width: 0, height: 0 });

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

      <CustomText mt={SIZES.padding * 0.7} text={`Found in ${onboarding.inbox_email}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />

      <RowView gap={SIZES.padding2} style={styles.total} onLayout={event => setCard(event.nativeEvent.layout)}>
        <Svg style={styles.total_wash} width={card.width} height={card.height}>
          <Defs>
            <LinearGradient id="total_wash" x1="0" y1="0" x2="1" y2="0.6">
              <Stop offset="0" stopColor={COLORS.total_card} />
              <Stop offset="1" stopColor={COLORS.surface_green_end} />
            </LinearGradient>
          </Defs>
          <Rect width={card.width} height={card.height} fill="url(#total_wash)" />
        </Svg>
        <View style={common_styles.flex_1}>
          <CustomText text="Estimated monthly cost" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
          <CustomText mt={SIZES.padding * 0.35} text={formatTotals(paidMonthlyTotals(selected))} weight={FONTS.regular} size={SIZES.h3} line_height={SIZES.padding * 1.4} />
          <CustomText mt={SIZES.padding * 0.35} text="Free trials aren’t included in this total." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
        </View>
        <SelectionRing selected={selected.length} total={candidates.length} />
      </RowView>

      <RowView align_items="stretch" justify_content="space-between" gap={0} style={styles.week} accessibilityLabel="Upcoming renewals and trial endings">
        <CustomText
          weight={FONTS.regular}
          color={COLORS.text_secondary}
          size={SIZES.sm}
          line_height={BODY_LINE}
          text={
            <>
              <CustomText text={`${week.count} upcoming ${week.count === 1 ? 'renewal' : 'renewals'}`} size={SIZES.sm} line_height={BODY_LINE} />
              {' in 7 days'}
            </>
          }
        />
        <CustomText text={formatTotals(week.totals)} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} line_height={BODY_LINE} />
      </RowView>

      <RowView align_items="stretch" justify_content="space-between" gap={0} style={styles.caption}>
        <CustomText text="SUBSCRIPTIONS FOUND" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} letter_spacing={0.5} />
        <CustomText text="Review before saving" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
      </RowView>

      <View style={styles.results}>
        {candidates.map((item, index) => {
          const checked = selected_ids.includes(item.id);
          const date = `${item.trial ? 'Trial ends' : 'Renews'} ${item.next_date ? dateLabel(item.next_date) : 'Date not set'}${item.estimated ? ' · estimated' : ''}`;
          const price = `${item.trial ? 'Then ' : ''}${moneyLabel(item)} · ${item.cycle}`;
          return (
            <RowView gap={0} key={item.id} style={index < candidates.length - 1 && styles.row_divider}>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked, disabled: save_loading }}
                accessibilityLabel={`Select ${item.name}, ${date}, ${price}`}
                disabled={save_loading}
                onPress={() => onboarding.toggleCandidate(item.id)}
                style={styles.row_select}>
                <View style={[styles.checkbox, checked && styles.checkbox_checked]}>
                  {checked ? <Icons name={check_icon} icon_height={SIZES.padding * 0.7} icon_width={SIZES.padding * 0.7} stroke={COLORS.background} /> : null}
                </View>
                <View style={styles.logo_tile}>
                  <Icons name={platform_logos[item.platform_id] ?? ''} icon_height={SIZES.padding2 * 2} icon_width={SIZES.padding2 * 2} />
                </View>
                <View style={common_styles.flex_1}>
                  <CustomText text={item.name} size={SIZES.sm} line_height={BODY_LINE} />
                  <CustomText mt={SIZES.padding / 4} text={date} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
                  <CustomText mt={SIZES.padding / 4} text={price} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
                </View>
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${item.name}`} disabled={save_loading} onPress={() => onboarding.openEdit(item.id)} style={styles.edit}>
                <Icons name={edit_icon} icon_height={SIZES.padding * 0.9} icon_width={SIZES.padding * 0.9} stroke={COLORS.primary} />
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
          <CustomText text={onboarding.save_error} weight={FONTS.regular} size={SIZES.sm} line_height={BODY_LINE} />
        </View>
      ) : null}

      <SizedBox height={SIZES.padding * 1.1} />

      <CustomButton
        variant="primary"
        text={onboarding.save_loading ? 'Saving…' : `Save ${count} ${count === 1 ? 'subscription' : 'subscriptions'} →`}
        disabled={!count || onboarding.save_loading}
        busy={onboarding.save_loading}
        onPress={onboarding.save}
      />

      <SizedBox height={SIZES.padding * 0.65} />

      {count ? (
        <CustomButton variant="link" text="Add a subscription manually" onPress={onboarding.openManual} />
      ) : (
        <CustomButton variant="link" text="Continue without saving" onPress={onboarding.skipSave} />
      )}
    </Fragment>
  );
}
