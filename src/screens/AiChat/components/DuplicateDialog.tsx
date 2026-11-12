import ConfirmDialog from '../../../components/ConfirmDialog';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import type { AiChatController } from '../index.function';

// Add found a service the user already tracks: open the saved one, or add this as a separate plan.
export default function DuplicateDialog({ chat }: { chat: AiChatController }) {
  if (!chat.duplicate) return null;
  return (
    <ConfirmDialog title="You already track this service" close_label="Close" onClose={chat.closeDuplicate}>
      <CustomText mt={SIZES.padding * 0.7} text="Open the saved one, or add this as a separate plan." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <RowView gap={SIZES.padding * 0.45} mt={SIZES.padding * 0.7}>
        {chat.duplicate.existing_id ? <CustomButton variant="secondary" text="View existing" onPress={chat.viewExisting} style={common_styles.flex_1} /> : null}
        <CustomButton variant="primary" text="Add separate plan" onPress={chat.addSeparate} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}
