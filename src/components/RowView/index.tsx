import type { ReactNode } from 'react';
import { TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';
import { SIZES } from '../../constants/theme';

type Props = {
  children?: ReactNode;
  justify_content?: ViewStyle['justifyContent'];
  onPress?: () => void;
  disabled?: boolean;
  align_items?: ViewStyle['alignItems'];
  style?: StyleProp<ViewStyle>;
  gap?: number;
  mt?: number;
};

export default function RowView({
  children,
  justify_content,
  onPress,
  disabled,
  align_items,
  style,
  gap,
  mt,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || !onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: align_items ?? 'center',
          justifyContent: justify_content ?? 'flex-start',
          gap: gap ?? SIZES.padding3,
          marginTop: mt ?? 0,
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
}
