import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resetPassword } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { useAuthForm } from '../../utils/auth-form';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

export default function useResetPassword({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.reset);
  const error = useAppSelector(state => state.auth.error.reset);
  const form = useAuthForm(['password', 'confirm']);

  // A successful reset returns to Login; the user signs in with the new password.
  const onSubmit = async () => {
    if (loading || !form.validateAll()) return;
    if ((await dispatch(resetPassword(route.params.reset_token, form.form_data.password))) !== undefined) navigation.popTo('Login');
  };

  return { form, loading, error, onSubmit, onBack: navigation.goBack };
}
