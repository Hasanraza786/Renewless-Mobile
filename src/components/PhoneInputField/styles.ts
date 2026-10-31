import { StyleSheet } from 'react-native';
import { colors, fonts, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  wrap: {
    marginBottom: SIZES.padding3 * 2,
  },
  row: {
    backgroundColor: colors.card,
    borderColor: colors.control_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    height: SIZES.control_height,
    paddingHorizontal: SIZES.padding / 2,
  },
  row_focused: {
    borderColor: colors.accent,
  },
  input: {
    fontFamily: fonts.regular,
    color: colors.text,
    flex: 1,
    fontSize: SIZES.body,
    height: SIZES.control_height,
    paddingVertical: 0,
  },
});
