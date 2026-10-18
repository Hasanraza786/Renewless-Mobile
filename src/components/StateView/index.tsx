import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import PrimaryButton from '../PrimaryButton';

type Props = {
  status: 'loading' | 'failed' | 'empty';
  message: string;
  onRetry?: () => void;
};

export default function StateView({ status, message, onRetry }: Props) {
  return (
    <View style={styles.wrap}>
      {status === 'loading' ? <ActivityIndicator color={colors.mint} /> : null}
      <Text style={styles.message}>{message}</Text>
      {status === 'failed' && onRetry ? (
        <PrimaryButton label="Try again" onPress={onRetry} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 16,
    paddingVertical: 28,
  },
  message: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
  },
});
