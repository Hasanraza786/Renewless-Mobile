import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

type Props = { onAi: () => void; onManual: () => void; disabled?: boolean };

// Add with AI · Add manually as one row of links, under a Gmail action (Home, Gmail review, onboarding review).
export default function AddChoiceLinks({ onAi, onManual, disabled }: Props) {
  return (
    <RowView justify_content="center" gap={SIZES.padding}>
      <CustomButton variant="link" text="Add with AI" disabled={disabled} onPress={onAi} />
      <CustomText text="·" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomButton variant="link" text="Add manually" disabled={disabled} onPress={onManual} />
    </RowView>
  );
}
