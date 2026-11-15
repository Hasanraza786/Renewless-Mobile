import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding * 2,
  },
  first: {
    marginTop: SIZES.padding * 0.75,
  },
  toggle: {
    paddingVertical: SIZES.padding * 0.75,
  },
  // Same line as MenuGroup's rows, above the switch that follows Reminder settings.
  top_divider: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: 1,
  },
  note: {
    marginHorizontal: SIZES.padding / 10,
  },
});
