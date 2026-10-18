import type { ReactNode } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

type Props = {
  isScroll?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  background?: string;
  barStyle?: 'dark-content' | 'light-content' | 'default';
  isAuth?: boolean;
  edges?: readonly Edge[];
};

export default function Container({
  isScroll = false,
  children,
  style,
  background,
  barStyle,
  isAuth = false,
  edges,
}: Props) {
  const backgroundColor = background || colors.background;
  const resolvedEdges: Edge[] =
    edges != null
      ? [...edges]
      : isAuth
        ? ['left', 'top', 'right', 'bottom']
        : ['left', 'top', 'right'];

  return (
    <SafeAreaView edges={resolvedEdges} style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar barStyle={barStyle || 'dark-content'} />
      {isScroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flex}
          style={[styles.flex, style]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
});
