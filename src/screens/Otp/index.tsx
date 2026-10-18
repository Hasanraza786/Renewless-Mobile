import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout, { AuthError, AuthLink } from '../../components/AuthLayout';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/colors';
import { resendOtp, verifyOtp } from '../../redux/actions/auth';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

const CELL_COUNT = 6;

export default function OtpScreen({ navigation, route }: Props) {
  const { email } = route.params;
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.otp);
  const error = useAppSelector(state => state.auth.error.otp);
  const [code, setCode] = useState('');
  const [resent, setResent] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  function onContinue() {
    if (code.length !== CELL_COUNT) return;
    dispatch(verifyOtp(email, code, () => navigation.replace('ResetPassword', { email })));
  }

  function onResend() {
    setResent('');
    dispatch(resendOtp(email, () => setResent('A new code is ready.')));
  }

  return (
    <AuthLayout
      title="Enter code"
      subtitle={`Enter the 6-digit code for ${email}.`}
      plain
      logo>
      <Text style={styles.label}>6-digit code</Text>
      <CodeField
        ref={ref}
        {...cellProps}
        value={code}
        onChangeText={value => setCode(value.replace(/\D/g, '').slice(0, CELL_COUNT))}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeField}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.cellFocused]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <AuthLink label="Resend code" onPress={onResend} />
      {resent ? <Text style={styles.resent}>{resent}</Text> : null}
      <AuthError message={error} />
      <PrimaryButton
        label="Continue"
        onPress={onContinue}
        disabled={loading || code.length !== CELL_COUNT}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  codeField: {
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cell: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.navy,
    fontSize: 22,
    fontWeight: '700',
    height: 52,
    lineHeight: 50,
    overflow: 'hidden',
    textAlign: 'center',
    width: 46,
  },
  cellFocused: {
    borderColor: colors.mint,
  },
  resent: {
    color: colors.mint,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
