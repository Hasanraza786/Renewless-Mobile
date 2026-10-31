import { colors } from '../../constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingBottom: 26,
    paddingHorizontal: 22,
    paddingTop: 7,
  },
  radar: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.accent_border,
    borderRadius: 75,
    borderWidth: 1,
    height: 150,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 16,
    width: 150,
  },
  ring: {
    borderColor: colors.accent_ring,
    borderRadius: 62,
    borderTopColor: colors.accent,
    borderWidth: 1,
    height: 124,
    position: 'absolute',
    width: 124,
  },
  stage: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 13,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 14,
    paddingTop: 12,
  },
});
