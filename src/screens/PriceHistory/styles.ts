import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    gap: SIZES.padding2,
    paddingBottom: SIZES.padding * 2,
    paddingTop: SIZES.padding * 0.7,
  },
  panel: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.8,
    padding: SIZES.padding * 0.7,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.7,
    justifyContent: 'center',
    width: SIZES.padding * 1.7,
  },
  badge: {
    backgroundColor: COLORS.accent_line,
    borderRadius: SIZES.padding * 0.35,
    paddingHorizontal: SIZES.padding * 0.35,
    paddingVertical: SIZES.padding / 4,
  },
  field: {
    paddingTop: SIZES.padding * 0.55,
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 0.6,
    paddingTop: SIZES.padding * 4,
  },
});
