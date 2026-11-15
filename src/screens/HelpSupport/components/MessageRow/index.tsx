import { View } from 'react-native';
import { chevron_right_icon } from '../../../../assets/icons';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import RowView from '../../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { SupportMessage } from '../../../../types';
import { common_styles } from '../../../../utils/common_styles';
import { SUPPORT_STATUS_LABELS, SUPPORT_TOPIC_LABELS } from '../../../../utils/support';
import StatusPill from '../StatusPill';
import { styles } from './styles';

type Props = { message: SupportMessage; divider: boolean; onPress: (id: string) => void };

// One sent message in Help & support and Your messages: topic, one-line preview, status and sent date.
export default function MessageRow({ message, divider, onPress }: Props) {
  const topic = SUPPORT_TOPIC_LABELS[message.topic];
  const status = message.unread ? 'new reply' : SUPPORT_STATUS_LABELS[message.status];
  return (
    <RowView
      gap={SIZES.padding / 2}
      accessibilityRole="button"
      accessibilityLabel={`${topic}, ${status}, sent ${message.sent_label}`}
      onPress={() => onPress(message.id)}
      style={[styles.row, divider && styles.divider]}>
      <View style={common_styles.flex_1}>
        <CustomText text={topic} size={SIZES.sm} />
        <CustomText mt={SIZES.padding / 4} text={message.message} number_of_lines={1} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>
      <View style={styles.meta}>
        <StatusPill status={message.status} unread={message.unread} />
        <CustomText mt={SIZES.padding / 4} text={message.sent_label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} align="right" style={styles.date} />
      </View>
      <Icons name={chevron_right_icon} />
    </RowView>
  );
}
