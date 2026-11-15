import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  pill: {
    backgroundColor: COLORS.overlay_soft,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding * 0.35,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding * 0.35,
    paddingVertical: SIZES.padding * 0.15,
  },
  pill_green: {
    backgroundColor: COLORS.accent_glow,
    borderColor: COLORS.accent_border,
  },
  dot: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding / 8,
    height: SIZES.padding / 4,
    width: SIZES.padding / 4,
  },
});
