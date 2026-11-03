import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { login, signInSocial } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthProvider, AuthStackParamList } from '../../types';
import { enterApp, useAuthForm } from '../../utils/auth-form';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function useLogin({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const intent = route.params?.intent;
  const loading = useAppSelector(state => state.auth.loading.login || state.auth.loading.social);
  const form = useAuthForm(['email', 'password']);

  const onSubmit = async () => {
    if (loading || !form.validateAll()) return;
    const { email, password } = form.form_data;
    const result = await dispatch(login(email, password));
    if (result === 'session') enterApp(navigation, intent);
    else if (result === 'verify') navigation.navigate('Otp', { purpose: 'signup', email: email.trim(), intent });
    // Credential failures stay generic, under the password field.
    else form.setErrors({ password: 'Wrong email or password. Please try again.' });
  };

  const onSocial = async (provider: AuthProvider) => {
    if (await dispatch(signInSocial(provider))) enterApp(navigation, intent);
  };

  return {
    form,
    loading,
    onSubmit,
    onSocial,
    openForgot: () => navigation.navigate('ForgotPassword'),
    openSignup: () => navigation.navigate('Signup', { intent }),
  };
}
