import { useEffect, useState } from 'react';
import { goBack } from '../../navigation/service';
import { changePassword } from '../../redux/actions/auth-action';
import { setAuthError } from '../../redux/slices/auth-slice';
import { selectUser } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

type Fields = { current_password: string; new_password: string; confirm_password: string };

export function passwordErrors(values: Fields): Partial<Fields> {
  const errors: Partial<Fields> = {};
  if (!values.current_password) errors.current_password = 'Enter your current password.';
  if (!values.new_password) errors.new_password = 'Enter a new password.';
  else if (values.new_password.length < 8) errors.new_password = 'Use at least 8 characters.';
  else if (values.new_password === values.current_password) errors.new_password = 'Choose a password different from your current one.';
  if (!values.confirm_password) errors.confirm_password = 'Confirm your new password.';
  else if (values.confirm_password !== values.new_password) errors.confirm_password = 'Passwords don’t match.';
  return errors;
}

// Secrets live only in this screen's state; Back discards them. Errors show after the first submit, then live.
export default function useChangePassword() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const updating = useAppSelector(state => state.auth.loading.password);
  const request_error = useAppSelector(state => state.auth.error.password);
  const [form_data, setFormData] = useState<Fields>({ current_password: '', new_password: '', confirm_password: '' });
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? passwordErrors(form_data) : {};

  useEffect(() => {
    dispatch(setAuthError({ key: 'password', value: '' }));
  }, [dispatch]);

  const update = (key: keyof Fields) => (value: string) => {
    setFormData(current => ({ ...current, [key]: value }));
    if (request_error) dispatch(setAuthError({ key: 'password', value: '' }));
  };

  const onSubmit = async () => {
    setSubmitted(true);
    if (Object.keys(passwordErrors(form_data)).length || updating) return;
    if (await dispatch(changePassword(form_data.current_password, form_data.new_password))) goBack();
  };

  // Social-only accounts get provider guidance instead of password inputs.
  const has_password = user?.hasPassword !== false;
  const provider = user?.provider === 'apple' ? 'Apple' : 'Google';

  return {
    has_password,
    provider,
    form_data,
    update,
    errors,
    updating,
    request_error,
    onSubmit,
  };
}
