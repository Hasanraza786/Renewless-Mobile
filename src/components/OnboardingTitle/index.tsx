import { View } from 'react-native';
import { FONTS, SIZES, colors } from '../../constants/theme';
import CustomText from '../CustomText';
import { styles } from './styles';

type Props = {
  eyebrow: string;
  title: string;
  emphasis?: string;
  copy: string;
  align?: 'left' | 'center';
  // Results/Save headings use a slightly looser -0.5 tracking in the prototype.
  title_spacing?: number;
};

export default function OnboardingTitle({ eyebrow, title, emphasis, copy, align = 'left', title_spacing }: Props) {
  return (
    <View>
      <CustomText text={eyebrow} weight={FONTS.regular} color={colors.accent} size={SIZES.sm} line_height={SIZES.padding - SIZES.padding3 / 4} align={align} style={styles.eyebrow} />
      <CustomText text={title} size={SIZES.h3} line_height={SIZES.padding + SIZES.padding3} align={align} style={[styles.title, title_spacing !== undefined && { letterSpacing: title_spacing }]} />
      {emphasis ? (
        <CustomText text={emphasis} color={colors.accent} size={SIZES.h3} line_height={SIZES.padding + SIZES.padding3} align={align} style={[styles.title, title_spacing !== undefined && { letterSpacing: title_spacing }]} />
      ) : null}
      <CustomText text={copy} weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={SIZES.padding - SIZES.padding3 / 4} align={align} mt={SIZES.padding2} />
    </View>
  );
}
