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
  search: {
    marginTop: SIZES.padding * 0.65,
  },
  tools: {
    marginTop: SIZES.padding * 0.4,
  },
  filter: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_sheet,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    minHeight: SIZES.padding * 1.9,
    paddingHorizontal: SIZES.padding2,
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
    marginBottom: SIZES.padding * 0.4,
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
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding * 2.7,
    borderWidth: 1,
    height: SIZES.padding * 5.4,
    justifyContent: 'center',
    overflow: 'visible',
    width: SIZES.padding * 5.4,
  },
  empty_copy: {
    maxWidth: SIZES.padding * 13.5,
  },
  empty_action: {
    justifyContent: 'center',
    marginTop: SIZES.padding,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding * 0.8,
  },
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
