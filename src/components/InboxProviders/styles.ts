import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

// Option rows and tiles match AddOptions; the buttons are the social button on the card fill.
export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.card,
  },
  rows: {
    gap: SIZES.padding * 0.45,
  },
  option: {
    backgroundColor: COLORS.surface_option,
    borderColor: COLORS.line_quiet,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    minHeight: SIZES.padding * 3.8,
    padding: SIZES.padding2,
  },
  tile: {
    flex: 1,
    minHeight: SIZES.padding * 5.2,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: COLORS.tile_raised,
    borderRadius: SIZES.padding * 0.65,
    height: SIZES.padding * 2.1,
    justifyContent: 'center',
    width: SIZES.padding * 2.1,
  },
});
