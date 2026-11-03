import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../../../constants/theme';

const DONUT = SIZES.padding * 3 - SIZES.padding / 10;

export const styles = StyleSheet.create({
  intro: {
    marginTop: SIZES.padding3 / 2,
  },
  total: {
    alignItems: 'center',
    borderColor: colors.accent_card,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 2 - SIZES.padding3 / 8,
    borderWidth: SIZES.padding3 / 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.padding2 + SIZES.padding3 / 4,
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
  donut: {
    alignItems: 'center',
    borderBottomColor: colors.donut_end,
    borderColor: colors.accent,
    borderRadius: DONUT / 2,
    borderRightColor: colors.donut_mid,
    borderWidth: SIZES.padding3 - SIZES.padding3 / 4,
    height: DONUT,
    justifyContent: 'center',
    width: DONUT,
  },
  // Scaled fonts on tall phones may exceed the ring's inner width; the label may overhang it.
  donut_label: {
    alignItems: 'center',
    left: -SIZES.padding,
    position: 'absolute',
    right: -SIZES.padding,
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
    backgroundColor: colors.card,
    borderColor: colors.line_faint,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 2 - SIZES.padding3 / 8,
    borderWidth: SIZES.padding3 / 8,
    marginTop: SIZES.padding3 + SIZES.padding3 / 4,
    overflow: 'hidden',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding3 + SIZES.padding3 / 8,
    paddingHorizontal: SIZES.padding3 + SIZES.padding3 / 4,
    paddingVertical: SIZES.padding2 + SIZES.padding3 / 8,
  },
  row_divider: {
    borderBottomColor: colors.line_quiet,
    borderBottomWidth: SIZES.padding3 / 8,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: colors.checkbox_fill,
    borderColor: colors.checkbox_border,
    borderRadius: SIZES.padding3 - SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding,
    justifyContent: 'center',
    width: SIZES.padding,
  },
  checkbox_checked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  logo_tile: {
    alignItems: 'center',
    backgroundColor: colors.logo_tile,
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
  primary: {
    marginTop: SIZES.padding + SIZES.padding3 / 4,
  },
  link: {
    marginTop: SIZES.padding2 + SIZES.padding3 / 8,
  },
});
