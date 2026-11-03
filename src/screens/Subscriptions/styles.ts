import { StyleSheet } from 'react-native';
import { COLORS, fonts, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  search: {
    fontFamily: fonts.regular,
    fontSize: (SIZES.padding2 + SIZES.padding3 / 4),
    backgroundColor: COLORS.card,
    borderColor: COLORS.control_border,
    borderRadius: SIZES.padding2 + 2,
    borderWidth: 1,
    color: COLORS.text_primary,
    marginBottom: SIZES.padding2,
    paddingHorizontal: SIZES.padding2 + 2,
    paddingVertical: SIZES.padding2,
  },
  chip: {
    borderColor: COLORS.hairline,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding3,
  },
});
