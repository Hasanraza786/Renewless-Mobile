import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneInputField from '../../components/PhoneInputField';
import PrimaryButton from '../../components/PrimaryButton';
import Screen from '../../components/Screen';
import ScreenHeader from '../../components/ScreenHeader';
import TextField from '../../components/TextField';
import { colors } from '../../constants/colors';
import { updateProfile } from '../../redux/actions/profile';
import { selectUser } from '../../redux/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, Gender } from '../../types';
import { fullPhone, joinPhone, splitPhone } from '../../utils/phone';

type Props = NativeStackScreenProps<AppStackParamList, 'EditProfile'>;

const GENDERS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export default function EditProfileScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(state => state.profile.loading);
  const error = useAppSelector(state => state.profile.error);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const storedPhone = splitPhone(fullPhone(user));
  const [phone, setPhone] = useState(storedPhone.phone);
  const [dialCode, setDialCode] = useState(storedPhone.dialCode);
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [gender, setGender] = useState<Gender | null>(user?.gender || null);
  function onSubmit() {
    dispatch(
      updateProfile(
        {
          name,
          email,
          phone: joinPhone(dialCode, phone),
          dateOfBirth: dateOfBirth.trim(),
          gender,
        },
        () => navigation.goBack(),
      ),
    );
  }

  return (
    <Screen isAuth>
      <ScreenHeader title="Edit profile" onBack={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TextField label="Name" value={name} onChangeText={setName} />
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
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
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton label="Save" onPress={onSubmit} disabled={loading} />
      </ScrollView>
    </Screen>
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
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
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
  error: {
    color: colors.navy,
    marginBottom: 12,
  },
});
