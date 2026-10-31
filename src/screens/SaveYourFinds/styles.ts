import { colors } from '../../constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingBottom: 26,
    paddingHorizontal: 22,
    paddingTop: 7,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 12,
    paddingHorizontal: 2,
  },
  tile: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderColor: colors.accent_tile,
    borderRadius: 17,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 6,
    width: 56,
  },
  check: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 12,
    bottom: -5,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: -5,
    width: 24,
  },
  summary: {
    backgroundColor: colors.card,
    borderColor: colors.accent_border,
    borderRadius: 14,
    borderWidth: 1,
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  account: {
    gap: 10,
    paddingBottom: 4,
    paddingTop: 8,
  },
  email: {
    alignItems: 'center',
    minHeight: 40,
    paddingVertical: 8,
  },
  legal: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingBottom: 4,
    paddingTop: 2,
  },
});
