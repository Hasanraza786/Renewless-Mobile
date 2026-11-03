import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signInSocial, signup } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthProvider, AuthStackParamList } from '../../types';
import { enterApp, useAuthForm } from '../../utils/auth-form';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function useSignup({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const intent = route.params?.intent;
  const loading = useAppSelector(state => state.auth.loading.signup || state.auth.loading.social);
  const form = useAuthForm(['name', 'email', 'password', 'confirm']);

  const onSubmit = async () => {
    if (loading || !form.validateAll()) return;
    const { name, email, password } = form.form_data;
    // The account gets a session only after its email code is verified.
    const error = await dispatch(signup({ name: name.trim(), email: email.trim(), password }));
    if (error) form.setErrors({ email: error });
    else navigation.navigate('Otp', { purpose: 'signup', email: email.trim(), intent });
  };

  const onSocial = async (provider: AuthProvider) => {
    if (await dispatch(signInSocial(provider))) enterApp(navigation, intent);
  };

  return {
    form,
    loading,
    onSubmit,
    onSocial,
    openLogin: () => navigation.navigate('Login', { intent }),
  };
}
