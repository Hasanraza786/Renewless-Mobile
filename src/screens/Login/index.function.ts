import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { login, signInSocial } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthProvider, AuthStackParamList } from '../../types';
import { enterApp, useAuthForm } from '../../utils/auth-form';
import { navigate } from '../../navigation/service';

type Route = NativeStackScreenProps<AuthStackParamList, 'Login'>['route'];

export default function useLogin(route: Route) {
  const dispatch = useAppDispatch();
  const intent = route.params?.intent;
  const loading = useAppSelector(state => state.auth.loading.login || state.auth.loading.social);
  const form = useAuthForm(['email', 'password']);

  const onSubmit = async () => {
    if (loading || !form.validateAll()) return;
    const { email, password } = form.form_data;
    const result = await dispatch(login(email, password));
    if (result === 'session') enterApp(intent);
    else if (result === 'verify') navigate('Otp', { purpose: 'signup', email: email.trim(), intent });
    // Credential failures stay generic, under the password field.
    else form.setErrors({ password: 'Wrong email or password. Please try again.' });
  };

  const onSocial = async (provider: AuthProvider) => {
    if (await dispatch(signInSocial(provider))) enterApp(intent);
  };

  return {
    form,
    loading,
    onSubmit,
    onSocial,
    openForgot: () => navigate('ForgotPassword'),
    openSignup: () => navigate('Signup', { intent }),
  };
}
