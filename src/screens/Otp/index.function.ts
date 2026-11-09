import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resendCode, verifyCode } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { goBack } from '../../navigation/service';

type Route = NativeStackScreenProps<AuthStackParamList, 'Otp'>['route'];

export const CODE_LENGTH = 6;

export default function useOtp(route: Route) {
  const { purpose, email, intent } = route.params;
  // Resend issues a new challenge; the newest one is the one to verify.
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.otp);
  const [code, setCode] = useState('');
  const [code_error, setCodeError] = useState('');
  const [challenge_id, setChallengeId] = useState(route.params.challenge_id);

  const onChangeCode = (value: string) => {
    setCode(value.replace(/\D/g, '').slice(0, CODE_LENGTH));
    setCodeError('');
  };

  // Signup verification signs in; reset verification only authorizes choosing a new password.
  const onSubmit = () => {
    if (loading) return;
    if (code.length !== CODE_LENGTH) return setCodeError('Enter the complete 6-digit code.');
    dispatch(verifyCode(purpose, challenge_id, code, intent, setCodeError));
  };

  // shortcut: resend feedback uses a system alert; replace if a shared toast/notice is designed.
  const onResend = () => {
    dispatch(resendCode(challenge_id, setChallengeId));
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
    onBack: goBack,
  };
}
