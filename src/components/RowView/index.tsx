import { TouchableOpacity, View, type ViewProps, type ViewStyle } from 'react-native';
import { SIZES } from '../../constants/theme';

// Any View prop (accessibility etc.) passes through; it is touchable only when onPress is given.
type Props = ViewProps & {
  justify_content?: ViewStyle['justifyContent'];
  onPress?: () => void;
  disabled?: boolean;
  align_items?: ViewStyle['alignItems'];
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
  ...view_props
}: Props) {
  const row_style = [
    {
      flexDirection: 'row' as const,
      alignItems: align_items ?? 'center',
      justifyContent: justify_content ?? 'flex-start',
      gap: gap ?? SIZES.padding3,
      marginTop: mt ?? 0,
    },
    style,
  ];

  return onPress ? (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled} style={row_style} {...view_props}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={row_style} {...view_props}>
      {children}
    </View>
  );
}
