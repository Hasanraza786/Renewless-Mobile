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
  primary: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 4,
    height: SIZES.padding * 2 + SIZES.padding3 / 2,
    justifyContent: 'center',
    width: '100%',
  },
  secondary: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.secondary_border,
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding * 2 + SIZES.padding3 / 2,
    justifyContent: 'center',
    width: '100%',
  },
  social: {
    alignItems: 'center',
    borderColor: colors.social_border,
    borderRadius: SIZES.padding2,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding * 2 + SIZES.padding3 - SIZES.padding3 / 4,
    justifyContent: 'center',
    width: '100%',
  },
  social_icon: {
    left: SIZES.padding2 + SIZES.padding3 / 2 + SIZES.padding3 / 8,
    position: 'absolute',
  },
  link: {
    alignSelf: 'center',
    paddingHorizontal: SIZES.padding3 - SIZES.padding3 / 4,
    paddingVertical: SIZES.padding3 / 8,
  },
  pressed_variant: {
    opacity: 0.85,
  },
  disabled_variant: {
    opacity: 0.4,
  },
});
