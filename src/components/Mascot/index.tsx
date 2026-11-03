import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';
import { LOOP_FACES, LOOP_OUTLINE, LOOP_OUTLINE_LENGTH } from '../../assets/icons';
import { COLORS, SIZES } from '../../constants/theme';

type Props = {
  expression: keyof typeof LOOP_FACES;
  size: number;
  label: string;
  // Draw-in entrance: the outline draws over 800 ms, the face appears at 650 ms, then a small settle.
  draw?: boolean;
};

const AnimatedPath = Animated.createAnimatedComponent(Path);
const SETTLE = -SIZES.padding * 0.15;

function Face({ expression, size }: Pick<Props, 'expression' | 'size'>) {
  const face: { eyes: readonly { cx: number; cy: number; rx: number; ry: number }[]; mouth?: { d: string; width: number } } = LOOP_FACES[expression];
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none">
      {face.eyes.map(eye => <Ellipse key={eye.cx} {...eye} fill={COLORS.primary} />)}
      {face.mouth ? <Path d={face.mouth.d} stroke={COLORS.primary} strokeWidth={face.mouth.width} strokeLinecap="round" /> : null}
    </Svg>
  );
}

export default function Mascot({ expression, size, label, draw }: Props) {
  const outline = useRef(new Animated.Value(draw ? LOOP_OUTLINE_LENGTH : 0)).current;
  const face = useRef(new Animated.Value(draw ? 0 : 1)).current;
  const settle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!draw) return;
    const run = Animated.parallel([
      Animated.timing(outline, { toValue: 0, duration: 800, easing: Easing.out(Easing.ease), useNativeDriver: false }),
      Animated.timing(face, { toValue: 1, duration: 250, delay: 650, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(settle, { toValue: 1, duration: 300, delay: 850, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]);
    run.start();
    return () => run.stop();
  }, [draw, face, outline, settle]);

  return (
    <Animated.View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={{ width: size, height: size, transform: [{ translateY: settle.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, SETTLE, 0] }) }] }}>
      <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none">
        <AnimatedPath
          d={LOOP_OUTLINE}
          stroke={COLORS.primary}
          strokeWidth={58}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={[LOOP_OUTLINE_LENGTH, LOOP_OUTLINE_LENGTH]}
          strokeDashoffset={outline}
        />
      </Svg>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: face, transform: [{ scale: face.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] }]}>
        <Face expression={expression} size={size} />
      </Animated.View>
    </Animated.View>
  );
}

