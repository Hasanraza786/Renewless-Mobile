import AuthLayout, { AuthFooterLink } from '../../components/AuthLayout';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import useForgotPassword from './index.function';
import { styles } from './styles';

export default function ForgotPasswordScreen() {
  const { form, loading, error, onSubmit, onBack, openLogin } = useForgotPassword();
  const email = form.fieldProps('email');

  return (
    <AuthLayout onBack={onBack} title="Forgot password?" copy="No worries. We’ll send a verification code to your email.">
      <InputField
        variant="auth"
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="send"
        onSubmitEditing={onSubmit}
        {...email}
        error={email.error || error || undefined}
      />

      <CustomButton variant="primary" text="Send code" disabled={loading} busy={loading} onPress={onSubmit} style={styles.submit} />

      <AuthFooterLink prompt="Remember your password?" link="Log in" onPress={openLogin} style={styles.footer} />
    </AuthLayout>
  );
}
