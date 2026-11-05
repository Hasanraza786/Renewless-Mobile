import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const OPTION_HEIGHT = SIZES.padding * 2.1;

export const styles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
  },
  control: {
    alignItems: 'center',
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.select_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    flexDirection: 'row',
    height: OPTION_HEIGHT,
    paddingLeft: SIZES.padding * 0.55,
    paddingRight: SIZES.padding * 2.1,
  },
  chevron: {
    position: 'absolute',
    right: SIZES.padding * 0.7,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  menu: {
    backgroundColor: COLORS.dialog,
    borderColor: COLORS.line_menu,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    padding: SIZES.padding / 4,
    position: 'absolute',
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: SIZES.padding2 },
    shadowOpacity: 0.53,
    shadowRadius: SIZES.padding * 0.7,
  },
  option: {
    borderRadius: SIZES.padding3,
    height: OPTION_HEIGHT,
    paddingHorizontal: SIZES.padding * 0.55,
  },
  option_selected: {
    backgroundColor: COLORS.accent_select,
  },
});
