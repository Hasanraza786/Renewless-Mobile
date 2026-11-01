import { View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { check_icon, find_icon, loop_mascot, netflix_logo, remember_icon, track_icon } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { FONTS, SIZES, colors } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { ORBIT_SIZE, styles } from './styles';

type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;
const BENEFITS = [
  { icon: find_icon, label: 'Find' },
  { icon: track_icon, label: 'Track' },
  { icon: remember_icon, label: 'Remember' },
];

export function WelcomeBody(_: Props) {
  return (
    <>
      <View style={styles.scene} accessible accessibilityLabel="An email receipt becomes an organized subscription">
        <View style={styles.orbit}>
          <Svg width={ORBIT_SIZE} height={ORBIT_SIZE}>
            <Defs>
              <RadialGradient id="orbit_wash" cx="50%" cy="50%" r="50%">
                <Stop offset="0" stopColor={colors.accent} stopOpacity={0.05} />
                <Stop offset="0.68" stopColor={colors.accent} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Circle cx={ORBIT_SIZE / 2} cy={ORBIT_SIZE / 2} r={ORBIT_SIZE / 2} fill="url(#orbit_wash)" />
          </Svg>
        </View>
        <View style={styles.receipt}>
          <View style={styles.inline}>
            <Icons name={find_icon} icon_height={SIZES.padding2} stroke={colors.text_secondary} />
            <CustomText text="YOUR INBOX" weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={BODY_LINE} style={styles.inbox_label} />
          </View>
          <CustomText text="Your monthly receipt" size={SIZES.sm} line_height={BODY_LINE} mt={SIZES.padding2} mb={SIZES.padding2} />
          <View style={styles.line} />
          <View style={[styles.line, styles.line_short]} />
          <CustomText text="$15.99" weight={FONTS.regular} size={SIZES.h3} line_height={SIZES.padding + SIZES.padding3} mt={SIZES.padding3 + SIZES.padding3 / 8} />
        </View>
        <View style={styles.found}>
          <View style={styles.logo_tile}>
            <Icons name={netflix_logo} icon_height={SIZES.padding2 * 2} icon_width={SIZES.padding2 * 2} />
          </View>
          <View style={styles.found_text}>
            <CustomText text="Netflix" size={SIZES.sm} line_height={BODY_LINE} />
            <CustomText text="Monthly · renews Oct 27" weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={BODY_LINE} mt={SIZES.padding3 / 2} />
          </View>
          <CustomText text="$15.99" weight={FONTS.regular} size={SIZES.sm} line_height={BODY_LINE} />
        </View>
        <View style={[styles.inline, styles.pill]}>
          <Icons name={check_icon} icon_height={SIZES.padding2} stroke={colors.accent} />
          <CustomText text="Renewal found" weight={FONTS.regular} color={colors.accent} size={SIZES.sm} line_height={BODY_LINE} />
        </View>
        <View style={styles.loop}>
          <Icons name={loop_mascot} icon_height={SIZES.padding * 3 - SIZES.padding3 / 4} icon_width={SIZES.padding * 3 - SIZES.padding3 / 4} />
        </View>
      </View>
      <View style={styles.intro}>
        <OnboardingTitle
          eyebrow="LESS GUESSWORK. MORE CONTROL."
          title="Know what renews."
          emphasis="Before it does."
          copy="Find subscriptions in your Gmail, understand their cost, and stay ahead of renewals."
        />
      </View>
      <View style={styles.benefits}>
        {BENEFITS.map(item => (
          <View key={item.label} style={styles.benefit}>
            <Icons name={item.icon} icon_height={SIZES.padding + SIZES.padding3 / 4} stroke={colors.accent} />
            <CustomText text={item.label} weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={SIZES.padding + SIZES.padding3 / 4} />
          </View>
        ))}
      </View>
    </>
  );
}

export function WelcomeFooter({ onboarding }: Props) {
  return (
    <>
      <View style={styles.primary}>
        <CustomButton variant="primary" text="Find my subscriptions →" onPress={() => onboarding.goTo('connectInbox')} />
      </View>
      <View style={styles.link}>
        <CustomButton variant="link" text="Already have an account? Log in" onPress={onboarding.openLogin} />
      </View>
    </>
  );
}
