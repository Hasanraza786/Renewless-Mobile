import { memo, useMemo, type ReactNode } from 'react';
import { Platform, StyleSheet, Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { SIGN_PATTERN, spokenMoney } from '../../utils/money';

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

  // The riyal and dirham signs are not in Raleway: draw them in the symbol font and let screen readers hear the code.
  const signs = typeof text === 'string' && SIGN_PATTERN.test(text);
  const content = signs
    ? text.split(SIGN_PATTERN).map((part, index) => (index % 2 ? <Text key={index} style={styles.symbol}>{part}</Text> : part))
    : text;

  return (
    <Text
      accessibilityLabel={signs ? spokenMoney(text) : undefined}
      numberOfLines={number_of_lines}
      maxFontSizeMultiplier={MAX_FONT_SCALE}
      adjustsFontSizeToFit={fit_width}
      minimumFontScale={fit_width ? 0.7 : undefined}
      accessibilityRole={accessibility_role}
      style={[base_style, style]}
      onLayout={onLayout}
      onPress={onPress}
      selectable={IOS}
      textBreakStrategy={IOS ? 'highQuality' : 'simple'}>
      {content}
    </Text>
  );
}

// System text size still grows the text (all the standard sizes fit), but the largest accessibility sizes stop at
// 1.5x, so labels inside fixed-height buttons, pills and tabs stay inside them.
export const MAX_FONT_SCALE = 1.5;

// Android measures selectable or high-quality-wrapped text a hair short and hides a line's last word
// ("Create account" drew "Create" on tablets), so text is selectable on iOS only.
const IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({ symbol: { fontFamily: FONTS.symbol } });

export default memo(CustomText);
