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
  // Pinned above the safe area; the hairline spans the full width.
  footer: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: 1,
    marginHorizontal: -SIZES.padding,
    paddingBottom: SIZES.padding3,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
});
