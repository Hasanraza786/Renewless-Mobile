import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding * 0.55,
    minHeight: SIZES.padding * 3.5,
    padding: SIZES.padding2,
  },
  pressed: {
    opacity: 0.7,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.7,
    justifyContent: 'center',
    width: SIZES.padding * 1.7,
  },
  amount: {
    alignItems: 'center',
    maxWidth: '42%',
  },
});
