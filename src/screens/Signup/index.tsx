import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout, { AuthError, AuthPrompt } from '../../components/AuthLayout';
import PhoneInputField from '../../components/PhoneInputField';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';
import { colors } from '../../constants/colors';
import { signup } from '../../redux/actions/auth';
import { setAuthError } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList, Gender } from '../../types';
import { joinPhone } from '../../utils/phone';

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
  const [dialCode, setDialCode] = useState('1');
  const [dateOfBirth, setDateOfBirth] = useState('');
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
        phone: joinPhone(dialCode, phone),
        dateOfBirth: dateOfBirth.trim() || undefined,
        gender,
      }),
    );
  }

  return (
    <AuthLayout
      title="Sign up"
      plain
      logo
      footer={
        <AuthPrompt
          label="Already have an account?"
          link="Log in"
          onPress={() => navigation.navigate('Login')}
        />
      }>
      <TextField label="Name" value={name} onChangeText={setName} textContentType="name" />
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="newPassword"
      />
      <TextField
        label="Confirm password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        textContentType="newPassword"
      />
      <PhoneInputField
        phone={phone}
        dialCode={dialCode}
        onChangePhone={setPhone}
        onChangeDialCode={setDialCode}
      />
      <TextField
        label="Date of birth (optional)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholder="YYYY-MM-DD"
      />
      <Text style={styles.genderLabel}>Gender (optional)</Text>
      <View style={styles.choices}>
        {GENDERS.map(choice => {
          const selected = gender === choice.value;
          return (
            <Pressable
              key={choice.value}
              onPress={() => setGender(selected ? null : choice.value)}
              style={[styles.choice, selected && styles.choiceOn]}>
              <Text style={[styles.choiceText, selected && styles.choiceTextOn]}>
                {choice.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <AuthError message={error} />
      <PrimaryButton label="Create account" onPress={onSubmit} disabled={loading} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  genderLabel: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  choices: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  choice: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 8,
  },
  choiceOn: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  choiceText: {
    color: colors.navy,
    fontWeight: '600',
  },
  choiceTextOn: {
    color: colors.white,
  },
});
