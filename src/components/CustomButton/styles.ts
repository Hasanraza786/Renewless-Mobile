import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding2 + 2,
    height: SIZES.button_height,
    justifyContent: 'center',
    width: '100%',
  },
  pressed: {
    backgroundColor: COLORS.accent,
  },
  disabled: {
    backgroundColor: COLORS.disabled_fill,
  },
  primary: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding * 0.7,
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    width: '100%',
  },
  secondary: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.secondary_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    width: '100%',
  },
  social: {
    alignItems: 'center',
    borderColor: COLORS.social_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    height: SIZES.padding * 2.45,
    justifyContent: 'center',
    width: '100%',
  },
  social_icon: {
    left: SIZES.padding * 0.85,
    position: 'absolute',
  },
  link: {
    alignSelf: 'center',
    paddingHorizontal: SIZES.padding * 0.3,
    paddingVertical: 1,
  },
  pressed_variant: {
    opacity: 0.85,
  },
  disabled_variant: {
    opacity: 0.4,
  },
});
