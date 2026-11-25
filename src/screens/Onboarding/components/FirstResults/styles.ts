import { StyleSheet } from 'react-native';
import { SIZES } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  phase: {
    paddingVertical: SIZES.padding * 0.35,
  },
  row: {
    paddingHorizontal: SIZES.padding3,
    paddingVertical: SIZES.padding * 0.8,
  },
  more: {
    paddingHorizontal: SIZES.padding * 0.8,
    paddingVertical: SIZES.padding * 0.6,
  },
});
