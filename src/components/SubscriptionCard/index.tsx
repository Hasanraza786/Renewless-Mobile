import {
  Pressable,
} from 'react-native';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { colorsForStatus, statusLabel } from '../../constants/status_colors';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import type { Subscription } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { formatDate } from '../../utils/dates';
import { formatMoney } from '../../utils/money';
import { styles } from './styles';

type Props = {
  item: Subscription;
  onPress?: () => void;
};

export default function SubscriptionCard({ item, onPress }: Props) {
  const tone = colorsForStatus(item.status);
  const renewal =
    item.renewalSource === 'predicted'
      ? `${formatDate(item.nextRenewal)} Estimated`
      : formatDate(item.nextRenewal);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.card}>
      <RowView justify_content="space-between" gap={SIZES.padding2}>
        <CustomText text={item.name} size={SIZES.md} style={common_styles.flex_1} />
        <CustomText
          text={statusLabel(item.status)}
          size={SIZES.sm}
          color={tone.text}
          style={[styles.badge, { backgroundColor: tone.background }]}
        />
      </RowView>
      <CustomText
        text={`Renews ${renewal}`}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
        mt={SIZES.padding3}
      />
      <CustomText
        text={`Started ${formatDate(item.startDate)}`}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
        mt={SIZES.padding3}
      />
      <CustomText text={formatMoney(item.price, item.currency)} size={SIZES.lg} mt={SIZES.padding / 2} />
      {item.note ? (
        <CustomText
          text={item.note}
          weight={FONTS.regular}
          size={SIZES.md}
          mt={SIZES.padding / 2}
        />
      ) : null}
    </Pressable>
  );
}
