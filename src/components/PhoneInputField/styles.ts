import { StyleSheet } from 'react-native';
import { COLORS, fonts, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  wrap: {
    marginBottom: SIZES.padding3 * 2,
  },
  row: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.control_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    height: SIZES.control_height,
    paddingHorizontal: SIZES.padding / 2,
  },
  row_focused: {
    borderColor: COLORS.primary,
  },
  input: {
    fontFamily: fonts.regular,
    color: COLORS.text_primary,
    flex: 1,
    fontSize: SIZES.md,
    height: SIZES.control_height,
    paddingVertical: 0,
  },
});
