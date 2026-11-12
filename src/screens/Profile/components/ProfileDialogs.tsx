import ConfirmDialog from '../../../components/ConfirmDialog';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import InputField from '../../../components/InputField';
import RowView from '../../../components/RowView';
import SizedBox from '../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import type { ProfileController } from '../index.function';

function LogoutDialog({ profile }: { profile: ProfileController }) {
  return (
    <ConfirmDialog title="Log out of Renewless?" close_label="Close confirmation" onClose={profile.closeDialog} locked={profile.logging_out}>
      <CustomText mt={SIZES.padding * 0.7} text="Your saved subscriptions stay on your account. You can sign in again anytime." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <RowView gap={SIZES.padding * 0.45} mt={SIZES.padding * 0.7}>
        <CustomButton variant="secondary" text="Cancel" disabled={profile.logging_out} onPress={profile.closeDialog} style={common_styles.flex_1} />
        <CustomButton variant="danger" text="Log out" busy={profile.logging_out} onPress={profile.confirmLogout} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}

// Delete account: typed DELETE (and the password for an email account) enables the action; the account is removed
// only after the server confirms.
function DeleteDialog({ profile }: { profile: ProfileController }) {
  return (
    <ConfirmDialog title="Delete your Renewless account?" close_label="Close deletion confirmation" onClose={profile.closeDialog} locked={profile.deleting}>
      <CustomText mt={SIZES.padding * 0.7} text="This permanently removes your account and saved tracking data, disconnects your Gmail inboxes and stops Renewless reminders." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomText mt={SIZES.padding * 0.7} text="Your subscriptions with other services won’t be cancelled." weight={FONTS.regular} size={SIZES.sm} />
      <CustomText mt={SIZES.padding * 0.7} mb={SIZES.padding * 0.7} text={profile.needs_password ? 'Enter your password and type DELETE to confirm.' : 'We’ll ask you to verify your sign-in before deleting your account.'} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      {profile.needs_password ? (
        <>
          <InputField
            variant="sheet"
            label="Password"
            value={profile.delete_password}
            onChangeText={profile.setDeletePassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="current-password"
            editable={!profile.deleting}
            returnKeyType="next"
          />
          <SizedBox height={SIZES.padding2} />
        </>
      ) : null}
      <InputField
        variant="sheet"
        label="Type DELETE to confirm"
        value={profile.delete_text}
        onChangeText={profile.setDeleteText}
        autoCapitalize="characters"
        autoCorrect={false}
        autoComplete="off"
        editable={!profile.deleting}
        error={profile.delete_error || undefined}
        returnKeyType="done"
        onSubmitEditing={profile.confirmDelete}
      />
      <SizedBox height={SIZES.padding2} />
      <RowView gap={SIZES.padding2}>
        <CustomButton variant="secondary" text="Keep account" disabled={profile.deleting} onPress={profile.closeDialog} style={common_styles.flex_1} />
        <CustomButton variant="danger" text={profile.deleting ? 'Deleting…' : 'Delete account'} disabled={!profile.delete_ready} busy={profile.deleting} onPress={profile.confirmDelete} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}

// + Connect after 2 Gmail inboxes (disconnected ones count): the limit, nothing to confirm.
function InboxLimitDialog({ profile }: { profile: ProfileController }) {
  return (
    <ConfirmDialog title="You’ve used your 2 Gmail inboxes" close_label="Close" onClose={profile.closeDialog}>
      <CustomText mt={SIZES.padding * 0.7} text="That’s the limit for now. You can reconnect an inbox you used before." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <SizedBox height={SIZES.padding * 0.7} />
      <CustomButton variant="primary" text="OK" onPress={profile.closeDialog} />
    </ConfirmDialog>
  );
}

export default function ProfileDialogs({ profile }: { profile: ProfileController }) {
  if (profile.dialog === 'logout') return <LogoutDialog profile={profile} />;
  if (profile.dialog === 'delete') return <DeleteDialog profile={profile} />;
  if (profile.dialog === 'inbox_limit') return <InboxLimitDialog profile={profile} />;
  return null;
}
