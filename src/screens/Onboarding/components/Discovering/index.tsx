import { Fragment, useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { check_icon } from '../../../../assets/icons';
import RowView from '../../../../components/RowView';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import Mascot from '../../../../components/Mascot';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { common_styles } from '../../../../utils/common_styles';
import type { OnboardingController } from '../../index.function';
import { RADAR_SIZE, styles } from './styles';

type Props = { onboarding: OnboardingController };

const STAGES = ['Finding receipts', 'Grouping subscriptions', 'Checking renewal details'];

export function DiscoveringBody({ onboarding }: Props) {
  const complete = onboarding.scan_status === 'completed';
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (complete || onboarding.reduce_motion) return;
    const loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [complete, onboarding.reduce_motion, spin]);

  return (
    <Fragment>
      <View style={styles.radar}>
        <Svg width={RADAR_SIZE} height={RADAR_SIZE} style={common_styles.absolute}>
          <Defs>
            <RadialGradient id="radar_wash" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={COLORS.primary} stopOpacity={0.05} />
              <Stop offset="1" stopColor={COLORS.primary} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={RADAR_SIZE / 2} cy={RADAR_SIZE / 2} r={RADAR_SIZE / 2} fill="url(#radar_wash)" />
        </Svg>
        <Animated.View
          style={[styles.ring, complete && styles.ring_complete, { transform: [{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }]}
        />
        <Mascot expression="neutral" size={SIZES.padding * 4.5} label="Loop is finding subscriptions" draw={!onboarding.reduce_motion} />
      </View>

      <OnboardingTitle
        eyebrow="A LITTLE CLARITY IS ON ITS WAY"
        title="Connecting the dots."
        copy="Turning your receipts into a clearer picture of your subscriptions."
      />

      <View accessibilityLiveRegion="polite" style={styles.stages}>
        {STAGES.map((label, index) => {
          const done = index < onboarding.scan_stages;
          const scanning = index === onboarding.scan_stages && onboarding.scan_status === 'running';
          return (
            <RowView gap={SIZES.padding * 0.7} key={label} style={styles.stage} accessibilityLabel={`${label}${done ? ', done' : scanning ? ', in progress' : ''}`}>
              <View style={[styles.badge, scanning && styles.badge_scanning]}>
                {done ? (
                  <Icons name={check_icon} />
                ) : (
                  <CustomText text={`0${index + 1}`} weight={FONTS.regular} color={scanning ? COLORS.primary : COLORS.text_secondary} size={SIZES.sm} />
                )}
              </View>
              <CustomText text={label} weight={FONTS.regular} color={done ? COLORS.primary : COLORS.text_secondary} size={SIZES.sm} />
            </RowView>
          );
        })}
      </View>
    </Fragment>
  );
}

export function DiscoveringFooter({ onboarding }: Props) {
  return (
    <CustomText
      text={onboarding.scan_status === 'completed' ? 'Your results are ready.' : 'This may take a moment.'}
      weight={FONTS.regular}
      color={COLORS.text_secondary}
      size={SIZES.sm}
      align="center"
      mt={SIZES.padding}
    />
  );
}
