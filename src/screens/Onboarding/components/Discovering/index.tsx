import { Fragment, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { check_icon } from '../../../../assets/icons';
import RowView from '../../../../components/RowView';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import Mascot from '../../../../components/Mascot';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { common_styles } from '../../../../utils/common_styles';
import type { StageProgress } from '../../../../utils/scan-progress';
import type { OnboardingController } from '../../index.function';
import { RADAR_SIZE, styles } from './styles';

type Props = { onboarding: OnboardingController };

const STAGES = ['Finding receipts', 'Grouping subscriptions', 'Checking renewal details'];

// The scan radar: a turning mint arc around the neutral Loop (still once complete or with Reduce Motion).
// Shared by onboarding's Discovering and the signed-in Gmail scan; compact on first results while older mail is read.
export function ScanRadar({ complete, reduce_motion, compact = false }: { complete: boolean; reduce_motion: boolean; compact?: boolean }) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (complete || reduce_motion) return;
    const loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [complete, reduce_motion, spin]);

  return (
    <View style={[styles.radar, compact && styles.radar_compact]}>
      {compact ? null : <Svg width={RADAR_SIZE} height={RADAR_SIZE} style={common_styles.absolute}>
        <Defs>
          <RadialGradient id="radar_wash" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={COLORS.primary} stopOpacity={0.05} />
            <Stop offset="1" stopColor={COLORS.primary} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={RADAR_SIZE / 2} cy={RADAR_SIZE / 2} r={RADAR_SIZE / 2} fill="url(#radar_wash)" />
      </Svg>}
      <Animated.View
        style={[styles.ring, compact && styles.ring_compact, complete && styles.ring_complete, { transform: [{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }]}
      />
      <Mascot expression="neutral" size={compact ? SIZES.padding * 2.2 : SIZES.padding * 4.5} label="Loop is finding subscriptions" draw={!reduce_motion} />
    </View>
  );
}


// How far the shown value may run ahead of the last real one, and how fast it reaches a newly read real value.
const TRICKLE_AHEAD = 3;
const CATCH_UP_MS = 600;

// The phone reads a long scan's percent only every few seconds, in uneven steps. Between reads the shown value keeps
// trickling at the recent speed, never more than TRICKLE_AHEAD points past the last real value and never backwards; a
// stall slows it to a stop instead of faking progress. Reduce Motion shows the real value as it comes.
// Returns the animated value (0–100, for the bar and Loop) and its whole-number percent (for the text).
export function useTrickle(real: number, reduce_motion: boolean) {
  const value = useRef(new Animated.Value(real)).current;
  const shown = useRef(real);
  const last = useRef({ real, at: Date.now(), rate: 0 });
  const [percent, setPercent] = useState(Math.floor(real));

  useEffect(() => {
    const id = value.addListener(({ value: next }) => {
      shown.current = next;
      setPercent(current => (Math.floor(next) === current ? current : Math.floor(next)));
    });
    return () => value.removeListener(id);
  }, [value]);

  useEffect(() => {
    const now = Date.now();
    const previous = last.current;
    // Points per ms since the previous read; a read without progress halves the speed.
    const rate = real > previous.real ? (real - previous.real) / Math.max(1, now - previous.at) : previous.rate / 2;
    last.current = { real, at: now, rate };
    if (reduce_motion) return value.setValue(real);
    const cap = Math.min(99, real + TRICKLE_AHEAD);
    const from = shown.current;
    const catch_up = from < real ? Animated.timing(value, { toValue: real, duration: CATCH_UP_MS, easing: Easing.out(Easing.quad), useNativeDriver: false }) : null;
    const start = Math.max(from, real);
    const trickle = rate > 0 && start < cap ? Animated.timing(value, { toValue: cap, duration: (cap - start) / (rate * 0.6), easing: Easing.out(Easing.quad), useNativeDriver: false }) : null;
    const steps = [catch_up, trickle].filter((step): step is Animated.CompositeAnimation => !!step);
    if (!steps.length) return;
    const run = Animated.sequence(steps);
    run.start();
    return () => run.stop();
  }, [real, reduce_motion, value]);

  return { value, percent };
}

// The thin mint bar under a running scan line. Between status reads it glides to the new value over glide_ms, so it
// keeps moving instead of jumping. Reduce Motion: it jumps.
export function StageBar({ fraction, label, glide_ms = 0, reduce_motion = false }: { fraction: number; label?: string; glide_ms?: number; reduce_motion?: boolean }) {
  const width = useRef(new Animated.Value(fraction)).current;

  useEffect(() => {
    if (reduce_motion || !glide_ms) return width.setValue(fraction);
    const glide = Animated.timing(width, { toValue: fraction, duration: glide_ms, easing: Easing.linear, useNativeDriver: false });
    glide.start();
    return () => glide.stop();
  }, [fraction, glide_ms, reduce_motion, width]);

  return (
    <View
      accessibilityRole={label ? 'progressbar' : undefined}
      accessibilityLabel={label}
      accessibilityValue={label ? { min: 0, max: 100, now: Math.round(fraction * 100) } : undefined}
      importantForAccessibility={label ? 'yes' : 'no-hide-descendants'}
      accessibilityElementsHidden={!label}
      style={styles.bar}>
      <Animated.View style={[styles.bar_fill, { width: width.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
    </View>
  );
}

// The background read's bar with a small Loop riding its tip (approved 25 Nov 2026, option E): the bar and Loop follow
// useTrickle's value and Loop bobs while work goes on. Reduce Motion: Loop stands still.
export function RiderBar({ value, percent, label, running, reduce_motion }: { value: Animated.Value; percent: number; label: string; running: boolean; reduce_motion: boolean }) {
  const bob = useRef(new Animated.Value(0)).current;
  const [track, setTrack] = useState(0);

  useEffect(() => {
    if (!running || reduce_motion) return bob.setValue(0);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: RIDER_BOB_MS, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: RIDER_BOB_MS, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bob, reduce_motion, running]);

  const at = value.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'], extrapolate: 'clamp' });
  // Loop's centre follows the tip, but its body never leaves the bar: at 0% and 100% it sits flush with the ends.
  const half = (RIDER_SIZE / 2 / Math.max(track, RIDER_SIZE)) * 100;
  const left = track > RIDER_SIZE ? value.interpolate({ inputRange: [0, half, 100 - half, 100], outputRange: [0, 0, track - RIDER_SIZE, track - RIDER_SIZE], extrapolate: 'clamp' }) : 0;
  return (
    <View accessibilityRole="progressbar" accessibilityLabel={label} accessibilityValue={{ min: 0, max: 100, now: percent }} onLayout={event => setTrack(event.nativeEvent.layout.width)} style={styles.rider_bar}>
      <View style={styles.bar}>
        <Animated.View style={[styles.bar_fill, { width: at }]} />
      </View>
      <Animated.View importantForAccessibility="no-hide-descendants" accessibilityElementsHidden style={[styles.rider, { left }]}>
        <Animated.View style={{ transform: [{ translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -SIZES.padding / 10] }) }] }}>
          <Mascot expression="neutral" size={RIDER_SIZE} label="" draw={false} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
const RIDER_SIZE = SIZES.padding * 0.9;
const RIDER_BOB_MS = 300;

// Numbered scan stages: done ones show a check, the running one is outlined in mint. With progress, each stage has a
// muted line (and the running one a bar); those change several times a second, so screen readers skip them.
// The running stage's bar with Loop riding its tip (scoped unlock 25 Nov 2026), trickling between status reads.
function StageRider({ fraction, label, reduce_motion }: { fraction: number; label: string; reduce_motion: boolean }) {
  const trickle = useTrickle(fraction * 100, reduce_motion);
  return (
    <View style={styles.stage_rider}>
      <RiderBar value={trickle.value} percent={trickle.percent} label={label} running reduce_motion={reduce_motion} />
    </View>
  );
}

export function ScanStages({ labels, done_count, running, progress, reduce_motion }: { labels: readonly string[]; done_count: number; running: boolean; progress?: StageProgress; reduce_motion?: boolean }) {
  return (
    <View style={styles.stages}>
      {labels.map((label, index) => {
        const done = index < done_count;
        const scanning = index === done_count && running;
        const line = progress?.lines[index] ?? '';
        return (
          <RowView gap={SIZES.padding * 0.7} key={label} style={styles.stage} accessibilityLabel={`${label}${done ? ', done' : scanning ? ', in progress' : ''}`}>
            <View style={[styles.badge, scanning && styles.badge_scanning]}>
              {done ? (
                <Icons name={check_icon} />
              ) : (
                <CustomText text={`0${index + 1}`} weight={FONTS.regular} color={scanning ? COLORS.primary : COLORS.text_secondary} size={SIZES.sm} />
              )}
            </View>
            <View style={common_styles.flex_1}>
              <CustomText text={label} weight={FONTS.regular} color={done ? COLORS.primary : COLORS.text_secondary} size={SIZES.sm} />
              {line ? (
                <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                  <CustomText mt={SIZES.padding / 5} text={line} weight={FONTS.regular} color={COLORS.text_dim} size={SIZES.sm} />
                  {progress?.bar?.index === index ? <StageRider fraction={progress.bar.fraction} label={label} reduce_motion={!!reduce_motion} /> : null}
                </View>
              ) : null}
            </View>
          </RowView>
        );
      })}
    </View>
  );
}

// The status line under the stages: polite, so it speaks only when the phrase changes (iOS has no live regions).
export function ScanStatusLine({ text }: { text: string }) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (Platform.OS === 'ios') AccessibilityInfo.announceForAccessibility(text);
  }, [text]);
  return (
    <View accessibilityLiveRegion="polite">
      <CustomText text={text} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" mt={SIZES.padding} />
    </View>
  );
}

export function DiscoveringBody({ onboarding }: Props) {
  return (
    <Fragment>
      <ScanRadar complete={onboarding.scan_status === 'completed'} reduce_motion={onboarding.reduce_motion} />

      <OnboardingTitle
        eyebrow="A LITTLE CLARITY IS ON ITS WAY"
        title="Connecting the dots."
        copy="Turning your receipts into a clearer picture of your subscriptions."
      />

      <ScanStages labels={STAGES} done_count={onboarding.scan_stages} running={onboarding.scan_status === 'running'} progress={onboarding.scan_progress} reduce_motion={onboarding.reduce_motion} />
    </Fragment>
  );
}

export function DiscoveringFooter({ onboarding }: Props) {
  return <ScanStatusLine text={onboarding.scan_progress.status} />;
}
