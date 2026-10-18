import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout, { AuthError, AuthLink } from '../../components/AuthLayout';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';
import { forgotPassword } from '../../redux/actions/auth';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.forgot);
  const error = useAppSelector(state => state.auth.error.forgot);
  const [email, setEmail] = useState('');

  function onSubmit() {
    const trimmed = email.trim();
    dispatch(forgotPassword(trimmed, () => navigation.navigate('Otp', { email: trimmed })));
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter the email on your account. We'll keep a code ready for the next step."
      plain
      logo>
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <AuthError message={error} />
      <PrimaryButton label="Send code" onPress={onSubmit} disabled={loading} />
      <AuthLink label="Log in" onPress={() => navigation.navigate('Login')} />
    </AuthLayout>
  );
}
