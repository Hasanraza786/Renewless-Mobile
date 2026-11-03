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

const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;

export default function ResetPasswordScreen(props: Props) {
  const { form, loading, error, onSubmit, onBack } = useResetPassword(props);
  const confirm = form.fieldProps('confirm');

  return (
    <AuthLayout onBack={onBack} title="Set a new password" copy="Choose a new password to keep your account secure.">
      <InputField variant="auth" label="New password" onSubmitEditing={form.focusField('confirm')} submitBehavior="submit" secureTextEntry autoComplete="new-password" textContentType="newPassword" returnKeyType="next" {...form.fieldProps('password')} />
      <CustomText text="Use at least 6 characters." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} style={styles.hint} />
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
      <CustomText text="You’ll log in with your new password." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} align="center" style={styles.note} />
    </AuthLayout>
  );
}
