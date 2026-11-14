import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  safe_area: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  readable: {
    alignSelf: 'center',
    maxWidth: SIZES.padding * 34,
    width: '100%',
  },
});
