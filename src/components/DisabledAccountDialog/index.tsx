import { closeDisabledAccount, deleteDisabledAccount } from '../../redux/actions/auth-action';
import { updateDisabledAccount } from '../../redux/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import ConfirmDialog from '../ConfirmDialog';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import RowView from '../RowView';

// A sign-in to a disabled account (Login, or onboarding's Connect and Login): the server's message with Delete my account,
// then the Settings deletion copy. App-level, like the toast, so every sign-in path shares it.
export default function DisabledAccountDialog() {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(state => state.auth.disabled);
  if (!disabled) return null;
  const close = () => dispatch(closeDisabledAccount());
  if (disabled.step === 'notice') {
    return (
      <ConfirmDialog title="Account disabled" close_label="Close" onClose={close}>
        <CustomText mt={SIZES.padding * 0.7} text={disabled.message} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        <RowView gap={SIZES.padding * 0.45} mt={SIZES.padding * 0.7}>
          <CustomButton variant="secondary" text="Cancel" onPress={close} style={common_styles.flex_1} />
          <CustomButton variant="danger" text="Delete my account" onPress={() => dispatch(updateDisabledAccount({ step: 'confirm' }))} style={common_styles.flex_1} />
        </RowView>
      </ConfirmDialog>
    );
  }
  return (
    <ConfirmDialog title="Delete your Renewless account?" close_label="Close deletion confirmation" onClose={close} locked={disabled.deleting}>
      <CustomText mt={SIZES.padding * 0.7} text="This permanently removes your account and saved tracking data, disconnects your connected inboxes and stops Renewless reminders." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomText mt={SIZES.padding * 0.7} text="Your subscriptions with other services won’t be cancelled." weight={FONTS.regular} size={SIZES.sm} />
      {disabled.error ? <CustomText mt={SIZES.padding * 0.7} text={disabled.error} weight={FONTS.regular} color={COLORS.error_text} size={SIZES.sm} /> : null}
      <RowView gap={SIZES.padding * 0.45} mt={SIZES.padding * 0.7}>
        <CustomButton variant="secondary" text="Keep account" disabled={disabled.deleting} onPress={close} style={common_styles.flex_1} />
        <CustomButton variant="danger" text="Delete account" busy={disabled.deleting} onPress={() => dispatch(deleteDisabledAccount())} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}
