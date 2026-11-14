import type { ReactNode } from 'react';
import { Animated, StyleSheet, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';
import RowView from '../../../../components/RowView';
import { SIZES } from '../../../../constants/theme';
import { common_styles } from '../../../../utils/common_styles';

type Props = {
  art: ReactNode;
  // The panel's slide/fade, so the artwork moves with the text.
  art_style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  children: ReactNode;
};

const ART_WIDTH = SIZES.padding * 14.5;
const GAP = SIZES.padding * 2.8;

// Tablet onboarding and Gmail recovery: artwork on the left (up to 1.3x), text and actions centred on the right.
export default function TabletSplit({ art, art_style, children }: Props) {
  // Narrower tablets (iPad mini) scale the artwork down so it never crosses into the text column.
  const { width } = useWindowDimensions();
  const scale = Math.min(1.3, (width - SIZES.padding * 2 - GAP) / 2 / ART_WIDTH);
  return (
    <RowView align_items="stretch" gap={GAP} style={common_styles.flex_1}>
      <Animated.View style={[styles.art, art_style]}>
        <View style={[styles.art_scale, { transform: [{ scale }] }]}>{art}</View>
      </Animated.View>
      <View style={styles.main}>{children}</View>
    </RowView>
  );
}

const styles = StyleSheet.create({
  art: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  // A fixed width: the Welcome scene is all absolutely positioned and takes its width from here.
  art_scale: {
    width: ART_WIDTH,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
});
