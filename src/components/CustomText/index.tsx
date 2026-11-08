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
  line_height?: number | null;
  transform?: TextStyle['textTransform'];
  letter_spacing?: number;
  accessibility_role?: TextProps['accessibilityRole'];
  // Single-line text shrinks (down to 70%) instead of truncating when its box is too narrow.
  fit_width?: boolean;
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
  letter_spacing,
  accessibility_role,
  fit_width,
}: Props) {
  const font_size = size ?? SIZES.md;
  const base_style = useMemo(
    () => ({
      color: color ?? COLORS.text_primary,
      fontFamily: weight ?? FONTS.medium,
      textAlign: align ?? 'left',
      fontSize: font_size,
      marginTop: mt ?? 0,
      marginBottom: mb ?? 0,
      marginLeft: ml ?? 0,
      marginRight: mr ?? 0,
      textDecorationLine: decoration ?? 'none',
      lineHeight: line_height === undefined ? font_size + SIZES.padding2 / 2 : line_height ?? undefined,
      textTransform: transform ?? 'none',
      letterSpacing: letter_spacing,
    }),
    [align, color, decoration, font_size, letter_spacing, line_height, mb, ml, mr, mt, transform, weight],
  );

  return (
    <Text
      numberOfLines={number_of_lines}
      adjustsFontSizeToFit={fit_width}
      minimumFontScale={fit_width ? 0.7 : undefined}
      accessibilityRole={accessibility_role}
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
