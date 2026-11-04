import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const ORBIT_SIZE = SIZES.padding * 11.25;

export const styles = StyleSheet.create({
  scene: {
    height: SIZES.padding * 11.6,
  },
  orbit: {
    borderColor: COLORS.accent_line,
    borderRadius: ORBIT_SIZE / 2,
    borderWidth: 1,
    height: ORBIT_SIZE,
    left: SIZES.padding * 2.1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: ORBIT_SIZE,
  },
  receipt: {
    backgroundColor: COLORS.receipt,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    left: SIZES.padding * 1.5,
    padding: SIZES.padding * 0.95,
    position: 'absolute',
    top: SIZES.padding2,
    transform: [{ rotate: '-7deg' }],
    width: SIZES.padding * 10.35,
  },
  line: {
    backgroundColor: COLORS.receipt_line,
    borderRadius: SIZES.padding3 / 2,
    height: SIZES.padding3 / 2,
    width: '85%',
    marginBottom: SIZES.padding * 0.45,
  },
  line_short: {
    width: '60%',
    marginBottom: 0,
  },
  found: {
    backgroundColor: COLORS.found_card,
    borderColor: COLORS.accent_edge,
    borderRadius: SIZES.padding * 0.85,
    borderWidth: 1,
    left: SIZES.padding * 0.45,
    paddingHorizontal: SIZES.padding * 0.65,
    paddingVertical: SIZES.padding3 * 2,
    position: 'absolute',
    right: 0,
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: SIZES.padding3 * 2 },
    shadowOpacity: 0.2,
    shadowRadius: SIZES.padding * 0.75,
    top: SIZES.padding * 6.45,
  },
  logo_tile: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    minWidth: SIZES.padding * 1.7,
  },
  pill: {
    left: SIZES.padding * 1.5,
    position: 'absolute',
    top: SIZES.padding * 10.5,
  },
  loop: {
    position: 'absolute',
    right: SIZES.padding2 / 2,
    top: SIZES.padding * 2.15,
    transform: [{ rotate: '9deg' }],
  },
  benefit_row: {
    gap: SIZES.padding * 0.3,
    height: SIZES.padding2 * 2,
  },
});
