import type { ReactNode } from 'react';
import {
  Platform,
  StatusBar,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  background?: string;
  bar_style?: 'dark-content' | 'light-content' | 'default';
  is_auth?: boolean;
  edges?: readonly Edge[];
  // Tab screens: on Android the native tab bar overlays the screen, so content stops above it.
  tab_bar?: boolean;
};

// Android draws edge to edge: the gesture bar and the Material tab bar (80dp) sit over the content.
const ANDROID = Platform.OS === 'android';

export default function Container({
  children,
  style,
  background,
  bar_style,
  is_auth = false,
  edges,
  tab_bar = false,
}: Props) {
  const background_color = background || COLORS.background;
  const resolved_edges: Edge[] = edges != null ? [...edges] : is_auth || ANDROID ? ['left', 'top', 'right', 'bottom'] : ['left', 'top', 'right'];

  return (
    <SafeAreaView edges={resolved_edges} style={[styles.safe_area, { backgroundColor: background_color }]}>
      <StatusBar barStyle={bar_style || 'light-content'} />
      <View style={[common_styles.flex_1, style, ANDROID && tab_bar && { paddingBottom: SIZES.padding * 4 }]}>{children}</View>
    </SafeAreaView>
  );
}
