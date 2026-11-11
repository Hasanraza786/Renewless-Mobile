import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { socialLogin, signup } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthProvider, AuthStackParamList } from '../../types';
import { useAuthForm } from '../../utils/auth-form';
import { navigate } from '../../navigation/service';
import { trackEvent } from '../../utils/analytics';

type Route = NativeStackScreenProps<AuthStackParamList, 'Signup'>['route'];

export default function useSignup(route: Route) {
  const dispatch = useAppDispatch();
  const intent = route.params?.intent;
  const loading = useAppSelector(state => state.auth.loading.signup || state.auth.loading.social);
  const form = useAuthForm(['name', 'email', 'password', 'confirm']);

  const onFieldError = (field: 'name' | 'email' | 'password', message: string) => form.setErrors({ [field]: message });

  // The account gets a session only after its email code is verified.
  const onSubmit = () => {
    if (loading || !form.validateAll()) return;
    const { name, email, password } = form.form_data;
    dispatch(signup({ name: name.trim(), email: email.trim(), password }, intent, onFieldError));
  };

  const onSocial = (provider: AuthProvider) => {
    trackEvent('social_login_tapped', { provider });
    dispatch(socialLogin());
  };

  const openLogin = () => navigate('Login', { intent });

  return { form, loading, onSubmit, onSocial, openLogin };
}
