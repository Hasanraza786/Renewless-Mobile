import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { login, socialLogin } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthProvider, AuthStackParamList } from '../../types';
import { useAuthForm } from '../../utils/auth-form';
import { navigate } from '../../navigation/service';
import { trackEvent } from '../../utils/analytics';

type Route = NativeStackScreenProps<AuthStackParamList, 'Login'>['route'];

export default function useLogin(route: Route) {
  const dispatch = useAppDispatch();
  const intent = route.params?.intent;
  const loading = useAppSelector(state => state.auth.loading.login || state.auth.loading.social);
  const form = useAuthForm(['email', 'password']);

  // Credential failures stay generic, under the password field.
  const onFieldError = (field: 'email' | 'password', message: string) => form.setErrors({ [field]: message });

  const onSubmit = () => {
    if (loading || !form.validateAll()) return;
    const { email, password } = form.form_data;
    dispatch(login(email, password, intent, onFieldError));
  };

  const onSocial = (provider: AuthProvider) => {
    trackEvent('social_login_tapped', { provider });
    dispatch(socialLogin());
  };

  const openForgot = () => navigate('ForgotPassword');
  const openSignup = () => navigate('Signup', { intent });

  return { form, loading, onSubmit, onSocial, openForgot, openSignup };
}
