import { Pressable, View } from 'react-native';
import ConfirmDialog from '../../../components/ConfirmDialog';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import Mascot from '../../../components/Mascot';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import type { AiChatController } from '../index.function';
import { styles } from '../styles';

const ROWS = [
  ['What’s shared', 'Your messages, voice notes, images and PDFs in this chat'],
  ['Shared with', 'Google Gemini, our AI partner'],
  ['How it’s used', 'Only to suggest subscription details for you to review.'],
];

// One-time consent before anything reaches Google Gemini; Not now leaves the chat unused.
export default function ConsentDialog({ chat }: { chat: AiChatController }) {
  if (!chat.show_consent) return null;
  return (
    <ConfirmDialog title="Before you chat with Loop" close_label="Not now" onClose={chat.declineConsent} art={<Mascot expression="happy" size={SIZES.padding * 3.2} label="Loop" />}>
      <CustomText mt={SIZES.padding3} text="Loop uses an AI service to read what you send and fill in your subscription details." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
      <View style={styles.consent_rows}>
        {ROWS.map(([label, value], index) => (
          <View key={label} accessible style={[styles.consent_row, index < ROWS.length - 1 && styles.consent_divider]}>
            <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding * 0.15} text={value} weight={FONTS.regular} size={SIZES.sm} />
          </View>
        ))}
      </View>
      <CustomText mt={SIZES.padding2} text="You review every detail before anything is saved." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
      <Pressable accessibilityRole="link" onPress={chat.openPrivacy} style={styles.consent_link}>
        <CustomText text="How we use your data ›" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} align="center" />
      </Pressable>
      <RowView gap={SIZES.padding * 0.45}>
        <CustomButton variant="secondary" text="Not now" onPress={chat.declineConsent} style={common_styles.flex_1} />
        <CustomButton variant="primary" text="Agree and continue" onPress={chat.agreeConsent} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}
