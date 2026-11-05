import { useEffect, useRef } from 'react';
import { Animated, Easing, View, type DimensionValue } from 'react-native';
import RowView from '../../../components/RowView';
import { SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import { styles } from '../styles';

const Block = ({ width, height, radius = SIZES.padding * 0.3 }: { width: DimensionValue; height: number; radius?: number }) => (
  <View style={[styles.sk_block, { width, height, borderRadius: radius }]} />
);

function Row({ divided }: { divided?: boolean }) {
  return (
    <RowView gap={SIZES.padding * 0.55} style={[styles.sk_row, divided && styles.sk_row_divided]}>
      <Block width={SIZES.padding * 1.8} height={SIZES.padding * 1.8} radius={SIZES.padding * 0.55} />
      <View style={[common_styles.flex_1, styles.sk_lines]}>
        <Block width="62%" height={SIZES.padding2} />
        <Block width="88%" height={SIZES.padding * 0.35} />
      </View>
      <Block width={SIZES.padding * 2.7} height={SIZES.padding2} />
    </RowView>
  );
}

const BAR_HEIGHTS = [0.5, 0.7, 0.55, 0.85, 0.6, 0.72];

// Mirrors the dashboard sections with charcoal placeholders; a subtle 1.8 s shimmer, static under Reduce Motion.
export default function HomeSkeleton({ reduce_motion }: { reduce_motion: boolean }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduce_motion) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.55, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, reduce_motion]);

  return (
    <Animated.View style={[styles.sk_root, { opacity: pulse }]} accessible accessibilityRole="progressbar" accessibilityLabel="Loading your dashboard">
      <View style={styles.panel}>
        <Block width={SIZES.padding * 5.45} height={SIZES.padding * 0.45} />
        <Row />
      </View>
      <View style={styles.panel}>
        <Block width={SIZES.padding * 5.75} height={SIZES.padding * 0.7} />
        <RowView align_items="stretch" gap={SIZES.padding2} style={styles.sk_month}>
          {[0, 1].map(index => (
            <View key={index} style={[common_styles.flex_1, styles.sk_month_column, index === 1 && styles.month_column_divided]}>
              <Block width="90%" height={SIZES.padding / 2} />
              <Block width="85%" height={SIZES.padding * 1.1} />
              <Block width="70%" height={SIZES.padding * 0.45} />
            </View>
          ))}
        </RowView>
        <Block width="90%" height={SIZES.padding * 0.45} />
      </View>
      <View style={styles.panel}>
        <Block width={SIZES.padding * 6.7} height={SIZES.padding * 0.75} />
        <View style={styles.sk_gap}>
          <Block width={SIZES.padding * 10.25} height={SIZES.padding / 2} />
        </View>
        <Row />
        <Row divided />
        <Row divided />
      </View>
      <View style={styles.panel}>
        <Block width={SIZES.padding * 9} height={SIZES.padding * 0.7} />
        <View style={styles.sk_gap}>
          <Block width={SIZES.padding * 11.2} height={SIZES.padding / 2} />
        </View>
        <RowView align_items="flex-end" justify_content="space-between" gap={SIZES.padding * 0.9} style={styles.sk_bars}>
          {BAR_HEIGHTS.map((ratio, index) => (
            <View key={index} style={[common_styles.flex_1, styles.sk_bar, { height: `${ratio * 100}%` }]} />
          ))}
        </RowView>
      </View>
    </Animated.View>
  );
}
