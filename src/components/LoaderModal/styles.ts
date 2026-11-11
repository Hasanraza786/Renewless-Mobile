import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    alignItems: 'center',
    backgroundColor: COLORS.graphite_overlay,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
});
