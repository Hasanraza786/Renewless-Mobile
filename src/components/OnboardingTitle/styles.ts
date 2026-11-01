import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  eyebrow: {
    letterSpacing: SIZES.padding2 / 8,
    marginBottom: SIZES.padding2 + SIZES.padding3 / 8,
  },
  title: {
    letterSpacing: -SIZES.padding3 / 8,
  },
});
