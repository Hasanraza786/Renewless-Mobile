import { useState } from 'react';
import { Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resendCode, verifyCode } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { enterApp } from '../../utils/auth-form';

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

export const CODE_LENGTH = 6;

export default function useOtp({ navigation, route }: Props) {
  const { purpose, email, intent } = route.params;
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.otp);
  const [code, setCode] = useState('');
  const [code_error, setCodeError] = useState('');

  const onChangeCode = (value: string) => {
    setCode(value.replace(/\D/g, '').slice(0, CODE_LENGTH));
    setCodeError('');
  };

  const onSubmit = async () => {
    if (loading) return;
    if (code.length !== CODE_LENGTH) return setCodeError('Enter the complete 6-digit code.');
    const result = await dispatch(verifyCode(purpose, email, code));
    if (!result) return setCodeError('That code is incorrect or has expired.');
    // Signup verification signs in; reset verification only authorizes choosing a new password.
    if ('reset_token' in result) navigation.navigate('ResetPassword', { reset_token: result.reset_token });
    else enterApp(navigation, intent);
  };

  // shortcut: resend feedback uses a system alert; replace if a shared toast/notice is designed.
  const onResend = async () => {
    const sent = await dispatch(resendCode(email));
    Alert.alert(sent === undefined ? 'You can request a new code after 2 minutes.' : 'We sent you a new code.');
  };

  return {
    reset: purpose === 'reset',
    email,
    code,
    code_error,
    loading,
    onChangeCode,
    onSubmit,
    onResend,
    onBack: navigation.goBack,
  };
}
