import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { resendOtp, verifyOtp } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

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
  const [cell_props, getCellOnLayoutHandler] = useClearByFocusCell({
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
    <Container is_auth>
      <View style={styles.main_view}>
        <KeyboardAvoidingView style={common_styles.flex_1} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}>
            <CustomText text="Enter code" size={(SIZES.padding + SIZES.padding3 / 4)} line_height={SIZES.screen_heading_line} mb={SIZES.padding3 * 2} />
            <CustomText
              text={`Enter the 6-digit code for ${email}.`}
              weight={FONTS.regular}
              color={COLORS.text_secondary}
              size={(SIZES.padding2 + SIZES.padding3 / 4)}
              line_height={SIZES.body_line}
              mb={SIZES.padding3 * 2}
              mt={-SIZES.padding3}
            />
            <CustomText text="6-digit code" weight={FONTS.regular} size={SIZES.padding2} line_height={SIZES.field_label_line} mb={SIZES.padding3} />
            <CodeField
              ref={ref}
              {...cell_props}
              value={code}
              onChangeText={value => setCode(value.replace(/\D/g, '').slice(0, CELL_COUNT))}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeField}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <CustomText
                  key={index}
                  text={symbol || (isFocused ? <Cursor /> : null)}
                  size={(SIZES.padding + SIZES.padding3 / 4)}
                  align="center"
                  line_height={SIZES.screen_heading_line}
                  style={[styles.cell, isFocused && styles.cell_focused]}
                  onLayout={getCellOnLayoutHandler(index)}
                />
              )}
            />
            <Pressable accessibilityRole="link" hitSlop={SIZES.padding3} onPress={onResend} style={styles.link}>
              <CustomText text="Resend code" color={COLORS.primary} size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.button_line} />
            </Pressable>
            {resent ? (
              <CustomText text={resent} color={COLORS.primary} size={(SIZES.padding2 + SIZES.padding3 / 8)} line_height={SIZES.supporting_line} mt={SIZES.padding3} align="center" />
            ) : null}
            {error ? (
              <CustomText text={error} weight={FONTS.regular} color={COLORS.expired} size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.body_line} mb={SIZES.padding2} />
            ) : null}
            <CustomButton
              text="Continue"
              onPress={onContinue}
              disabled={loading || code.length !== CELL_COUNT}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
}
