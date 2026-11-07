import { StyleSheet } from 'react-native';
import { COLORS, fonts, SIZES } from '../../constants/theme';

// Same box as the InputField form variant, split into the country button and the number.
export const styles = StyleSheet.create({
  field: {
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.select_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    height: SIZES.padding * 2.1,
    overflow: 'hidden',
  },
  field_focused: {
    borderColor: COLORS.primary,
  },
  country: {
    borderRightColor: COLORS.select_border,
    borderRightWidth: 1,
    paddingLeft: SIZES.padding2,
    paddingRight: SIZES.padding / 2,
  },
  input: {
    color: COLORS.text_primary,
    fontFamily: fonts.regular,
    fontSize: SIZES.sm,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: 0,
  },
  search: {
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.select_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    color: COLORS.text_primary,
    fontFamily: fonts.regular,
    fontSize: SIZES.sm,
    height: SIZES.padding * 2.1,
    marginBottom: SIZES.padding * 0.4,
    paddingHorizontal: SIZES.padding2,
  },
  row: {
    borderBottomColor: COLORS.line_faint,
    borderBottomWidth: 1,
    minHeight: SIZES.padding * 2.4,
  },
});
