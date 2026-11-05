import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { security_accent_icon } from '../../assets/icons';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import InputField from '../../components/InputField';
import SizedBox from '../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import useChangePassword from './index.function';
import { styles } from './styles';

export default function ChangePasswordScreen() {
  const form = useChangePassword();

  if (!form.has_password) {
    return (
      <Container is_auth style={styles.main_view}>
        <Header title="Change password" onBack={goBack} />
        <View style={styles.provider}>
          <View style={styles.mark}>
            <Icons name={security_accent_icon} />
          </View>
          <CustomText mt={SIZES.padding} text={`You sign in with ${form.provider}`} size={SIZES.lg} accessibility_role="header" />
          <CustomText mt={SIZES.padding2} text={`Your ${form.provider} account manages your password. You don’t need a separate Renewless password.`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <SizedBox height={SIZES.padding * 0.85} />
          <CustomButton variant="secondary" text="Back to Profile" onPress={goBack} />
        </View>
      </Container>
    );
  }

  const field = (key: 'current_password' | 'new_password' | 'confirm_password', label: string, new_password: boolean, hint?: string) => (
    <InputField
      variant="form"
      label={label}
      value={form.form_data[key]}
      onChangeText={form.update(key)}
      error={form.errors[key]}
      hint={hint}
      secureTextEntry
      reveal
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete={new_password ? 'new-password' : 'current-password'}
      textContentType={new_password ? 'newPassword' : 'password'}
      editable={!form.updating}
      style={styles.input}
    />
  );

  return (
    <Container is_auth style={styles.main_view}>
      <Header title="Change password" onBack={goBack} />
      <KeyboardAvoidingView behavior="padding" style={common_styles.flex_1}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <View style={styles.mark}>
            <Icons name={security_accent_icon} />
          </View>
          <CustomText mt={SIZES.padding * 0.8} text={'A fresh password.\nA little more peace of mind.'} size={SIZES.lg} letter_spacing={-0.3} accessibility_role="header" />
          <CustomText mt={SIZES.padding / 2} text="Update the password you use to sign in to Renewless." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} style={styles.intro} />
          <SizedBox height={SIZES.padding * 1.3} />
          {field('current_password', 'Current password', false)}
          <SizedBox height={SIZES.padding * 0.9} />
          {field('new_password', 'New password', true, 'Use at least 8 characters.')}
          <SizedBox height={SIZES.padding * 0.9} />
          {field('confirm_password', 'Confirm new password', true)}
          {form.request_error ? (
            <View accessibilityRole="alert" style={styles.request_error}>
              <CustomText text={form.request_error} weight={FONTS.regular} color={COLORS.error_text} size={SIZES.sm} />
            </View>
          ) : null}
        </ScrollView>
        <View style={styles.footer}>
          <CustomButton variant="primary" text={form.updating ? 'Updating…' : 'Update password'} busy={form.updating} onPress={form.onSubmit} />
          <CustomText mt={SIZES.padding / 2} text="Your tracked subscriptions stay unchanged." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}
