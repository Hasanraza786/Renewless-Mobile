import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingBottom: 26,
    paddingHorizontal: 22,
    paddingTop: 7,
  },
  art: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.accent_border,
    borderRadius: 64,
    borderWidth: 1,
    height: 128,
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 12,
    width: 128,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.background,
    borderRadius: 11,
    borderWidth: 3,
    bottom: 3,
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 1,
    width: 32,
  },
  hint: {
    backgroundColor: colors.card,
    borderRadius: SIZES.padding2 + 2,
    marginBottom: SIZES.padding2,
    padding: SIZES.padding2,
  },
  footer: {
    gap: SIZES.padding3,
    marginTop: 'auto',
  },
  secondary: {
    alignItems: 'center',
    borderColor: colors.control_border,
    borderRadius: SIZES.padding2 + 2,
    borderWidth: 1,
    height: SIZES.button_height,
    justifyContent: 'center',
  },
});
