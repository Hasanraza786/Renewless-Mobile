import { Pressable, View } from 'react-native';
import { apple_icon, check_icon, google_icon, logo_mark } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { FONTS, SIZES, colors } from '../../../../constants/theme';
import { formatTotals, paidMonthlyTotals } from '../../../../utils/scan';
import type { OnboardingController } from '../../index.function';
import { styles } from './styles';

type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;

export function SaveYourFindsBody({ onboarding }: Props) {
  const selected = onboarding.candidates.filter(item => onboarding.selected_ids.includes(item.id));
  return (
    <>
      <View style={styles.art}>
        <Icons name={logo_mark} icon_height={SIZES.padding2 * 2 + SIZES.padding3} icon_width={SIZES.padding2 * 2 + SIZES.padding3} />
        <View style={styles.check}>
          <Icons name={check_icon} icon_height={SIZES.padding2} icon_width={SIZES.padding2} stroke={colors.on_accent} />
        </View>
      </View>
      <OnboardingTitle
        eyebrow="MAKE IT YOURS"
        title="Keep what"
        emphasis="you found."
        copy="Save your subscriptions and get reminded before they renew."
        title_spacing={-SIZES.padding3 / 16}
      />
      <View style={styles.summary}>
        <CustomText text={`${selected.length} ${selected.length === 1 ? 'subscription' : 'subscriptions'} selected`} weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
        <CustomText
          size={SIZES.h3}
          line_height={SIZES.padding + SIZES.padding3}
          mt={SIZES.padding3 - SIZES.padding3 / 8}
          text={
            <>
              {formatTotals(paidMonthlyTotals(selected))}
              <CustomText text=" estimated/month" weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} />
            </>
          }
        />
      </View>
      <CustomText text="Free to save. No payment required." weight={FONTS.regular} color={colors.accent} size={SIZES.sm} line_height={BODY_LINE} mt={SIZES.padding3 * 2} />
      <CustomText text="Create an account or sign in to keep your subscriptions." weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={BODY_LINE} mt={SIZES.padding3 + SIZES.padding3 / 4} />
    </>
  );
}

export function SaveYourFindsFooter({ onboarding }: Props) {
  return (
    <View style={styles.footer}>
      <CustomButton variant="social" icon={google_icon} text="Continue with Google" loading={onboarding.save_loading} onPress={() => onboarding.saveWith('google')} />
      <View style={styles.gap}>
        <CustomButton variant="social" icon={apple_icon} text="Continue with Apple" loading={onboarding.save_loading} onPress={() => onboarding.saveWith('apple')} />
      </View>
      {onboarding.save_error ? (
        <CustomText text={onboarding.save_error} weight={FONTS.regular} color={colors.expired} size={SIZES.sm} line_height={BODY_LINE} align="center" mt={SIZES.padding3} />
      ) : null}
      <Pressable accessibilityRole="button" onPress={onboarding.openSignup} style={styles.email}>
        <CustomText text="Continue with email" weight={FONTS.regular} size={SIZES.sm} line_height={BODY_LINE} align="center" />
      </Pressable>
      <View style={styles.legal}>
        {['Terms', 'Privacy'].map((label, index) => (
          <View key={label} style={styles.legal_item}>
            {index ? <CustomText text="·" weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} /> : null}
            <Pressable accessibilityRole="link" onPress={onboarding.openLegal} style={styles.legal_link}>
              <CustomText text={label} weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={BODY_LINE} decoration="underline" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
