import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout, { AuthError, AuthLink } from '../../components/AuthLayout';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';
import { resetPassword } from '../../redux/actions/auth';
import { setAuthError } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen({ navigation, route }: Props) {
  const { email } = route.params;
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.reset);
  const error = useAppSelector(state => state.auth.error.reset);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function onSubmit() {
    if (password !== confirm) {
      dispatch(setAuthError({ key: 'reset', value: 'Passwords do not match' }));
      return;
    }
    dispatch(
      resetPassword(email, password, () =>
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] }),
      ),
    );
  }

  return (
    <AuthLayout title="Reset password" plain logo>
      <TextField
        label="New password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="newPassword"
      />
      <TextField
        label="Confirm password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        textContentType="newPassword"
      />
      <AuthError message={error} />
      <PrimaryButton label="Save password" onPress={onSubmit} disabled={loading} />
      <AuthLink label="Log in" onPress={() => navigation.navigate('Login')} />
    </AuthLayout>
  );
}
