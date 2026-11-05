import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding,
  },
  intro: {
    marginTop: SIZES.padding * 0.7,
  },
  controls: {
    marginTop: SIZES.padding * 0.8,
  },
  // Year and Month share the row in the prototype's 137 : 192 proportion.
  year: {
    flex: 1,
  },
  month: {
    flex: 1.4,
  },
  summary: {
    backgroundColor: COLORS.dialog,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    marginTop: SIZES.padding2,
    paddingHorizontal: SIZES.padding * 0.7,
    paddingVertical: SIZES.padding2,
  },
  search: {
    marginTop: SIZES.padding * 0.7,
  },
  count: {
    marginBottom: SIZES.padding2,
    marginTop: SIZES.padding * 0.75,
  },
  rows: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.8,
    overflow: 'hidden',
  },
  row: {
    padding: SIZES.padding2,
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.dialog_raised,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    width: SIZES.padding * 1.7,
  },
  amount: {
    alignItems: 'flex-end',
  },
  empty: {
    alignItems: 'center',
    paddingBottom: SIZES.padding * 1.6,
    paddingHorizontal: SIZES.padding3,
    paddingTop: SIZES.padding * 3.9,
  },
  empty_period: {
    paddingTop: SIZES.padding * 1.5,
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
  mascot_ring_small: {
    borderRadius: SIZES.padding * 2.4,
    height: SIZES.padding * 4.8,
    width: SIZES.padding * 4.8,
  },
  empty_copy: {
    maxWidth: SIZES.padding * 14,
  },
  empty_action: {
    justifyContent: 'center',
    marginTop: SIZES.padding * 1.1,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding * 0.8,
  },
});
