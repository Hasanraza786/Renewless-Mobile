import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding3 / 2,
  },
  trigger: {
    alignItems: 'center',
    height: SIZES.padding * 2 + SIZES.padding3 / 2,
    justifyContent: 'center',
    width: SIZES.padding * 2 + SIZES.padding3 / 2,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.background_scrim,
  },
  floating: {
    position: 'absolute',
  },
  popover: {
    backgroundColor: COLORS.tooltip,
    borderColor: COLORS.accent_ring,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 2,
    borderWidth: SIZES.padding3 / 8,
    padding: SIZES.padding2 + SIZES.padding3 / 4,
    position: 'absolute',
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: SIZES.padding3 * 2 },
    shadowOpacity: 0.6,
    shadowRadius: SIZES.padding,
  },
  head: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding3,
  },
  title: {
    flex: 1,
  },
  close: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay_soft,
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4,
    height: SIZES.padding * 2 - SIZES.padding3 / 2,
    justifyContent: 'center',
    width: SIZES.padding * 2 - SIZES.padding3 / 2,
  },
  arrow: {
    backgroundColor: COLORS.tooltip,
    borderBottomWidth: SIZES.padding3 / 8,
    borderColor: COLORS.accent_ring,
    borderRightWidth: SIZES.padding3 / 8,
    bottom: -(SIZES.padding3 - SIZES.padding3 / 4),
    height: SIZES.padding3 + SIZES.padding3 / 4,
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    width: SIZES.padding3 + SIZES.padding3 / 4,
  },
});
