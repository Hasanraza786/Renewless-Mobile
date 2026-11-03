import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { check_icon, loop_mascot } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { FONTS, SIZES, colors } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { RADAR_SIZE, styles } from './styles';

type Props = { onboarding: OnboardingController };

const STAGES = ['Finding receipts', 'Grouping subscriptions', 'Checking renewal details'];
const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;

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
    <>
      <View style={styles.radar}>
        <Svg width={RADAR_SIZE} height={RADAR_SIZE} style={styles.radar_wash}>
          <Defs>
            <RadialGradient id="radar_wash" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colors.accent} stopOpacity={0.05} />
              <Stop offset="1" stopColor={colors.accent} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={RADAR_SIZE / 2} cy={RADAR_SIZE / 2} r={RADAR_SIZE / 2} fill="url(#radar_wash)" />
        </Svg>
        <Animated.View
          style={[styles.ring, complete && styles.ring_complete, { transform: [{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }]}
        />
        <Icons name={loop_mascot} icon_height={SIZES.padding * 4 - SIZES.padding3 / 2 - SIZES.padding3 / 8} icon_width={SIZES.padding * 4 - SIZES.padding3 / 2 - SIZES.padding3 / 8} />
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
            <View key={label} style={styles.stage} accessibilityLabel={`${label}${done ? ', done' : scanning ? ', in progress' : ''}`}>
              <View style={[styles.badge, scanning && styles.badge_scanning]}>
                {done ? (
                  <Icons name={check_icon} icon_height={SIZES.padding2} icon_width={SIZES.padding2} stroke={colors.accent} />
                ) : (
                  <CustomText text={`0${index + 1}`} weight={FONTS.regular} color={scanning ? colors.accent : colors.text_secondary} size={SIZES.xs} />
                )}
              </View>
              <CustomText text={label} weight={FONTS.regular} color={done ? colors.accent : colors.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
            </View>
          );
        })}
      </View>
    </>
  );
}

export function DiscoveringFooter({ onboarding }: Props) {
  const ready = onboarding.scan_status === 'completed' && onboarding.candidates.length > 0;
  return (
    <View style={styles.primary}>
      <CustomButton variant="primary" text="Review my subscriptions →" disabled={!ready} onPress={() => onboarding.goTo('yourSubscriptions')} />
    </View>
  );
}
