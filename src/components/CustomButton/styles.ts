import { StyleSheet } from 'react-native';
import { colors, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: SIZES.padding2 + 2,
    height: SIZES.button_height,
    justifyContent: 'center',
    width: '100%',
  },
  pressed: {
    backgroundColor: colors.accent_pressed,
  },
  disabled: {
    backgroundColor: colors.disabled_fill,
  },
});
