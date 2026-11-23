import type { ViewStyle } from 'react-native';
import { chevron_right_icon, nav_prev_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';

type Props = {
  text: string;
  color?: string;
  size?: number;
  weight?: (typeof FONTS)[keyof typeof FONTS];
  // Another shape than the chevron: external_icon (↗), arrow_right_icon (→), plus_glyph_icon (+).
  icon?: string;
  // The icon comes before the text (Slide to cancel, + Connect); links put it after.
  leading?: boolean;
  justify_content?: ViewStyle['justifyContent'];
  mt?: number;
};

// A label with its icon drawn as an SVG at the text's size and colour: a ›, ↗ or → glyph sits off centre.
export default function LinkText({ text, color = COLORS.text_primary, size = SIZES.sm, weight = FONTS.regular, icon, leading, justify_content, mt }: Props) {
  const glyph = <Icons name={icon ?? (leading ? nav_prev_icon : chevron_right_icon)} icon_height={size} icon_width={size} stroke={color} />;
  return (
    <RowView gap={SIZES.padding / 10} justify_content={justify_content} mt={mt}>
      {leading ? glyph : null}
      <CustomText text={text} weight={weight} color={color} size={size} />
      {leading ? null : glyph}
    </RowView>
  );
}
