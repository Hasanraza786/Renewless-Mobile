import { Pressable, View, type ViewProps, type ViewStyle } from 'react-native';
import { SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';

// Any View prop (accessibility, hitSlop etc.) passes through; it is a Pressable only when onPress is given.
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
      // Only when given, so a style's marginVertical still applies.
      ...(mt !== undefined && { marginTop: mt }),
    },
    style,
  ];

  return onPress ? (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [row_style, pressed && common_styles.pressed]} {...view_props}>
      {children}
    </Pressable>
  ) : (
    <View style={row_style} {...view_props}>
      {children}
    </View>
  );
}
