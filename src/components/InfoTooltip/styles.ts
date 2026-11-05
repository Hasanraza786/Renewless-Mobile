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
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    width: SIZES.padding * 2.2,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.background_scrim,
  },
  popover: {
    backgroundColor: COLORS.tooltip,
    borderColor: COLORS.accent_ring,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    padding: SIZES.padding * 0.7,
    position: 'absolute',
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: SIZES.padding3 * 2 },
    shadowOpacity: 0.6,
    shadowRadius: SIZES.padding,
  },
  head: {
  },
  close: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay_soft,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    width: SIZES.padding * 1.8,
  },
  arrow: {
    backgroundColor: COLORS.tooltip,
    borderBottomWidth: 1,
    borderColor: COLORS.accent_ring,
    borderRightWidth: 1,
    bottom: -SIZES.padding * 0.3,
    height: SIZES.padding / 2,
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    width: SIZES.padding / 2,
  },
});
