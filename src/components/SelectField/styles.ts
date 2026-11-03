import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const OPTION_HEIGHT = SIZES.padding * 2 + SIZES.padding3 / 4;

export const styles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
  },
  control: {
    alignItems: 'center',
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.select_border,
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
    flexDirection: 'row',
    height: OPTION_HEIGHT,
    paddingLeft: SIZES.padding2 - SIZES.padding3 / 8,
    paddingRight: SIZES.padding * 2 + SIZES.padding3 / 4,
  },
  chevron: {
    position: 'absolute',
    right: SIZES.padding2 + SIZES.padding3 / 4,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  menu: {
    backgroundColor: COLORS.dialog,
    borderColor: COLORS.line_menu,
    borderRadius: SIZES.padding2,
    borderWidth: SIZES.padding3 / 8,
    padding: SIZES.padding3 / 2 + SIZES.padding3 / 8,
    position: 'absolute',
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: SIZES.padding2 },
    shadowOpacity: 0.53,
    shadowRadius: SIZES.padding2 + SIZES.padding3 / 4,
  },
  option: {
    alignItems: 'center',
    borderRadius: SIZES.padding3,
    flexDirection: 'row',
    gap: SIZES.padding2,
    height: OPTION_HEIGHT,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding2 - SIZES.padding3 / 8,
  },
  option_selected: {
    backgroundColor: COLORS.accent_select,
  },
});
