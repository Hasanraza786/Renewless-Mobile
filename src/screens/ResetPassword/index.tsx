import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import InputField from '../../components/InputField';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { resetPassword } from '../../redux/actions/auth-action';
import { setAuthError } from '../../redux/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

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
    <Container is_auth>
      <View style={styles.main_view}>
        <KeyboardAvoidingView style={common_styles.flex_1} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}>
            <CustomText text="Reset password" size={SIZES.screen_heading} line_height={SIZES.screen_heading_line} mb={SIZES.padding3 * 2} />
            <InputField
              label="New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="newPassword"
            />
            <InputField
              label="Confirm password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              textContentType="newPassword"
            />
            {error ? (
              <CustomText text={error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.body} line_height={SIZES.body_line} mb={SIZES.padding2} />
            ) : null}
            <CustomButton text="Save password" onPress={onSubmit} disabled={loading} />
            <Pressable accessibilityRole="link" hitSlop={SIZES.padding3} onPress={() => navigation.navigate('Login')} style={styles.link}>
              <CustomText text="Log in" color={COLORS.primary} size={SIZES.button} line_height={SIZES.button_line} />
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
}
