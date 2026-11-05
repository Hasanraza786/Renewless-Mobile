import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  options: {
    gap: SIZES.padding * 0.45,
  },
  option: {
    backgroundColor: COLORS.surface_option,
    borderColor: COLORS.line_quiet,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    minHeight: SIZES.padding * 3.8,
    padding: SIZES.padding2,
  },
  option_ai: {
    backgroundColor: COLORS.accent_tint,
    borderColor: COLORS.accent_frame,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: COLORS.tile_raised,
    borderRadius: SIZES.padding * 0.65,
    height: SIZES.padding * 2.1,
    justifyContent: 'center',
    width: SIZES.padding * 2.1,
  },
  icon_ai: {
    backgroundColor: COLORS.accent_chip,
  },
});
