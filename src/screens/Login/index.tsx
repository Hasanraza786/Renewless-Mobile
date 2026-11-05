import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout, { AuthDivider, AuthFooterLink, SocialButtons } from '../../components/AuthLayout';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import SizedBox from '../../components/SizedBox';
import { SIZES } from '../../constants/theme';
import type { AuthStackParamList } from '../../types';
import useLogin from './index.function';
import { styles } from './styles';

type Props = Pick<NativeStackScreenProps<AuthStackParamList, 'Login'>, 'route'>;

export default function LoginScreen({ route }: Props) {
  const { form, loading, onSubmit, onSocial, openForgot, openSignup } = useLogin(route);

  return (
    <AuthLayout title="Welcome back" copy="Keep your next renewal in sight.">
      <InputField variant="auth" label="Email" onSubmitEditing={form.focusField('password')} submitBehavior="submit" keyboardType="email-address" autoCapitalize="none" autoComplete="email" textContentType="emailAddress" returnKeyType="next" {...form.fieldProps('email')} />

      <SizedBox height={SIZES.padding * 0.9} />

      <InputField variant="auth" label="Password" secureTextEntry autoComplete="current-password" textContentType="password" returnKeyType="go" onSubmitEditing={onSubmit} {...form.fieldProps('password')} />

      <View style={styles.forgot}>
        <CustomButton variant="link" text="Forgot password?" onPress={openForgot} style={styles.forgot_link} />
      </View>

      <CustomButton variant="primary" text="Log in" disabled={loading} busy={loading} onPress={onSubmit} style={styles.submit} />

      <AuthDivider style={styles.divider} />

      <SocialButtons disabled={loading} onPress={onSocial} />

      <AuthFooterLink prompt="New to Renewless?" link="Sign up" onPress={openSignup} style={styles.footer} />
    </AuthLayout>
  );
}
