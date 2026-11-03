import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { forgotPassword } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { useAuthForm } from '../../utils/auth-form';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function useForgotPassword({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.forgot);
  const error = useAppSelector(state => state.auth.error.forgot);
  const form = useAuthForm(['email']);

  // The response is the same whether or not the account exists.
  const onSubmit = async () => {
    if (loading || !form.validateAll()) return;
    const email = form.form_data.email.trim();
    if ((await dispatch(forgotPassword(email))) !== undefined) navigation.navigate('Otp', { purpose: 'reset', email });
  };

  return { form, loading, error, onSubmit, onBack: navigation.goBack, openLogin: () => navigation.popTo('Login') };
}
