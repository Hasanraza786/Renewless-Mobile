import { StyleSheet } from 'react-native';
import { COLORS, fonts, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  label_auth: {
    marginBottom: SIZES.padding * 0.45,
  },
  label_sheet: {
    marginBottom: SIZES.padding * 0.3,
  },
  wrap: {
    marginBottom: SIZES.padding3 * 2,
  },
  input: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.control_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    color: COLORS.text_primary,
    fontFamily: fonts.regular,
    fontSize: SIZES.md,
    height: SIZES.control_height,
    paddingHorizontal: SIZES.padding2 + 2,
    paddingVertical: 0,
  },
  sheet_input: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.field_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    color: COLORS.text_primary,
    fontFamily: fonts.regular,
    fontSize: SIZES.sm,
    height: SIZES.padding * 2.05,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: 0,
  },
  auth_input: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.social_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    color: COLORS.text_primary,
    fontFamily: fonts.regular,
    fontSize: SIZES.sm,
    height: SIZES.padding * 2.3,
    paddingHorizontal: SIZES.padding * 0.7,
    paddingVertical: 0,
  },
  form_input: {
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.select_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    color: COLORS.text_primary,
    fontFamily: fonts.regular,
    fontSize: SIZES.sm,
    height: SIZES.padding * 2.1,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: 0,
  },
  reveal: {
    alignItems: 'center',
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    right: 0,
    top: 0,
    width: SIZES.padding * 2.2,
  },
  input_focused: {
    borderColor: COLORS.primary,
  },
  input_error: {
    borderColor: COLORS.expired,
  },
});
