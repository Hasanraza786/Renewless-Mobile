import { View } from 'react-native';
import { FONTS, SIZES, COLORS } from '../../constants/theme';
import CustomText from '../CustomText';

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
      <CustomText
        text={eyebrow}
        weight={FONTS.regular}
        color={COLORS.primary}
        size={SIZES.sm}
        align={align}
        letter_spacing={1.5}
        mb={SIZES.padding * 0.65}
      />
      <CustomText
        text={title}
        size={SIZES.h3}
        align={align}
        letter_spacing={title_spacing ?? -1}
      />
      {emphasis ? (
        <CustomText
          text={emphasis}
          color={COLORS.primary}
          size={SIZES.h3}
          align={align}
          letter_spacing={title_spacing ?? -1}
        />
      ) : null}
      <CustomText
        mt={SIZES.padding2}
        text={copy}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
        align={align}
      />
    </View>
  );
}
