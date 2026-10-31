import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneInputField from '../../components/PhoneInputField';
import RowView from '../../components/RowView';
import CustomButton from '../../components/CustomButton';
import Container from '../../components/Container';
import Header from '../../components/Header';
import CustomText from '../../components/CustomText';
import InputField from '../../components/InputField';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { updateProfile } from '../../redux/actions/profile-action';
import { selectUser } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, Gender } from '../../types';
import { fullPhone, joinPhone, splitPhone } from '../../utils/phone';
import { styles } from './styles';

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
  const stored_phone = splitPhone(fullPhone(user));
  const [phone, setPhone] = useState(stored_phone.phone);
  const [dial_code, setDialCode] = useState(stored_phone.dial_code);
  const [date_of_birth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [gender, setGender] = useState<Gender | null>(user?.gender || null);
  function onSubmit() {
    dispatch(
      updateProfile(
        {
          name,
          email,
          phone: joinPhone(dial_code, phone),
          dateOfBirth: date_of_birth.trim(),
          gender,
        },
        () => navigation.goBack(),
      ),
    );
  }

  return (
    <Container is_auth>
      <View style={styles.main_view}>
      <Header title="Edit profile" onBack={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <InputField label="Name" value={name} onChangeText={setName} />
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
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
        <CustomText text="Gender (optional)" weight={FONTS.regular} size={SIZES.field_label} line_height={SIZES.field_label_line} mb={SIZES.padding3} />
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
                  size={SIZES.button}
                  line_height={SIZES.button_line}
                  weight={selected ? FONTS.regular : FONTS.medium}
                  color={selected ? COLORS.on_accent : COLORS.text_primary}
                />
              </Pressable>
            );
          })}
        </RowView>
        {error ? <CustomText text={error} weight={FONTS.regular} size={SIZES.body} line_height={SIZES.body_line} mb={SIZES.padding2} /> : null}
        <CustomButton text="Save" onPress={onSubmit} disabled={loading} />
      </ScrollView>
      </View>
    </Container>
  );
}
