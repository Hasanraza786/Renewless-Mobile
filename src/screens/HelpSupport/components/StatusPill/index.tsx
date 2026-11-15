import { View } from 'react-native';
import CustomText from '../../../../components/CustomText';
import RowView from '../../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { SupportMessage } from '../../../../types';
import { SUPPORT_STATUS_LABELS } from '../../../../utils/support';
import { styles } from './styles';

type Props = { status: SupportMessage['status']; unread?: boolean };

// Sent and Closed are quiet; Replied and New reply (a green dot until opened) are green.
export default function StatusPill({ status, unread = false }: Props) {
  const green = unread || status === 'replied';
  return (
    <RowView gap={SIZES.padding / 4} style={[styles.pill, green && styles.pill_green]}>
      {unread ? <View style={styles.dot} /> : null}
      <CustomText text={unread ? 'New reply' : SUPPORT_STATUS_LABELS[status]} weight={FONTS.regular} color={green ? COLORS.primary : COLORS.text_secondary} size={SIZES.xs} />
    </RowView>
  );
}
