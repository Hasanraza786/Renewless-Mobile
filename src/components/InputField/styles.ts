import { StyleSheet } from 'react-native';
import { colors, fonts, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  wrap: {
    marginBottom: SIZES.padding3 * 2,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.control_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: SIZES.body,
    height: SIZES.control_height,
    paddingHorizontal: SIZES.padding2 + 2,
    paddingVertical: 0,
  },
  input_focused: {
    borderColor: colors.accent,
  },
  input_error: {
    borderColor: colors.expired,
  },
});
