import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

type Props = {
  title: string;
  onBack?: () => void;
  actionLabel?: string;
  onAction?: () => void;
};

export default function ScreenHeader({ title, onBack, actionLabel, onAction }: Props) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable accessibilityRole="button" onPress={onBack} style={styles.side}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
      <Text style={styles.title}>{title}</Text>
      {actionLabel && onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} style={styles.side}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
  },
  side: {
    minWidth: 64,
  },
  title: {
    color: colors.navy,
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  back: {
    color: colors.mint,
    fontSize: 16,
    fontWeight: '600',
  },
  action: {
    color: colors.mint,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },
});
