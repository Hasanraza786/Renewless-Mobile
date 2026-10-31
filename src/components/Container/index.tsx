import type { ReactNode } from 'react';
import {
  StatusBar,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  background?: string;
  bar_style?: 'dark-content' | 'light-content' | 'default';
  is_auth?: boolean;
  edges?: readonly Edge[];
};

export default function Container({
  children,
  style,
  background,
  bar_style,
  is_auth = false,
  edges,
}: Props) {
  const background_color = background || colors.background;
  const resolved_edges: Edge[] = edges != null ? [...edges] : is_auth ? ['left', 'top', 'right', 'bottom'] : ['left', 'top', 'right'];

  return (
    <SafeAreaView edges={resolved_edges} style={[styles.safe_area, { backgroundColor: background_color }]}>
      <StatusBar barStyle={bar_style || 'light-content'} />
      <View style={[common_styles.flex_1, style]}>{children}</View>
    </SafeAreaView>
  );
}
