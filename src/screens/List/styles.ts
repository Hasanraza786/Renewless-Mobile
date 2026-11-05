import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding,
    paddingTop: SIZES.padding * 0.7,
  },
  tool: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_sheet,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    minHeight: SIZES.padding * 2.8,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding3,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding,
    justifyContent: 'center',
    minWidth: SIZES.padding,
  },
  count: {
    marginBottom: SIZES.padding * 0.45,
    marginTop: SIZES.padding / 2,
  },
  rows: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.8,
    overflow: 'hidden',
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  empty: {
    alignItems: 'center',
    paddingTop: SIZES.padding * 2.2,
  },
  mascot_ring: {
    alignItems: 'center',
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding * 2.75,
    borderWidth: 1,
    height: SIZES.padding * 5.5,
    justifyContent: 'center',
    overflow: 'visible',
    width: SIZES.padding * 5.5,
  },
  empty_copy: {
    maxWidth: SIZES.padding * 13.5,
  },
  add_manual: {
    backgroundColor: COLORS.accent_line,
    borderColor: COLORS.accent_ring,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginTop: SIZES.padding,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding2,
  },
  // Dialog rows
  option: {
    minHeight: SIZES.padding * 2.2,
    paddingVertical: SIZES.padding3,
  },
  option_divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  box: {
    alignItems: 'center',
    borderColor: COLORS.checkbox_border,
    borderRadius: SIZES.padding * 0.3,
    borderWidth: 1,
    height: SIZES.padding,
    justifyContent: 'center',
    width: SIZES.padding,
  },
  box_checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  done: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding * 0.95,
    paddingVertical: SIZES.padding * 0.45,
  },
});
