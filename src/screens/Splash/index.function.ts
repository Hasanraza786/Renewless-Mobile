import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing } from 'react-native';

export const BRAND_MOTION = {
  upper_delay: 120,
  upper_duration: 700,
  lower_delay: 490,
  lower_duration: 760,
  settle_duration: 1100,
  name_delay: 850,
  tagline_delay: 1150,
  text_duration: 550,
  total_duration: 2600,
} as const;

export default function useSplash(onComplete?: () => void) {
  const [reduce_motion, setReduceMotion] = useState<boolean | null>(null);
  const upper_progress = useRef(new Animated.Value(0)).current;
  const lower_progress = useRef(new Animated.Value(0)).current;
  const settle_progress = useRef(new Animated.Value(0)).current;
  const name_progress = useRef(new Animated.Value(0)).current;
  const tagline_progress = useRef(new Animated.Value(0)).current;
  const completed = useRef(false);
  const on_complete = useRef(onComplete);
  on_complete.current = onComplete;

  useEffect(() => {
    let active = true;
    let changed = false;
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', enabled => {
      changed = true;
      if (active) setReduceMotion(enabled);
    });
    AccessibilityInfo.isReduceMotionEnabled().then(
      enabled => { if (active && !changed) setReduceMotion(enabled); },
      () => { if (active && !changed) setReduceMotion(false); },
    );
    return () => { active = false; subscription.remove(); };
  }, []);

  useEffect(() => {
    if (reduce_motion === null) return;
    const values = [upper_progress, lower_progress, settle_progress, name_progress, tagline_progress];
    const complete = () => {
      if (completed.current) return;
      completed.current = true;
      on_complete.current?.();
    };
    if (reduce_motion || completed.current) {
      values.forEach(value => value.setValue(1));
      complete();
      return;
    }
    values.forEach(value => value.setValue(0));
    const draw_easing = Easing.bezier(0.4, 0, 0.2, 1);
    const settle_easing = Easing.bezier(0.2, 0.8, 0.2, 1);
    const animate = (value: Animated.Value, delay: number, duration: number, native: boolean, easing = settle_easing) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, { toValue: 1, duration, easing, useNativeDriver: native }),
      ]);
    const animation = Animated.parallel([
      animate(upper_progress, BRAND_MOTION.upper_delay, BRAND_MOTION.upper_duration, false, draw_easing),
      animate(lower_progress, BRAND_MOTION.lower_delay, BRAND_MOTION.lower_duration, false, draw_easing),
      animate(settle_progress, 0, BRAND_MOTION.settle_duration, true),
      animate(name_progress, BRAND_MOTION.name_delay, BRAND_MOTION.text_duration, true),
      animate(tagline_progress, BRAND_MOTION.tagline_delay, BRAND_MOTION.text_duration, true, Easing.out(Easing.ease)),
      Animated.delay(BRAND_MOTION.total_duration),
    ]);
    animation.start(({ finished }) => { if (finished) complete(); });
    return () => animation.stop();
  }, [reduce_motion, upper_progress, lower_progress, settle_progress, name_progress, tagline_progress]);

  return { upper_progress, lower_progress, settle_progress, name_progress, tagline_progress };
}
