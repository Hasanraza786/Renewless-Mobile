import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding * 1.9,
    paddingTop: SIZES.padding * 0.7,
  },
  rows: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.8,
    marginTop: SIZES.padding * 0.95,
    overflow: 'hidden',
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  empty: {
    alignItems: 'center',
    paddingTop: SIZES.padding * 1.5,
  },
  mascot_ring: {
    alignItems: 'center',
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding * 2.4,
    borderWidth: 1,
    height: SIZES.padding * 4.8,
    justifyContent: 'center',
    overflow: 'visible',
    width: SIZES.padding * 4.8,
  },
});
