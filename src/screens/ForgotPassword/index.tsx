import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import InputField from '../../components/InputField';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { forgotPassword } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.forgot);
  const error = useAppSelector(state => state.auth.error.forgot);
  const [email, setEmail] = useState('');

  function onSubmit() {
    const trimmed = email.trim();
    dispatch(forgotPassword(trimmed, () => navigation.navigate('Otp', { email: trimmed })));
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
            <CustomText text="Forgot password" size={SIZES.screen_heading} line_height={SIZES.screen_heading_line} mb={SIZES.padding3 * 2} />
            <CustomText
              text="Enter the email on your account. We'll keep a code ready for the next step."
              weight={FONTS.regular}
              color={COLORS.text_secondary}
              size={SIZES.body}
              line_height={SIZES.body_line}
              mb={SIZES.padding3 * 2}
              mt={-SIZES.padding3}
            />
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            {error ? (
              <CustomText text={error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.body} line_height={SIZES.body_line} mb={SIZES.padding2} />
            ) : null}
            <CustomButton text="Send code" onPress={onSubmit} disabled={loading} />
            <Pressable accessibilityRole="link" hitSlop={SIZES.padding3} onPress={() => navigation.navigate('Login')} style={styles.link}>
              <CustomText text="Log in" color={COLORS.primary} size={SIZES.button} line_height={SIZES.button_line} />
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
}
