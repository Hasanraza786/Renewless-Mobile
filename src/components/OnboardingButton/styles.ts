import { colors } from '../../constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  primary: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 14,
    height: 44,
    justifyContent: 'center',
    width: '100%',
  },
  pressed: {
    backgroundColor: colors.accent_pressed,
  },
  disabled: {
    backgroundColor: colors.disabled_fill,
    opacity: 0.4,
  },
  secondary: {
    alignItems: 'center',
    backgroundColor: colors.transparent,
    borderColor: colors.social_border,
    borderRadius: 12,
    borderWidth: 1,
    height: 46,
    justifyContent: 'center',
    width: '100%',
  },
  social_icon: {
    left: 17,
    position: 'absolute',
  },
  link: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 13,
    minHeight: 32,
  },
});
