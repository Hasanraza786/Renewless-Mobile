import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import RowView from '../../components/RowView';
import PhoneInputField from '../../components/PhoneInputField';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import InputField from '../../components/InputField';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { signup } from '../../redux/actions/auth-action';
import { setAuthError } from '../../redux/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList, Gender } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { joinPhone } from '../../utils/phone';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const GENDERS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export default function SignupScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.signup);
  const error = useAppSelector(state => state.auth.error.signup);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [dial_code, setDialCode] = useState('1');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);

  function onSubmit() {
    if (password !== confirm) {
      dispatch(setAuthError({ key: 'signup', value: 'Passwords do not match' }));
      return;
    }
    dispatch(
      signup({
        name,
        email,
        password,
        phone: joinPhone(dial_code, phone),
        dateOfBirth: date_of_birth.trim() || undefined,
        gender,
      }),
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
            <CustomText text="Sign up" size={(SIZES.padding + SIZES.padding3 / 4)} line_height={SIZES.screen_heading_line} mb={SIZES.padding3 * 2} />
            <InputField label="Name" value={name} onChangeText={setName} textContentType="name" />
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
              textContentType="newPassword"
            />
            <InputField
              label="Confirm password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              textContentType="newPassword"
            />
            <PhoneInputField
              phone={phone}
              dial_code={dial_code}
              onChangePhone={setPhone}
              onChangeDialCode={setDialCode}
            />
            <InputField
              label="Date of birth (optional)"
              value={date_of_birth}
              onChangeText={setDateOfBirth}
              placeholder="YYYY-MM-DD"
            />
            <CustomText text="Gender (optional)" weight={FONTS.regular} size={SIZES.padding2} line_height={SIZES.field_label_line} mb={SIZES.padding3} />
            <RowView align_items="stretch" gap={SIZES.padding3} style={{ marginBottom: SIZES.padding3 * 2 }}>
              {GENDERS.map(choice => {
                const selected = gender === choice.value;
                return (
                  <Pressable
                    key={choice.value}
                    onPress={() => setGender(selected ? null : choice.value)}
                    style={[styles.choice, selected && styles.choice_on]}>
                    <CustomText
                      text={choice.label}
                      size={(SIZES.padding2 + SIZES.padding3 / 4)}
                      line_height={SIZES.button_line}
                      weight={selected ? FONTS.regular : FONTS.medium}
                      color={selected ? COLORS.on_accent : COLORS.text_primary}
                    />
                  </Pressable>
                );
              })}
            </RowView>
            {error ? (
              <CustomText text={error} weight={FONTS.regular} color={COLORS.expired} size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.body_line} mb={SIZES.padding2} />
            ) : null}
            <CustomButton text="Create account" onPress={onSubmit} disabled={loading} />
            <CustomText
              text={
                <>
                  Already have an account?{' '}
                  <CustomText
                    text="Log in"
                    color={COLORS.primary}
                    size={(SIZES.padding2 + SIZES.padding3 / 4)}
                    line_height={SIZES.button_line}
                    onPress={() => navigation.navigate('Login')}
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
