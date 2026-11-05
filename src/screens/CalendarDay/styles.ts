import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding,
    paddingTop: SIZES.padding * 0.7,
  },
  rows: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.8,
    marginTop: SIZES.padding2,
    overflow: 'hidden',
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
});
