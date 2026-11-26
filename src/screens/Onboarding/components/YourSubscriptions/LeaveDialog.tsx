import ConfirmDialog from '../../../../components/ConfirmDialog';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import RowView from '../../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { common_styles } from '../../../../utils/common_styles';
import type { OnboardingController } from '../../index.function';

// Your subscriptions · leave without saving (approved and locked 26 Nov 2026): Add with AI or Add manually while plans are
// still ticked asks first. Save and continue saves them, Discard leaves without saving, × keeps reviewing.
export default function LeaveDialog({ onboarding }: { onboarding: OnboardingController }) {
  if (!onboarding.leave_intent) return null;
  const count = onboarding.selected_ids.length;
  const busy = onboarding.save_loading;
  return (
    <ConfirmDialog title="Save what Loop found?" close_label="Keep reviewing" onClose={onboarding.closeLeave} locked={busy}>
      <CustomText
        mt={SIZES.padding * 0.7}
        text={`You haven’t saved the ${count} ${count === 1 ? 'subscription' : 'subscriptions'} Loop found. If you continue without saving, they’ll be discarded.`}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
      />
      {onboarding.save_error ? <CustomText accessibility_role="alert" mt={SIZES.padding / 2} text={onboarding.save_error} weight={FONTS.regular} color={COLORS.error_text} size={SIZES.sm} /> : null}
      <RowView gap={SIZES.padding * 0.45} mt={SIZES.padding * 0.7}>
        <CustomButton variant="secondary" text="Discard" disabled={busy} onPress={onboarding.discardAndLeave} style={common_styles.flex_1} />
        <CustomButton variant="primary" text={busy ? 'Saving…' : 'Save and continue'} busy={busy} disabled={busy} onPress={onboarding.saveAndLeave} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}
