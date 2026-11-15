import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import SizedBox from '../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import type { AppStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { SUPPORT_MESSAGE_MAX } from '../../utils/support';
import useContactUs, { TOPIC_OPTIONS } from './index.function';
import { styles } from './styles';

// The message is saved for the team; the reply comes back here, in Your messages.
export default function ContactUsScreen({ route }: { route: RouteProp<AppStackParamList, 'ContactUs'> }) {
  const form = useContactUs(route);

  return (
    <Container is_auth readable style={styles.main_view}>
      <Header title="Contact us" onBack={goBack} />
      <KeyboardAvoidingView behavior="padding" style={common_styles.flex_1}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <CustomText text="Tell us what happened. We’ll reply here in the app." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <SizedBox height={SIZES.padding * 0.95} />
          <Dropdown label="Topic" value={form.form_data.topic} options={TOPIC_OPTIONS} onChange={form.setTopic} disabled={form.sending} />
          <SizedBox height={SIZES.padding * 0.7} />
          <InputField
            variant="form"
            label="Message"
            placeholder="What happened? Which screen were you on?"
            value={form.form_data.message}
            onChangeText={form.setMessage}
            error={form.message_error}
            multiline
            maxLength={SUPPORT_MESSAGE_MAX}
            textAlignVertical="top"
            editable={!form.sending}
            counter={form.counter}
            style={styles.message}
          />
          <View style={styles.reply_card}>
            <CustomText text="Reply to" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding * 0.35} text={form.email} size={SIZES.sm} />
            <CustomText mt={SIZES.padding * 0.35} text="You’ll also see our reply in Help & support." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </View>
          <CustomText text="Your app version and phone model are sent with your message to help us fix it. Don’t send passwords or sign-in codes." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {form.request_error ? (
            <View accessibilityRole="alert" style={styles.request_error}>
              <CustomText text={form.request_error} weight={FONTS.regular} color={COLORS.error_text} size={SIZES.sm} />
            </View>
          ) : null}
          <SizedBox height={SIZES.padding * 1.3} />
          <CustomButton variant="primary" text={form.sending ? 'Sending…' : 'Send message'} busy={form.sending} onPress={form.onSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
