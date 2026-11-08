import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  section: {
    marginTop: SIZES.padding * 0.85,
  },
  group: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_hint,
    borderRadius: SIZES.padding * 0.75,
    borderWidth: 1,
    marginTop: SIZES.padding3,
    paddingHorizontal: SIZES.padding2,
  },
  menu_row: {
    paddingVertical: SIZES.padding / 2,
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  menu_icon: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay_faint,
    borderRadius: SIZES.padding3,
    height: SIZES.padding * 1.45,
    justifyContent: 'center',
    width: SIZES.padding * 1.35,
  },
});
