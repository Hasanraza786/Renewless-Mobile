import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, View } from 'react-native';
import { bin_danger_icon, bin_icon, chevron_up_icon, lock_icon, record_mic_icon, record_pause_icon, send_icon } from '../../../assets/icons';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import type { AiChatController } from '../index.function';
import { styles } from '../styles';

type Props = { chat: AiChatController };

export const clock = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}`;

// The live red mic blinks while recording and stays solid when paused or under Reduce Motion.
function BlinkingMic({ paused }: { paused: boolean }) {
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (paused) return blink.setValue(1);
    let loop: Animated.CompositeAnimation | null = null;
    AccessibilityInfo.isReduceMotionEnabled().then(reduce => {
      if (reduce) return;
      loop = Animated.loop(Animated.sequence([Animated.timing(blink, { toValue: 0.25, duration: 500, useNativeDriver: true }), Animated.timing(blink, { toValue: 1, duration: 500, useNativeDriver: true })]));
      loop.start();
    });
    return () => loop?.stop();
  }, [blink, paused]);
  return (
    <Animated.View style={{ opacity: blink }}>
      <Icons name={record_mic_icon} />
    </Animated.View>
  );
}

// Live input level, newest bar on the right.
function LiveWave({ levels }: { levels: number[] }) {
  return (
    <RowView gap={SIZES.padding / 10} justify_content="flex-end" style={[common_styles.flex_1, styles.live_wave]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {levels.map((level, index) => (
        <View key={index} style={[styles.live_bar, { height: `${level * 100}%` }]} />
      ))}
    </RowView>
  );
}

// While the finger is down: blinking mic, timer and a "slide to cancel" hint that follows the finger.
export function HoldBar({ chat, drag_x }: Props & { drag_x: Animated.Value }) {
  const recording = chat.recording;
  if (!recording) return null;
  const hint_shift = drag_x.interpolate({ inputRange: [-SIZES.padding * 5, 0], outputRange: [-SIZES.padding * 2.5, 0], extrapolate: 'clamp' });
  const hint_fade = drag_x.interpolate({ inputRange: [-SIZES.padding * 4, 0], outputRange: [0.2, 1], extrapolate: 'clamp' });
  return (
    <RowView gap={SIZES.padding3} style={[common_styles.flex_1, styles.recording]} accessibilityLiveRegion="polite">
      <BlinkingMic paused={false} />
      <CustomText text={clock(recording.elapsed_ms)} weight={FONTS.medium} size={SIZES.md} />
      <Animated.View style={[common_styles.flex_1, { opacity: hint_fade, transform: [{ translateX: hint_shift }] }]}>
        <CustomText text="‹  Slide to cancel" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
      </Animated.View>
    </RowView>
  );
}

// Floating lock above the held mic; it rises with the finger and closes once locked.
export function LockHint({ drag_y }: { drag_y: Animated.Value }) {
  const rise = drag_y.interpolate({ inputRange: [-SIZES.padding * 4, 0], outputRange: [-SIZES.padding * 1.5, 0], extrapolate: 'clamp' });
  const near = drag_y.interpolate({ inputRange: [-SIZES.padding * 4, 0], outputRange: [1, 0.6], extrapolate: 'clamp' });
  return (
    <Animated.View pointerEvents="none" style={[styles.lock_hint, { opacity: near, transform: [{ translateY: rise }] }]}>
      <Icons name={lock_icon} />
      <Icons name={chevron_up_icon} />
    </Animated.View>
  );
}

// Hands-free recording: timer and live wave, then Delete / Pause or Resume / Send.
export function LockedBar({ chat }: Props) {
  const recording = chat.recording;
  if (!recording) return null;
  return (
    <View style={styles.locked}>
      <RowView gap={SIZES.padding3} style={styles.recording}>
        {recording.paused ? <Icons name={record_mic_icon} /> : <BlinkingMic paused={false} />}
        <CustomText text={clock(recording.elapsed_ms)} weight={FONTS.medium} size={SIZES.md} />
        <LiveWave levels={recording.levels} />
      </RowView>
      <RowView justify_content="space-between" style={styles.locked_actions}>
        <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Delete recording" onPress={chat.cancelRecording} style={styles.icon_button}>
          <Icons name={bin_icon} />
        </RowView>
        <RowView justify_content="center" accessibilityRole="button" accessibilityLabel={recording.paused ? 'Resume recording' : 'Pause recording'} onPress={chat.toggleRecordPause} style={styles.icon_button}>
          <Icons name={recording.paused ? record_mic_icon : record_pause_icon} />
        </RowView>
        <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Send voice message" onPress={chat.finishRecording} style={[styles.icon_button, styles.send]}>
          <Icons name={send_icon} />
        </RowView>
      </RowView>
    </View>
  );
}

// Slide-to-cancel feedback: the bin pops up, the mic drops into it, then both fade away.
export function DiscardBin({ count }: { count: number }) {
  const progress = useRef(new Animated.Value(1)).current;
  const [showing, setShowing] = useState(false);
  useEffect(() => {
    if (!count) return;
    setShowing(true);
    progress.setValue(0);
    Animated.timing(progress, { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start(() => setShowing(false));
  }, [count, progress]);
  if (!showing) return null;
  const bin_scale = progress.interpolate({ inputRange: [0, 0.25, 0.8, 1], outputRange: [0.2, 1.15, 1, 0.6] });
  const opacity = progress.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 1, 1, 0] });
  const mic_drop = progress.interpolate({ inputRange: [0, 0.2, 0.6], outputRange: [-SIZES.padding * 2, -SIZES.padding * 2.5, 0], extrapolate: 'clamp' });
  const mic_fade = progress.interpolate({ inputRange: [0, 0.55, 0.65], outputRange: [1, 1, 0], extrapolate: 'clamp' });
  return (
    <Animated.View pointerEvents="none" style={[styles.discard, { opacity }]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Animated.View style={{ opacity: mic_fade, transform: [{ translateY: mic_drop }] }}>
        <Icons name={record_mic_icon} />
      </Animated.View>
      <Animated.View style={[styles.discard_bin, { transform: [{ scale: bin_scale }] }]}>
        <Icons name={bin_danger_icon} />
      </Animated.View>
    </Animated.View>
  );
}
