import { ScrollView, View } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import RowView from '../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import type { AppStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { SUPPORT_TOPIC_LABELS } from '../../utils/support';
import StatusPill from '../HelpSupport/components/StatusPill';
import useSupportMessage from './index.function';
import { styles } from './styles';

// Read-only thread: the user's message on the right, the team's replies on the left; Send another message is pinned.
export default function SupportMessageScreen({ route }: { route: RouteProp<AppStackParamList, 'SupportMessage'> }) {
  const thread = useSupportMessage(route);
  const message = thread.message;

  return (
    <Container is_auth readable style={styles.main_view}>
      <Header title="Message" onBack={goBack} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {message ? (
          <>
            <RowView justify_content="space-between" style={styles.top}>
              <CustomText text={SUPPORT_TOPIC_LABELS[message.topic]} size={SIZES.md} style={common_styles.flex_1} />
              <StatusPill status={message.status} />
            </RowView>
            <View style={[styles.bubble, styles.bubble_you]}>
              <RowView justify_content="space-between">
                <CustomText text="You" size={SIZES.sm} />
                <CustomText text={message.sent_label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
              </RowView>
              <CustomText mt={SIZES.padding * 0.35} text={message.message} weight={FONTS.regular} size={SIZES.sm} line_height={SIZES.padding} />
            </View>
            {message.replies.map(reply => (
              <View key={reply.sent_label + reply.body.length} style={[styles.bubble, styles.bubble_team]}>
                <RowView gap={SIZES.padding * 0.35}>
                  <View style={styles.team_mark}>
                    <CustomText text="R" color={COLORS.primary} size={SIZES.xs} />
                  </View>
                  <CustomText text="Renewless support" size={SIZES.sm} style={common_styles.flex_1} />
                  <CustomText text={reply.sent_label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
                </RowView>
                <CustomText mt={SIZES.padding * 0.35} text={reply.body} weight={FONTS.regular} size={SIZES.sm} line_height={SIZES.padding} />
              </View>
            ))}
            {message.status === 'sent' ? (
              <View style={styles.note}>
                <CustomText text="We’ve got your message" size={SIZES.sm} />
                <CustomText mt={SIZES.padding * 0.3} text="We’ll reply here in the app." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              </View>
            ) : null}
            {message.status === 'closed' ? (
              <CustomText mt={SIZES.padding / 5} text="This conversation is closed. Send a new message if you still need help." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            ) : null}
          </>
        ) : thread.missing ? (
          <CustomText mt={SIZES.padding} text="This message isn’t available." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        ) : null}
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton variant="secondary" text="Send another message" onPress={thread.sendAnother} />
      </View>
    </Container>
  );
}
