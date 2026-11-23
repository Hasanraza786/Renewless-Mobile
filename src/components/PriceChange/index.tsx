import { StyleSheet } from 'react-native';
import { arrow_right_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';

type Props = {
  from: string;
  to: string;
  color?: string;
  // The new price may stand out (Price history uses medium for it).
  to_weight?: (typeof FONTS)[keyof typeof FONTS];
  mt?: number;
};

// Old → new price with the arrow drawn as an SVG; screen readers hear "old to new".
export default function PriceChange({ from, to, color = COLORS.text_primary, to_weight = FONTS.regular, mt }: Props) {
  return (
    <RowView accessible accessibilityLabel={`${from} to ${to}`} gap={SIZES.padding / 5} mt={mt} style={styles.wrap}>
      <CustomText text={from} weight={FONTS.regular} color={color} size={SIZES.sm} />
      <Icons name={arrow_right_icon} icon_height={SIZES.sm} icon_width={SIZES.sm} stroke={color} />
      <CustomText text={to} weight={to_weight} color={color} size={SIZES.sm} />
    </RowView>
  );
}

const styles = StyleSheet.create({
  wrap: { flexWrap: 'wrap' },
});
