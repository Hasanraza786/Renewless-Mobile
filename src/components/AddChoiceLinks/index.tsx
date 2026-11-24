import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { styles } from './styles';

type Props = {
  onAi: () => void;
  onManual: () => void;
  disabled?: boolean;
  // Two equal mint-outline buttons under a filled primary (Gmail review, onboarding review; 24 Nov 2026). Home keeps the links.
  outlined?: boolean;
};

// Add with AI · Add manually as one row of links, under a Gmail action (Home, Gmail review, onboarding review).
export default function AddChoiceLinks({ onAi, onManual, disabled, outlined }: Props) {
  if (outlined) {
    return (
      <RowView gap={SIZES.padding3}>
        <CustomButton variant="outline" text="Add with AI" disabled={disabled} onPress={onAi} style={styles.half} />
        <CustomButton variant="outline" text="Add manually" disabled={disabled} onPress={onManual} style={styles.half} />
      </RowView>
    );
  }
  return (
    <RowView justify_content="center" gap={SIZES.padding}>
      <CustomButton variant="link" text="Add with AI" disabled={disabled} onPress={onAi} />
      <CustomText text="·" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomButton variant="link" text="Add manually" disabled={disabled} onPress={onManual} />
    </RowView>
  );
}

