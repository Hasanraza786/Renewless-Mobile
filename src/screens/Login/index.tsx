import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import InputField from '../../components/InputField';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { login } from '../../redux/actions/auth-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.login);
  const error = useAppSelector(state => state.auth.error.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    dispatch(login(email.trim(), password));
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
            <CustomText text="Log in" size={(SIZES.padding + SIZES.padding3 / 4)} line_height={SIZES.screen_heading_line} mb={SIZES.padding3 * 2} />
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
            />
            <Pressable
              accessibilityRole="link"
              hitSlop={SIZES.padding3}
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgot}>
              <CustomText text="Forgot password" color={COLORS.primary} size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.button_line} />
            </Pressable>
            {error ? (
              <CustomText text={error} weight={FONTS.regular} color={COLORS.expired} size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.body_line} mb={SIZES.padding2} />
            ) : null}
            <CustomButton text="Log in" onPress={onSubmit} disabled={loading} />
            <CustomText
              text={
                <>
                  Don’t have an account?{' '}
                  <CustomText
                    text="Create an account"
                    color={COLORS.primary}
                    size={(SIZES.padding2 + SIZES.padding3 / 4)}
                    line_height={SIZES.button_line}
                    onPress={() => navigation.navigate('Signup')}
                  />
                </>
              }
              weight={FONTS.regular}
              color={COLORS.text_secondary}
              size={(SIZES.padding2 + SIZES.padding3 / 4)}
              line_height={SIZES.body_line}
              align="center"
              mt={SIZES.padding2 * 2}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
}
