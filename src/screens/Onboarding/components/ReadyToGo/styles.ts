import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const HALO_SIZE = SIZES.padding * 5.6;
const BADGE = SIZES.padding * 1.5;
const PIECE_INSET = SIZES.padding * 0.55;

export const styles = StyleSheet.create({
  celebration: {
    alignItems: 'center',
    alignSelf: 'center',
    height: HALO_SIZE,
    justifyContent: 'center',
    width: HALO_SIZE,
    marginTop: SIZES.padding2,
    marginBottom: SIZES.padding2 * 2,
  },
  halo: {
    borderColor: COLORS.accent_tile,
    borderRadius: HALO_SIZE / 2,
    borderWidth: 1,
    height: HALO_SIZE,
    overflow: 'hidden',
    position: 'absolute',
    width: HALO_SIZE,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.background,
    borderRadius: BADGE / 2,
    borderWidth: SIZES.padding * 0.15,
    bottom: SIZES.padding3 / 4,
    height: BADGE,
    justifyContent: 'center',
    position: 'absolute',
    right: -1,
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: SIZES.padding3 / 4 },
    shadowOpacity: 0.2,
    shadowRadius: SIZES.padding3 / 2,
    width: BADGE,
  },
  summary: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding3 * 2,
    borderWidth: 1,
    padding: SIZES.padding3 * 2,
  },
  summary_wide: {
    borderLeftColor: COLORS.line_faint,
    borderLeftWidth: 1,
    flex: 1.35,
    paddingLeft: SIZES.padding * 0.7,
  },
  next: {
    paddingHorizontal: SIZES.padding3 / 2,
    paddingVertical: SIZES.padding3 * 2,
    marginTop: SIZES.padding3,
  },
  logo_tile: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    minWidth: SIZES.padding * 1.7,
  },
  confetti: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  piece: {
    borderRadius: SIZES.padding3 / 4,
    bottom: SIZES.padding,
    height: SIZES.padding * 0.55,
    position: 'absolute',
    width: SIZES.padding * 0.35,
  },
  piece_left: {
    left: PIECE_INSET,
  },
  piece_right: {
    right: PIECE_INSET,
  },
  piece_round: {
    borderRadius: SIZES.padding * 0.15,
    height: SIZES.padding * 0.3,
    width: SIZES.padding * 0.3,
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
