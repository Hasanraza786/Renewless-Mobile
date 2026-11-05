import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    left: SIZES.padding,
    position: 'absolute',
    right: SIZES.padding,
  },
  toast: {
    backgroundColor: COLORS.dialog_raised,
    borderColor: COLORS.line_menu,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    minHeight: SIZES.padding * 2.4,
    paddingHorizontal: SIZES.padding * 0.8,
    paddingVertical: SIZES.padding2,
  },
  text: {
    flexShrink: 1,
  },
});
