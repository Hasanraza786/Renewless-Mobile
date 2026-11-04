import { Pressable, View } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout from '../../components/AuthLayout';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import type { AuthStackParamList } from '../../types';
import useOtp, { CODE_LENGTH } from './index.function';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

export default function OtpScreen(props: Props) {
  const otp = useOtp(props);
  const ref = useBlurOnFulfill({ value: otp.code, cellCount: CODE_LENGTH });
  const [cell_props, getCellOnLayoutHandler] = useClearByFocusCell({ value: otp.code, setValue: otp.onChangeCode });

  return (
    <AuthLayout
      onBack={otp.onBack}
      title={otp.reset ? 'Check your email' : 'Verify your email'}
      copy={otp.reset ? 'Enter the code we sent to reset your password.' : 'One last step. Enter the code sent to your email.'}>
      <View style={styles.destination}>
        <CustomText text="Code sent to" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        <CustomText mt={SIZES.padding3} text={otp.email} size={SIZES.sm} />
        <Pressable accessibilityRole="button" onPress={otp.onBack} style={styles.change_email}>
          <CustomText text="Change email" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </Pressable>
      </View>

      <CustomText text="Verification code" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding / 2} />

      <CodeField
        ref={ref}
        {...cell_props}
        value={otp.code}
        onChangeText={otp.onChangeCode}
        cellCount={CODE_LENGTH}
        rootStyle={styles.code}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        accessibilityLabel="Verification code"
        accessibilityHint={otp.code_error || undefined}
        onSubmitEditing={otp.onSubmit}
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} onLayout={getCellOnLayoutHandler(index)} style={[styles.cell, isFocused && styles.cell_focused, !!otp.code_error && styles.cell_error]}>
            <CustomText text={symbol} weight={FONTS.regular} size={SIZES.sm} />
          </View>
        )}
      />
      {otp.code_error ? (
        <CustomText mt={SIZES.padding * 0.35} text={otp.code_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} />
      ) : null}

      <CustomText mt={SIZES.padding * 0.7} text="Code expires in 5 minutes" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding2} />

      <CustomButton variant="primary" text={otp.reset ? 'Verify code' : 'Verify email'} disabled={otp.loading} busy={otp.loading} onPress={otp.onSubmit} style={styles.submit} />

      <View style={styles.resend}>
        <CustomText text="Didn’t receive a code?" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
        <Pressable accessibilityRole="button" onPress={otp.onResend} style={styles.resend_button}>
          <CustomText text="Resend code" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </Pressable>
        <CustomText text="Available after 2 minutes" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
      </View>
    </AuthLayout>
  );
}
