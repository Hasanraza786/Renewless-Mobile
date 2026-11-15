import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  row: {
    paddingVertical: SIZES.padding * 0.55,
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  // Android measured a short date a hair narrow and hid its month (2 Nov drew 2): the column keeps a minimum
  // width and the date fills it, right-aligned.
  meta: {
    alignItems: 'flex-end',
    minWidth: SIZES.padding * 3,
  },
  date: {
    alignSelf: 'stretch',
  },
});
