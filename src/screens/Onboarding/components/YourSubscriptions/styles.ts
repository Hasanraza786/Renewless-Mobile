import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const RING = SIZES.padding * 3 + SIZES.padding2;
export const RING_WIDTH = SIZES.padding3 - SIZES.padding3 / 4;

export const styles = StyleSheet.create({
  intro: {
    marginTop: SIZES.padding3 / 2,
  },
  inbox: {
    marginTop: SIZES.padding2 + SIZES.padding3 / 4,
  },
  total: {
    alignItems: 'center',
    borderColor: COLORS.accent_card,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 2 - SIZES.padding3 / 8,
    borderWidth: SIZES.padding3 / 8,
    flexDirection: 'row',
    gap: SIZES.padding2,
    marginTop: SIZES.padding2,
    overflow: 'hidden',
    paddingHorizontal: SIZES.padding2 + SIZES.padding3 / 2 - SIZES.padding3 / 8,
    paddingVertical: SIZES.padding2 + SIZES.padding3 / 8,
  },
  total_wash: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  total_text: {
    flex: 1,
  },
  ring: {
    alignItems: 'center',
    height: RING,
    justifyContent: 'center',
    width: RING,
  },
  ring_svg: {
    position: 'absolute',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.padding3 / 8,
    marginTop: SIZES.padding2 + SIZES.padding3 / 4,
  },
  caption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.padding2 + SIZES.padding3 / 2 + SIZES.padding3 / 8,
  },
  caption_label: {
    letterSpacing: SIZES.padding3 / 16,
  },
  results: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 2 - SIZES.padding3 / 8,
    borderWidth: SIZES.padding3 / 8,
    marginTop: SIZES.padding3 + SIZES.padding3 / 4,
    overflow: 'hidden',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  row_select: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: SIZES.padding3 + SIZES.padding3 / 8,
    paddingHorizontal: SIZES.padding3,
    paddingVertical: SIZES.padding2,
  },
  edit: {
    alignItems: 'center',
    height: SIZES.padding * 2 + SIZES.padding3 / 2,
    justifyContent: 'center',
    width: SIZES.padding * 2 + SIZES.padding3 / 2,
  },
  row_divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: SIZES.padding3 / 8,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.checkbox_border,
    borderRadius: SIZES.padding3 - SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
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
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4,
    height: SIZES.padding * 2 - SIZES.padding3 / 2,
    justifyContent: 'center',
    minWidth: SIZES.padding * 2 - SIZES.padding3 / 2 - SIZES.padding3 / 4,
  },
  row_text: {
    flex: 1,
  },
  info: {
    marginTop: SIZES.padding2,
  },
  save_error: {
    borderColor: COLORS.primary,
    borderRadius: SIZES.padding2,
    borderWidth: SIZES.padding3 / 8,
    marginTop: SIZES.padding2,
    padding: SIZES.padding2,
  },
  primary: {
    marginTop: SIZES.padding + SIZES.padding3 / 4,
  },
  price_row: {
    flexDirection: 'row',
    gap: SIZES.padding3 + SIZES.padding3 / 4,
  },
  amount: {
    flex: 1,
  },
  currency: {
    width: SIZES.padding * 5,
  },
  sheet_field: {
    marginTop: SIZES.padding + SIZES.padding3 - SIZES.padding3 / 4,
  },
  sheet_button: {
    height: SIZES.padding * 2 + SIZES.padding3 - SIZES.padding3 / 4,
  },
  sheet_submit: {
    marginTop: SIZES.padding2,
  },
  link: {
    marginTop: SIZES.padding2 + SIZES.padding3 / 8,
  },
});
