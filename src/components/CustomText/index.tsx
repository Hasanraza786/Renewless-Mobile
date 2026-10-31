import { memo, useMemo, type ReactNode } from 'react';
import {
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

type Props = {
  style?: StyleProp<TextStyle>;
  text?: ReactNode;
  onPress?: TextProps['onPress'];
  number_of_lines?: number;
  onLayout?: TextProps['onLayout'];
  weight?: (typeof FONTS)[keyof typeof FONTS];
  align?: TextStyle['textAlign'];
  size?: number;
  color?: string;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  decoration?: TextStyle['textDecorationLine'];
  line_height?: number;
  transform?: TextStyle['textTransform'];
};

function CustomText({
  style,
  text,
  onPress,
  number_of_lines,
  onLayout,
  weight,
  align,
  size,
  color,
  mt,
  mb,
  ml,
  mr,
  decoration,
  line_height,
  transform,
}: Props) {
  const base_style = useMemo(
    () => ({
      color: color ?? COLORS.text_primary,
      fontFamily: weight ?? FONTS.medium,
      textAlign: align ?? 'left',
      fontSize: size ?? (SIZES.padding2 + SIZES.padding3 / 4),
      marginTop: mt ?? 0,
      marginBottom: mb ?? 0,
      marginLeft: ml ?? 0,
      marginRight: mr ?? 0,
      textDecorationLine: decoration ?? 'none',
      lineHeight: line_height,
      textTransform: transform ?? 'none',
    }),
    [align, color, decoration, line_height, mb, ml, mr, mt, size, transform, weight],
  );

  return (
    <Text
      numberOfLines={number_of_lines}
      style={[base_style, style]}
      onLayout={onLayout}
      onPress={onPress}
      selectable
      textBreakStrategy="highQuality">
      {text}
    </Text>
  );
}

export default memo(CustomText);
