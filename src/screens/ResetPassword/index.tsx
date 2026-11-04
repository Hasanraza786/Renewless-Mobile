import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout from '../../components/AuthLayout';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import InputField from '../../components/InputField';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import type { AuthStackParamList } from '../../types';
import useResetPassword from './index.function';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen(props: Props) {
  const { form, loading, error, onSubmit, onBack } = useResetPassword(props);
  const confirm = form.fieldProps('confirm');

  return (
    <AuthLayout onBack={onBack} title="Set a new password" copy="Choose a new password to keep your account secure.">
      <InputField variant="auth" label="New password" onSubmitEditing={form.focusField('confirm')} submitBehavior="submit" secureTextEntry autoComplete="new-password" textContentType="newPassword" returnKeyType="next" {...form.fieldProps('password')} />

      <CustomText mt={SIZES.padding * 0.55} text="Use at least 6 characters." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding * 1.15} />

      <InputField
        variant="auth"
        label="Confirm password"
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={onSubmit}
        {...confirm}
        error={confirm.error || error || undefined}
      />

      <CustomButton variant="primary" text="Reset password" disabled={loading} busy={loading} onPress={onSubmit} style={styles.submit} />

      <CustomText mt={SIZES.padding * 1.1} text="You’ll log in with your new password." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
    </AuthLayout>
  );
}
