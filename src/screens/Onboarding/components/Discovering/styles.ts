import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const RADAR_SIZE = SIZES.padding * 7.5;
const RING_INSET = SIZES.padding * 0.7;

export const styles = StyleSheet.create({
  radar: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.accent_border,
    borderRadius: RADAR_SIZE / 2,
    borderWidth: 1,
    height: RADAR_SIZE,
    justifyContent: 'center',
    width: RADAR_SIZE,
    marginTop: SIZES.padding3 * 2,
    marginBottom: SIZES.padding,
  },
  ring: {
    borderColor: COLORS.accent_ring,
    borderRadius: (RADAR_SIZE - RING_INSET * 2) / 2,
    borderTopColor: COLORS.primary,
    borderTopWidth: SIZES.padding3 / 4,
    borderWidth: 1,
    bottom: RING_INSET,
    left: RING_INSET,
    position: 'absolute',
    right: RING_INSET,
    top: RING_INSET,
  },
  ring_complete: {
    borderColor: COLORS.primary,
  },
  stage: {
    paddingVertical: SIZES.padding * 0.65,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.7,
    height: SIZES.padding * 1.4,
    justifyContent: 'center',
    width: SIZES.padding * 1.4,
  },
  badge_scanning: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  stages: {
    marginTop: SIZES.padding,
  },
  bar: {
    backgroundColor: COLORS.line_soft,
    borderRadius: SIZES.padding / 10,
    height: SIZES.padding / 5,
    marginTop: SIZES.padding / 4,
    overflow: 'hidden',
  },
  bar_fill: {
    backgroundColor: COLORS.primary,
    height: '100%',
  },
  // The bar with Loop riding its tip: room above the bar for Loop.
  // Discovering's stage bars stop at 220pt, as in the Studio.
  stage_rider: {
    maxWidth: SIZES.padding * 11,
  },
  rider_bar: {
    marginTop: SIZES.padding * 0.9,
  },
  rider: {
    bottom: SIZES.padding / 10,
    position: 'absolute',
  },
  radar_compact: {
    borderRadius: SIZES.padding * 2.1,
    height: SIZES.padding * 4.2,
    marginBottom: SIZES.padding * 0.3,
    marginTop: 0,
    width: SIZES.padding * 4.2,
  },
  ring_compact: {
    borderRadius: SIZES.padding * 1.75,
    bottom: SIZES.padding * 0.35,
    left: SIZES.padding * 0.35,
    right: SIZES.padding * 0.35,
    top: SIZES.padding * 0.35,
  },
});
