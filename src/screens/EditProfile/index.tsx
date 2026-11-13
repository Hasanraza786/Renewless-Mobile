import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import DateField from '../../components/DateField';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import PhoneInputField from '../../components/PhoneInputField';
import SizedBox from '../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import useEditProfile, { GENDER_OPTIONS } from './index.function';
import { styles } from './styles';

// Back discards the draft; Save returns to Profile. Optional details never block saving.
export default function EditProfileScreen() {
  const form = useEditProfile();

  return (
    <Container is_auth style={styles.main_view}>
      <Header title="Edit profile" onBack={goBack} />
      <KeyboardAvoidingView behavior="padding" style={common_styles.flex_1}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <CustomText text="Keep your account details up to date." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <SizedBox height={SIZES.padding * 0.95} />
          <InputField
            variant="form"
            label="Name"
            placeholder="Your name"
            value={form.form_data.name}
            onChangeText={value => form.update('name', value)}
            error={form.errors.name}
            autoComplete="name"
            textContentType="name"
            editable={!form.saving}
          />
          <View style={styles.email_card}>
            <CustomText text="Login email" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding * 0.35} text={form.user?.email ?? ''} size={SIZES.sm} />
            <CustomText mt={SIZES.padding * 0.35} text="Email changes require verification." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </View>
          <PhoneInputField
            label="Phone · Optional"
            country={form.form_data.phone_country}
            national={form.form_data.phone}
            onChangeCountry={value => form.update('phone_country', value)}
            onChangeNational={value => form.update('phone', value)}
            editable={!form.saving}
          />
          <SizedBox height={SIZES.padding * 0.7} />
          <DateField
            variant="form"
            label="Date of birth · Optional"
            value={form.form_data.date_of_birth}
            maximum={form.today}
            onChange={value => form.update('date_of_birth', value)}
            error={form.errors.date_of_birth}
          />
          <SizedBox height={SIZES.padding * 0.7} />
          <Dropdown label="Gender · Optional" value={form.form_data.gender} options={GENDER_OPTIONS} onChange={value => form.update('gender', value)} />
          <CustomText mt={SIZES.padding * 0.8} text="Optional details are never required to use Renewless." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {form.request_error ? <CustomText mt={SIZES.padding2} text={form.request_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} accessibility_role="alert" /> : null}
          <SizedBox height={SIZES.padding * 1.3} />
          <CustomButton variant="primary" text="Save changes" busy={form.saving} onPress={form.onSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
