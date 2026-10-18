import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { colorsForStatus, statusLabel } from '../../constants/statusColors';
import type { Subscription } from '../../types';
import { formatDate } from '../../utils/dates';
import { formatMoney } from '../../utils/money';

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
      <View style={styles.top}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.badge, { backgroundColor: tone.background, color: tone.text }]}>
          {statusLabel(item.status)}
        </Text>
      </View>
      <Text style={styles.line}>Renews {renewal}</Text>
      <Text style={styles.line}>Started {formatDate(item.startDate)}</Text>
      <Text style={styles.price}>{formatMoney(item.price, item.currency)}</Text>
      {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  name: {
    color: colors.navy,
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
  },
  badge: {
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  line: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 8,
  },
  price: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },
  note: {
    color: colors.navy,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});
