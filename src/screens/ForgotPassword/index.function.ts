import { useEffect } from 'react';
import { forgotPassword } from '../../redux/actions/auth-action';
import { authError } from '../../redux/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useAuthForm } from '../../utils/auth-form';
import { goBack, popTo } from '../../navigation/service';

export default function useForgotPassword() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.forgot);
  const error = useAppSelector(state => state.auth.error.forgot);
  const form = useAuthForm(['email']);
  const email_value = form.form_data.email;

  // A server error belongs to the email it was sent for: clear it on a new visit and on edit.
  useEffect(() => {
    dispatch(authError('forgot')(''));
  }, [dispatch, email_value]);

  // An unknown email stays here with the error under Email.
  const onSubmit = () => {
    if (loading || !form.validateAll()) return;
    dispatch(forgotPassword(form.form_data.email));
  };

  const openLogin = () => popTo('Login');

  return { form, loading, error, onSubmit, onBack: goBack, openLogin };
}
