import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  art: {
    alignItems: 'center',
    flexDirection: 'row',
    // 15pt beside the 48-wide arrow box keeps the prototype's 18pt gap to its 42pt-wide drawing.
    gap: SIZES.padding - SIZES.padding3 / 2 - SIZES.padding3 / 8,
    height: SIZES.padding * 7 - SIZES.padding3 / 2 - SIZES.padding3 / 8,
    justifyContent: 'center',
  },
  brand: {
    alignItems: 'center',
    gap: SIZES.padding3 + SIZES.padding3 / 4,
  },
  tile: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line_faint,
    borderRadius: SIZES.padding,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding * 3 + SIZES.padding3 / 2 + SIZES.padding3 / 8,
    justifyContent: 'center',
    width: SIZES.padding * 3 + SIZES.padding3 / 2 + SIZES.padding3 / 8,
  },
  arrow: {
    marginTop: -(SIZES.padding + SIZES.padding3 - SIZES.padding3 / 4),
    opacity: 0.65,
  },
  intro: {
    marginTop: SIZES.padding,
  },
  trust: {
    backgroundColor: colors.card,
    borderRadius: SIZES.padding3 * 2,
    marginTop: SIZES.padding + SIZES.padding3 - SIZES.padding3 / 4,
    paddingHorizontal: SIZES.padding2 + SIZES.padding3 / 2 - SIZES.padding3 / 8,
    paddingVertical: SIZES.padding3 / 2,
  },
  trust_row: {
    flexDirection: 'row',
    gap: SIZES.padding - SIZES.padding3 / 4,
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding2 + SIZES.padding3 / 4,
  },
  trust_divider: {
    borderBottomColor: colors.line_soft,
    borderBottomWidth: SIZES.padding3 / 8,
  },
  info: {
    marginTop: SIZES.padding,
  },
  primary: {
    marginTop: SIZES.padding3 + SIZES.padding3 / 4,
  },
  link: {
    marginTop: SIZES.padding2 + SIZES.padding3 / 8,
  },
});
