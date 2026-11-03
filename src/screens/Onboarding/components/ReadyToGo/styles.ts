import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../../../constants/theme';

export const HALO_SIZE = SIZES.padding * 5 + SIZES.padding2;
const BADGE = SIZES.padding + SIZES.padding3 + SIZES.padding3 / 4;
const PIECE_INSET = SIZES.padding3 + SIZES.padding3 / 4 + SIZES.padding3 / 8;

export const styles = StyleSheet.create({
  celebration: {
    alignItems: 'center',
    alignSelf: 'center',
    height: HALO_SIZE,
    justifyContent: 'center',
    marginBottom: SIZES.padding2 * 2,
    marginTop: SIZES.padding2,
    width: HALO_SIZE,
  },
  halo: {
    borderColor: colors.accent_tile,
    borderRadius: HALO_SIZE / 2,
    borderWidth: SIZES.padding3 / 8,
    height: HALO_SIZE,
    overflow: 'hidden',
    position: 'absolute',
    width: HALO_SIZE,
  },
  mascot: {
    position: 'absolute',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderColor: colors.background,
    borderRadius: BADGE / 2,
    borderWidth: SIZES.padding3 / 2 - SIZES.padding3 / 8,
    bottom: SIZES.padding3 / 4,
    height: BADGE,
    justifyContent: 'center',
    position: 'absolute',
    right: -SIZES.padding3 / 8,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: SIZES.padding3 / 4 },
    shadowOpacity: 0.2,
    shadowRadius: SIZES.padding3 / 2,
    width: BADGE,
  },
  intro: {
    marginBottom: SIZES.padding,
  },
  summary: {
    backgroundColor: colors.card,
    borderColor: colors.accent_border,
    borderRadius: SIZES.padding3 * 2,
    borderWidth: SIZES.padding3 / 8,
    flexDirection: 'row',
    gap: SIZES.padding2,
    padding: SIZES.padding3 * 2,
  },
  summary_cell: {
    flex: 1,
  },
  summary_wide: {
    borderLeftColor: colors.line_faint,
    borderLeftWidth: SIZES.padding3 / 8,
    flex: 1.35,
    paddingLeft: SIZES.padding2 + SIZES.padding3 / 4,
  },
  next: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding2,
    marginTop: SIZES.padding3,
    paddingHorizontal: SIZES.padding3 / 2,
    paddingVertical: SIZES.padding3 * 2,
  },
  next_label: {
    letterSpacing: SIZES.padding3 / 10,
  },
  logo_tile: {
    alignItems: 'center',
    backgroundColor: colors.logo_tile,
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4,
    height: SIZES.padding * 2 - SIZES.padding3 / 2,
    justifyContent: 'center',
    minWidth: SIZES.padding * 2 - SIZES.padding3 / 2 - SIZES.padding3 / 4,
  },
  primary: {
    marginTop: SIZES.padding + SIZES.padding3 / 4,
  },
  confetti: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  piece: {
    borderRadius: SIZES.padding3 / 4,
    bottom: SIZES.padding,
    height: SIZES.padding3 + SIZES.padding3 / 4 + SIZES.padding3 / 8,
    position: 'absolute',
    width: SIZES.padding3 - SIZES.padding3 / 8,
  },
  piece_left: {
    left: PIECE_INSET,
  },
  piece_right: {
    right: PIECE_INSET,
  },
  piece_round: {
    borderRadius: SIZES.padding3 / 2 - SIZES.padding3 / 8,
    height: SIZES.padding3 - SIZES.padding3 / 4,
    width: SIZES.padding3 - SIZES.padding3 / 4,
  },
  popper: {
    bottom: -SIZES.padding3,
    position: 'absolute',
    transformOrigin: '50% 85%',
  },
  popper_left: {
    left: -SIZES.padding2,
  },
  popper_right: {
    right: -SIZES.padding2,
  },
});
