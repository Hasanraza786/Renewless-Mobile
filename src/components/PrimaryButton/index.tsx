import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/colors';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ label, onPress, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.navy,
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
