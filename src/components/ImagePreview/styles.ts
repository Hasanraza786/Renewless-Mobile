import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  preview: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
  preview_image: {
    height: '80%',
    width: '100%',
  },
  preview_close: {
    position: 'absolute',
    right: SIZES.padding,
    top: SIZES.padding * 3,
  },
});
