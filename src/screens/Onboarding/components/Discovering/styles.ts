import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../../../constants/theme';

export const RADAR_SIZE = SIZES.padding * 7 + SIZES.padding3 + SIZES.padding3 / 4;
const RING_INSET = SIZES.padding2 + SIZES.padding3 / 4;

export const styles = StyleSheet.create({
  radar: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.accent_border,
    borderRadius: RADAR_SIZE / 2,
    borderWidth: SIZES.padding3 / 8,
    height: RADAR_SIZE,
    justifyContent: 'center',
    marginBottom: SIZES.padding,
    marginTop: SIZES.padding3 * 2,
    width: RADAR_SIZE,
  },
  radar_wash: {
    position: 'absolute',
  },
  ring: {
    borderColor: colors.accent_ring,
    borderRadius: (RADAR_SIZE - RING_INSET * 2) / 2,
    borderTopColor: colors.accent,
    borderTopWidth: SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
    bottom: RING_INSET,
    left: RING_INSET,
    position: 'absolute',
    right: RING_INSET,
    top: RING_INSET,
  },
  ring_complete: {
    borderColor: colors.accent,
  },
  stages: {
    marginTop: SIZES.padding,
  },
  stage: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding2 + SIZES.padding3 / 4,
    paddingVertical: SIZES.padding2 + SIZES.padding3 / 8,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 4,
    height: SIZES.padding + SIZES.padding3,
    justifyContent: 'center',
    width: SIZES.padding + SIZES.padding3,
  },
  badge_scanning: {
    borderColor: colors.accent,
    borderWidth: SIZES.padding3 / 8,
  },
  primary: {
    marginTop: SIZES.padding + SIZES.padding3 / 4,
  },
});
