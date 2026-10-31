import { StyleSheet } from 'react-native';
import { colors, fonts, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  search: {
    fontFamily: fonts.regular,
    fontSize: SIZES.body,
    backgroundColor: colors.card,
    borderColor: colors.control_border,
    borderRadius: SIZES.padding2 + 2,
    borderWidth: 1,
    color: colors.text,
    marginBottom: SIZES.padding2,
    paddingHorizontal: SIZES.padding2 + 2,
    paddingVertical: SIZES.padding2,
  },
  chip: {
    borderColor: colors.hairline,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding3,
  },
});
