import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const RING = SIZES.padding * 3.6;
export const RING_WIDTH = SIZES.padding * 0.3;

export const styles = StyleSheet.create({
  total: {
    borderColor: COLORS.accent_card,
    borderRadius: SIZES.padding * 0.75,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: SIZES.padding * 0.75,
    paddingVertical: SIZES.padding * 0.65,
    marginTop: SIZES.padding2,
  },
  total_wash: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  ring: {
    alignItems: 'center',
    height: RING,
    justifyContent: 'center',
    width: RING,
  },
  week: {
    marginHorizontal: 1,
    marginTop: SIZES.padding * 0.7,
  },
  results: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding * 0.75,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: SIZES.padding / 2,
  },
  row_select: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: SIZES.padding * 0.45,
    paddingHorizontal: SIZES.padding3,
    paddingVertical: SIZES.padding2,
  },
  edit: {
    alignItems: 'center',
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    width: SIZES.padding * 2.2,
  },
  row_divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.checkbox_border,
    borderRadius: SIZES.padding * 0.3,
    borderWidth: 1,
    height: SIZES.padding,
    justifyContent: 'center',
    width: SIZES.padding,
  },
  checkbox_checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  logo_tile: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    minWidth: SIZES.padding * 1.7,
  },
  save_error: {
    borderColor: COLORS.primary,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    padding: SIZES.padding2,
    marginTop: SIZES.padding2,
  },
  currency: {
    width: SIZES.padding * 5,
  },
  sheet_button: {
    height: SIZES.padding * 2.3,
  },
  caption: {
    marginTop: SIZES.padding * 0.85,
  },
});
