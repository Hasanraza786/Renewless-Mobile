import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout, { AuthDivider, AuthFooterLink, SocialButtons } from '../../components/AuthLayout';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import type { AuthStackParamList } from '../../types';
import useSignup from './index.function';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen(props: Props) {
  const { form, loading, onSubmit, onSocial, openLogin } = useSignup(props);

  return (
    <AuthLayout compact title="Create your account" copy="Keep your subscriptions in one place.">
      <View style={styles.field}>
        <InputField variant="auth" label="Name" onSubmitEditing={form.focusField('email')} submitBehavior="submit" autoComplete="name" textContentType="name" returnKeyType="next" {...form.fieldProps('name')} />
      </View>
      <View style={styles.field}>
        <InputField variant="auth" label="Email" onSubmitEditing={form.focusField('password')} submitBehavior="submit" keyboardType="email-address" autoCapitalize="none" autoComplete="email" textContentType="emailAddress" returnKeyType="next" {...form.fieldProps('email')} />
      </View>
      <View style={styles.field}>
        <InputField variant="auth" label="Password" onSubmitEditing={form.focusField('confirm')} submitBehavior="submit" secureTextEntry autoComplete="new-password" textContentType="newPassword" returnKeyType="next" {...form.fieldProps('password')} />
      </View>
      <InputField variant="auth" label="Confirm password" secureTextEntry autoComplete="new-password" textContentType="newPassword" returnKeyType="go" onSubmitEditing={onSubmit} {...form.fieldProps('confirm')} />
      <CustomButton variant="primary" text="Create account" disabled={loading} busy={loading} onPress={onSubmit} style={styles.submit} />
      <AuthDivider style={styles.divider} />
      <SocialButtons disabled={loading} onPress={onSocial} />
      <AuthFooterLink prompt="Already have an account?" link="Log in" onPress={openLogin} style={styles.footer} />
    </AuthLayout>
  );
}
