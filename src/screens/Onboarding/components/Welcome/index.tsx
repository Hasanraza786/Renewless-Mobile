import { View } from 'react-native';
import { common_styles } from '../../../../utils/common_styles';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { check_icon, find_grey_icon, find_icon, loop_mascot, netflix_logo, remember_icon, track_icon } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { ORBIT_SIZE, styles } from './styles';
import { Fragment } from 'react';
import SizedBox from '../../../../components/SizedBox';
import RowView from '../../../../components/RowView';

type Props = { onboarding: OnboardingController };

const BENEFITS = [
  { icon: find_icon, label: 'Find' },
  { icon: track_icon, label: 'Track' },
  { icon: remember_icon, label: 'Remember' },
];

export function WelcomeBody(_: Props) {
  return (
    <Fragment>
      <View style={styles.scene} accessible accessibilityLabel="An email receipt becomes an organized subscription">
        <View style={styles.orbit}>
          <Svg width={ORBIT_SIZE} height={ORBIT_SIZE}>
            <Defs>
              <RadialGradient id="orbit_wash" cx="50%" cy="50%" r="50%">
                <Stop offset="0" stopColor={COLORS.primary} stopOpacity={0.05} />
                <Stop offset="0.68" stopColor={COLORS.primary} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Circle cx={ORBIT_SIZE / 2} cy={ORBIT_SIZE / 2} r={ORBIT_SIZE / 2} fill="url(#orbit_wash)" />
          </Svg>
        </View>
        <View style={styles.receipt}>
          <RowView gap={SIZES.padding3}>
            <Icons name={find_grey_icon} />
            <CustomText text="YOUR INBOX" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} letter_spacing={1} />
          </RowView>
          <CustomText mt={SIZES.padding2} text="Your monthly receipt" size={SIZES.sm} mb={SIZES.padding2} />
          <View style={styles.line} />
          <View style={[styles.line, styles.line_short]} />
          <CustomText mt={SIZES.padding * 0.45} text="$15.99" weight={FONTS.regular} size={SIZES.h3} />
        </View>
        <RowView gap={SIZES.padding * 0.55} style={styles.found}>
          <View style={styles.logo_tile}>
            <Icons name={netflix_logo} />
          </View>
          <View style={common_styles.flex_1}>
            <CustomText text="Netflix" size={SIZES.sm} />
            <CustomText mt={SIZES.padding3 / 2} text="Monthly · renews Oct 27" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </View>
          <CustomText text="$15.99" weight={FONTS.regular} size={SIZES.sm} />
        </RowView>
        <RowView gap={SIZES.padding3} style={styles.pill}>
          <Icons name={check_icon} />
          <CustomText text="Renewal found" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </RowView>
        <View style={styles.loop}>
          <Icons name={loop_mascot} />
        </View>
      </View>

      <SizedBox />

      <OnboardingTitle
        eyebrow="LESS GUESSWORK. MORE CONTROL."
        title="Know what renews."
        emphasis="Before it does."
        copy="Find subscriptions in your Gmail, understand their cost, and stay ahead of renewals."
      />

      <SizedBox />

      <RowView justify_content='space-between'>
        {BENEFITS.map(item => (
          <RowView key={item.label} style={styles.benefit_row}>
            <Icons name={item.icon} />
            <CustomText text={item.label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={SIZES.padding * 1.1} />
          </RowView>
        ))}
      </RowView>
    </Fragment>
  );
}

export function WelcomeFooter({ onboarding }: Props) {
  return (
    <Fragment>
      <SizedBox height={SIZES.padding2} />

      <CustomButton variant="primary" text="Find my subscriptions →" onPress={() => onboarding.goTo('connectInbox')} />

      <SizedBox height={SIZES.padding2} />

      <CustomButton variant="link" text="Already have an account? Log in" onPress={onboarding.openLogin} />
    </Fragment>
  );
}
