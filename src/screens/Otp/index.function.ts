import { useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resendCode, verifyCode } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { goBack } from '../../navigation/service';

type Route = NativeStackScreenProps<AuthStackParamList, 'Otp'>['route'];

export const CODE_LENGTH = 6;
// The server's code lifetime and resend cooldown, counted from when this code was sent.
const EXPIRES_S = 5 * 60;
const RESEND_S = 2 * 60;

// "4:05"
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export default function useOtp(route: Route) {
  const { purpose, email, intent } = route.params;
  // Resend issues a new challenge; the newest one is the one to verify.
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.otp);
  const [code, setCode] = useState('');
  const [code_error, setCodeError] = useState('');
  const [challenge_id, setChallengeId] = useState(route.params.challenge_id);
  const resending = useAppSelector(state => state.auth.loading.resend);
  const [sent_at, setSentAt] = useState(Date.now);
  const [now, setNow] = useState(Date.now);

  // One tick a second while a countdown is still running.
  const elapsed = Math.floor((now - sent_at) / 1000);
  const expires_in = Math.max(0, EXPIRES_S - elapsed);
  const resend_in = Math.max(0, RESEND_S - elapsed);
  useEffect(() => {
    if (!expires_in) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [expires_in]);

  const expiry_label = expires_in ? `Code expires in ${clock(expires_in)}` : 'This code has expired. Request a new one.';
  const resend_label = resend_in ? `Available in ${clock(resend_in)}` : '';
  const can_resend = !resend_in && !resending;

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
  const onSent = (next_id: string) => {
    setChallengeId(next_id);
    setSentAt(Date.now());
    setNow(Date.now());
  };
  // Disabled until the cooldown ends and while a resend is in flight, so taps never stack requests.
  const onResend = () => {
    if (!can_resend) return;
    dispatch(resendCode(challenge_id, onSent));
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
    expiry_label,
    resend_label,
    can_resend,
    onBack: goBack,
  };
}
