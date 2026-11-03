import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { check_icon, platform_logos } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import InfoTooltip from '../../../../components/InfoTooltip';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { FONTS, SIZES, colors } from '../../../../constants/theme';
import { localToday } from '../../../../utils/dates';
import {
  dayMonth,
  formatTotals,
  paidMonthlyTotals,
  priceLabel,
  upcomingWeek,
} from '../../../../utils/scan';
import type { OnboardingController } from '../../index.function';
import { styles } from './styles';

type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;

export function YourSubscriptionsBody({ onboarding }: Props) {
  const selected = onboarding.candidates.filter(item =>
    onboarding.selected_ids.includes(item.id),
  );
  const week = upcomingWeek(selected, localToday());
  const count = selected.length;
  const [card, setCard] = useState({ width: 0, height: 0 });

  return (
    <>
      <View style={styles.intro}>
        <OnboardingTitle
          eyebrow="YOUR FIRST LOOK"
          title="Small charges."
          emphasis="A clearer picture."
          copy={`We found ${onboarding.candidates.length} possible subscriptions. Review what you want to keep.`}
          title_spacing={-SIZES.padding3 / 16}
        />
      </View>
      <View
        style={styles.total}
        onLayout={event => setCard(event.nativeEvent.layout)}
      >
        <Svg style={styles.total_wash} width={card.width} height={card.height}>
          <Defs>
            <LinearGradient id="total_wash" x1="0" y1="0" x2="1" y2="0.6">
              <Stop offset="0" stopColor={colors.total_card} />
              <Stop offset="1" stopColor={colors.surface_green_end} />
            </LinearGradient>
          </Defs>
          <Rect
            width={card.width}
            height={card.height}
            fill="url(#total_wash)"
          />
        </Svg>
        <View style={styles.total_text}>
          <CustomText
            text="Estimated monthly cost"
            weight={FONTS.regular}
            color={colors.text_secondary}
            size={SIZES.sm}
            line_height={BODY_LINE}
          />
          <CustomText
            text={formatTotals(paidMonthlyTotals(selected))}
            weight={FONTS.regular}
            size={SIZES.h3}
            line_height={SIZES.padding + SIZES.padding3}
            mt={SIZES.padding3 - SIZES.padding3 / 8}
          />
          <CustomText
            text={`${count} selected · paid plans only in total`}
            weight={FONTS.regular}
            color={colors.text_secondary}
            size={SIZES.sm}
            line_height={BODY_LINE}
            mt={SIZES.padding3 + SIZES.padding3 / 8}
          />
        </View>
        <View style={styles.donut}>
          <View style={styles.donut_label}>
            <CustomText
              text={String(count)}
              weight={FONTS.regular}
              size={SIZES.lg}
              line_height={SIZES.padding + SIZES.padding3 / 4}
              align="center"
            />
            <CustomText
              text="selected"
              weight={FONTS.regular}
              color={colors.text_secondary}
              size={SIZES.sm}
              line_height={BODY_LINE}
              align="center"
              number_of_lines={1}
            />
          </View>
        </View>
      </View>
      <View style={styles.week} accessibilityLabel="Upcoming renewals">
        <CustomText
          weight={FONTS.regular}
          color={colors.text_secondary}
          size={SIZES.sm}
          line_height={BODY_LINE}
          text={
            <>
              <CustomText
                text={`${week.count} ${
                  week.count === 1 ? 'upcoming event' : 'upcoming events'
                }`}
                size={SIZES.sm}
                line_height={BODY_LINE}
              />
              {' in the next 7 days'}
            </>
          }
        />
        <CustomText
          text={formatTotals(week.totals)}
          weight={FONTS.regular}
          color={colors.accent}
          size={SIZES.sm}
          line_height={BODY_LINE}
        />
      </View>
      <View style={styles.caption}>
        <CustomText
          text="SUBSCRIPTIONS FOUND"
          weight={FONTS.regular}
          color={colors.text_secondary}
          size={SIZES.sm}
          line_height={BODY_LINE}
          style={styles.caption_label}
        />
        <CustomText
          text="Review before saving"
          weight={FONTS.regular}
          color={colors.text_secondary}
          size={SIZES.sm}
          line_height={BODY_LINE}
        />
      </View>
      <View style={styles.results}>
        {onboarding.candidates.map((item, index) => {
          const checked = onboarding.selected_ids.includes(item.id);
          const detail = item.trial
            ? `Trial ends ${dayMonth(item.trial.ends_on)} · then ${priceLabel(
                item,
              )}/month`
            : `Renews ${dayMonth(item.next_date)} · estimated`;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked }}
              accessibilityLabel={`${item.name}, ${detail}`}
              onPress={() => onboarding.toggleCandidate(item.id)}
              style={[
                styles.row,
                index < onboarding.candidates.length - 1 && styles.row_divider,
              ]}
            >
              <View
                style={[styles.checkbox, checked && styles.checkbox_checked]}
              >
                {checked ? (
                  <Icons
                    name={check_icon}
                    icon_height={SIZES.padding2 + SIZES.padding3 / 4}
                    icon_width={SIZES.padding2 + SIZES.padding3 / 4}
                    stroke={colors.on_accent}
                  />
                ) : null}
              </View>
              <View style={styles.logo_tile}>
                <Icons
                  name={platform_logos[item.platform_id] ?? ''}
                  icon_height={SIZES.padding2 * 2}
                  icon_width={SIZES.padding2 * 2}
                />
              </View>
              <View style={styles.row_text}>
                <CustomText
                  text={item.name}
                  size={SIZES.sm}
                  line_height={BODY_LINE}
                />
                <CustomText
                  text={detail}
                  weight={FONTS.regular}
                  color={colors.text_secondary}
                  size={SIZES.sm}
                  line_height={BODY_LINE}
                  mt={SIZES.padding3 / 2 + SIZES.padding3 / 8}
                />
              </View>
              <CustomText
                text={item.trial ? 'Free trial' : priceLabel(item)}
                weight={FONTS.regular}
                size={SIZES.sm}
                line_height={BODY_LINE}
              />
            </Pressable>
          );
        })}
      </View>
      <View style={styles.info}>
        <InfoTooltip
          label="How these estimates work"
          paragraphs={[
            'Costs and renewal dates are estimated from your receipts. Older emails may refer to plans you’ve already cancelled. Review each subscription before saving.',
            'Monthly cost is an estimate based on billing frequency and excludes active free trials. Trial rows show the price after trial. Upcoming events show expected charges in the next 7 days. Different currencies are shown separately, without conversion.',
          ]}
        />
      </View>
    </>
  );
}

export function YourSubscriptionsFooter({ onboarding }: Props) {
  const count = onboarding.selected_ids.length;
  return (
    <>
      <View style={styles.primary}>
        <CustomButton
          variant="primary"
          text={`Save ${count} subscriptions →`}
          disabled={!count}
          onPress={() => onboarding.goTo('saveYourFinds')}
        />
      </View>
      <View style={styles.link}>
        <CustomButton
          variant="link"
          text="Nothing looks right? Add manually"
          onPress={onboarding.openSignup}
        />
      </View>
    </>
  );
}
