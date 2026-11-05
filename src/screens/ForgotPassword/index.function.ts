import { forgotPassword } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useAuthForm } from '../../utils/auth-form';
import { goBack, navigate, popTo } from '../../navigation/service';

export default function useForgotPassword() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.forgot);
  const error = useAppSelector(state => state.auth.error.forgot);
  const form = useAuthForm(['email']);

  // The response is the same whether or not the account exists.
  const onSubmit = async () => {
    if (loading || !form.validateAll()) return;
    const email = form.form_data.email.trim();
    if ((await dispatch(forgotPassword(email))) !== undefined) navigate('Otp', { purpose: 'reset', email });
  };

  return { form, loading, error, onSubmit, onBack: goBack, openLogin: () => popTo('Login') };
}
