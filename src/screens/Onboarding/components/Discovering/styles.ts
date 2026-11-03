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
    borderWidth: SIZES.padding3 / 8,
    height: RADAR_SIZE,
    justifyContent: 'center',
    width: RADAR_SIZE,
    marginTop: SIZES.padding3 * 2,
    marginBottom: SIZES.padding,
  },
  radar_wash: {
    position: 'absolute',
  },
  ring: {
    borderColor: COLORS.accent_ring,
    borderRadius: (RADAR_SIZE - RING_INSET * 2) / 2,
    borderTopColor: COLORS.primary,
    borderTopWidth: SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
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
    borderWidth: SIZES.padding3 / 8,
  },
  stages: {
    marginTop: SIZES.padding,
  },
});
