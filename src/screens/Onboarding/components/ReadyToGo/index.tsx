import { Fragment, useEffect, useRef } from 'react';
import { common_styles } from '../../../../utils/common_styles';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { check_dark_icon, party_popper_icon, platform_logos } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import RowView from '../../../../components/RowView';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import Mascot from '../../../../components/Mascot';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import SizedBox from '../../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { localToday } from '../../../../utils/dates';
import { dateLabel, formatTotals, moneyLabel, nextEvent, paidMonthlyTotals } from '../../../../utils/scan';
import type { OnboardingController } from '../../index.function';
import { HALO_SIZE, styles } from './styles';

type Props = { onboarding: OnboardingController };

export function ReadyToGoBody({ onboarding }: Props) {
  const saved = onboarding.saved;
  const next = nextEvent(saved, localToday());
  const mascot = useRef(new Animated.Value(onboarding.reduce_motion ? 1 : 0)).current;
  const badge = useRef(new Animated.Value(onboarding.reduce_motion ? 1 : 0)).current;

  useEffect(() => {
    if (onboarding.reduce_motion) return;
    Animated.parallel([
      Animated.timing(mascot, { toValue: 1, duration: 800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(badge, { toValue: 1, duration: 400, delay: 450, easing: Easing.ease, useNativeDriver: true }),
    ]).start();
  }, [badge, mascot, onboarding.reduce_motion]);

  return (
    <Fragment>
      <View style={styles.celebration}>
        <View style={styles.halo}>
          <Svg width={HALO_SIZE} height={HALO_SIZE}>
            <Defs>
              <RadialGradient id="ready_halo" cx="50%" cy="50%" r="50%">
                <Stop offset="0" stopColor={COLORS.primary} stopOpacity={0.08} />
                <Stop offset="0.7" stopColor={COLORS.primary} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Circle cx={HALO_SIZE / 2} cy={HALO_SIZE / 2} r={HALO_SIZE / 2} fill="url(#ready_halo)" />
          </Svg>
        </View>
        <Animated.View
          style={[common_styles.absolute, {
            opacity: mascot.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 1, 1] }),
            transform: [
              { translateY: mascot.interpolate({ inputRange: [0, 0.6, 1], outputRange: [SIZES.padding * 0.45, -SIZES.padding / 4, 0] }) },
              { scale: mascot.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0.92, 1.03, 1] }) },
            ],
          }]}>
          <Mascot expression="happy" size={SIZES.padding * 6} label="Loop celebrates your saved subscriptions" draw={!onboarding.reduce_motion} />
        </Animated.View>
        <Animated.View
          style={[styles.badge, {
            opacity: badge,
            transform: [
              { translateY: badge.interpolate({ inputRange: [0, 1], outputRange: [SIZES.padding * 0.9, 0] }) },
              { scale: badge.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) },
            ],
          }]}>
          <Icons name={check_dark_icon} icon_height={SIZES.padding * 0.9} icon_width={SIZES.padding * 0.9} />
        </Animated.View>
      </View>

      <OnboardingTitle
        eyebrow="A LITTLE LESS TO REMEMBER"
        title={onboarding.first_name ? 'You’re all set,' : 'You’re all set.'}
        emphasis={onboarding.first_name ? `${onboarding.first_name}.` : undefined}
        copy="Your subscriptions are together. Your next renewal is easier to keep track of."
        align="center"
      />

      <SizedBox />

      <RowView align_items="stretch" gap={SIZES.padding2} style={styles.summary}>
        <View style={common_styles.flex_1}>
          <CustomText text={String(saved.length)} size={SIZES.h3} />
          <CustomText mt={SIZES.padding3} text={saved.length === 1 ? 'subscription saved' : 'subscriptions saved'} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
        <View style={[common_styles.flex_1, styles.summary_wide]}>
          <CustomText text={formatTotals(paidMonthlyTotals(saved))} size={SIZES.h3} />
          <CustomText mt={SIZES.padding3} text="Estimated monthly cost" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
      </RowView>
      {next ? (
        <RowView gap={SIZES.padding2} style={styles.next}>
          <View style={styles.logo_tile}>
            <Icons name={platform_logos[next.platform_id] ?? ''} />
          </View>
          <View>
            <CustomText text={next.trial ? 'NEXT TRIAL ENDING' : next.estimated ? 'NEXT ESTIMATED RENEWAL' : 'NEXT RENEWAL'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} letter_spacing={0.8} />
            <CustomText mt={SIZES.padding / 4} text={next.name} size={SIZES.sm} />
            <CustomText mt={SIZES.padding / 4} text={`${dateLabel(next.next_date!)} · ${moneyLabel(next)}${next.trial ? ' after trial' : ''}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </View>
        </RowView>
      ) : (
        <CustomText mt={SIZES.padding2} text="Add a renewal date to see what’s coming next." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
      )}

      <CustomText mt={SIZES.padding2} text="Set reminders and stay ahead of your next renewal." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
    </Fragment>
  );
}

export function ReadyToGoFooter({ onboarding }: Props) {
  return (
    <Fragment>
      <SizedBox height={SIZES.padding * 1.1} />
      <CustomButton variant="primary" text="Go to my dashboard →" onPress={onboarding.openDashboard} />
    </Fragment>
  );
}

// Prototype confetti, piece by piece: 60 pieces from the two lower corners, then two poppers. Values are
// animation distances/times from the approved CSS formula, not layout sizes.
const CONFETTI_COLORS = [COLORS.primary, COLORS.text_primary, COLORS.donut_end, COLORS.renewing_soon];
const PIECES = Array.from({ length: 60 }, (_, i) => ({
  right: i % 2 === 1,
  round: (i + 1) % 3 === 0,
  color: CONFETTI_COLORS[i % 4],
  delay: 420 + Math.floor(i / 2) * 9,
  travel: 440 + (i * 31) % 190,
  spread: 35 + (i * 23) % 230,
  turn: 180 + (i * 53) % 540,
}));
const BURST_MS = 3200;
const POPPER_MS = 4000;

export function ReadyConfetti() {
  const clock = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const run = Animated.timing(clock, { toValue: POPPER_MS, duration: POPPER_MS, easing: Easing.linear, useNativeDriver: true });
    run.start();
    return () => run.stop();
  }, [clock]);

  const at = (delay: number, fractions: number[], values: number[] | string[]) =>
    clock.interpolate({ inputRange: fractions.map(f => delay + f * BURST_MS), outputRange: values as number[], extrapolate: 'clamp' });
  const STOPS = [0, 0.03, 0.25, 0.5, 0.75, 1];
  const popper = (values: number[]) =>
    clock.interpolate({ inputRange: [0, 360, 480, 720, 3120, 4000], outputRange: values, extrapolate: 'clamp' });

  return (
    <View pointerEvents="none" style={styles.confetti}>
      {PIECES.map((piece, index) => {
        const x = piece.right ? -piece.spread : piece.spread;
        return (
          <Animated.View
            key={index}
            style={[styles.piece, piece.right ? styles.piece_right : styles.piece_left, piece.round && styles.piece_round, {
              backgroundColor: piece.color,
              opacity: at(piece.delay, STOPS, [0, 1, 1, 1, 0.85, 0]),
              transform: [
                { translateX: at(piece.delay, STOPS, [0, x * 0.1, x * 0.6, x, x * 1.15, x * 1.25]) },
                { translateY: at(piece.delay, STOPS, [0, -piece.travel * 0.16, -piece.travel * 0.8, -piece.travel, -piece.travel * 0.87, -piece.travel * 0.45]) },
                { rotate: at(piece.delay, STOPS, ['0deg', '30deg', `${piece.turn * 0.4}deg`, `${piece.turn * 0.65}deg`, `${piece.turn * 0.85}deg`, `${piece.turn}deg`]) },
              ],
            }]}
          />
        );
      })}
      {[1, -1].map(flip => (
        <Animated.View
          key={flip}
          style={[styles.popper, flip === 1 ? styles.popper_left : styles.popper_right, {
            opacity: popper([0, 1, 1, 1, 1, 0]),
            transform: [
              { translateY: popper([36, 0, 5, 0, 0, 25]) },
              { scaleX: flip },
              { scale: popper([0.65, 1.1, 0.9, 1, 1, 0.85]) },
              { rotate: clock.interpolate({ inputRange: [0, 360, 480, 720], outputRange: ['-18deg', '8deg', '-7deg', '0deg'], extrapolate: 'clamp' }) },
            ],
          }]}>
          <Icons name={party_popper_icon} />
        </Animated.View>
      ))}
    </View>
  );
}
