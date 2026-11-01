import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../../../constants/theme';

export const ORBIT_SIZE = SIZES.padding * 11 + SIZES.padding3 / 2 + SIZES.padding3 / 8;

export const styles = StyleSheet.create({
  scene: {
    height: SIZES.padding * 11 + SIZES.padding2,
  },
  orbit: {
    borderColor: colors.accent_line,
    borderRadius: ORBIT_SIZE / 2,
    borderWidth: SIZES.padding3 / 8,
    height: ORBIT_SIZE,
    left: SIZES.padding * 2 + SIZES.padding3 / 4,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: ORBIT_SIZE,
  },
  receipt: {
    backgroundColor: colors.receipt,
    borderColor: colors.line_faint,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
    left: SIZES.padding + SIZES.padding3 + SIZES.padding3 / 4,
    padding: SIZES.padding - SIZES.padding3 / 8,
    position: 'absolute',
    top: SIZES.padding2,
    transform: [{ rotate: '-7deg' }],
    width: SIZES.padding * 10 + SIZES.padding3 - SIZES.padding3 / 8,
  },
  inline: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding3,
  },
  inbox_label: {
    letterSpacing: SIZES.padding3 / 8,
  },
  line: {
    backgroundColor: colors.receipt_line,
    borderRadius: SIZES.padding3 / 2,
    height: SIZES.padding3 / 2,
    marginBottom: SIZES.padding3 + SIZES.padding3 / 8,
    width: '85%',
  },
  line_short: {
    marginBottom: 0,
    width: '60%',
  },
  found: {
    alignItems: 'center',
    backgroundColor: colors.found_card,
    borderColor: colors.accent_edge,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 2 + SIZES.padding3 / 8,
    borderWidth: SIZES.padding3 / 8,
    flexDirection: 'row',
    gap: SIZES.padding2 - SIZES.padding3 / 8,
    left: SIZES.padding3 + SIZES.padding3 / 8,
    paddingHorizontal: SIZES.padding2 + SIZES.padding3 / 8,
    paddingVertical: SIZES.padding3 * 2,
    position: 'absolute',
    right: 0,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: SIZES.padding3 * 2 },
    shadowOpacity: 0.2,
    shadowRadius: SIZES.padding2 + SIZES.padding3 / 2 - SIZES.padding3 / 8,
    top: SIZES.padding * 6 + SIZES.padding3 + SIZES.padding3 / 8,
  },
  logo_tile: {
    alignItems: 'center',
    backgroundColor: colors.logo_tile,
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4,
    height: SIZES.padding * 2 - SIZES.padding3 / 2,
    justifyContent: 'center',
    minWidth: SIZES.padding * 2 - SIZES.padding3 / 2 - SIZES.padding3 / 4,
  },
  found_text: {
    flex: 1,
  },
  pill: {
    left: SIZES.padding + SIZES.padding3 + SIZES.padding3 / 4,
    position: 'absolute',
    top: SIZES.padding * 10 + SIZES.padding3 + SIZES.padding3 / 4,
  },
  loop: {
    position: 'absolute',
    right: SIZES.padding3 - SIZES.padding3 / 8,
    top: SIZES.padding * 2 + SIZES.padding3 / 4,
    transform: [{ rotate: '9deg' }],
  },
  intro: {
    marginTop: SIZES.padding2 + SIZES.padding3 / 2,
  },
  benefits: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.padding,
  },
  benefit: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding3 - SIZES.padding3 / 4,
    height: SIZES.padding2 * 2,
  },
  primary: {
    marginTop: SIZES.padding3 + SIZES.padding3 / 4,
  },
  link: {
    marginTop: SIZES.padding2 + SIZES.padding3 / 8,
  },
});
