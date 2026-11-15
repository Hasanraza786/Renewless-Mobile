import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  row: {
    minHeight: SIZES.padding * 2.4,
    paddingVertical: SIZES.padding / 2,
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  chevron_open: {
    transform: [{ rotate: '90deg' }],
  },
});
