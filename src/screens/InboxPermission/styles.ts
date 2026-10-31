import { colors } from '../../constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingBottom: 26,
    paddingHorizontal: 22,
    paddingTop: 7,
  },
  symbol: {
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 30,
  },
  panel: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
  },
  footer: {
    backgroundColor: colors.background,
    borderTopColor: colors.line_quiet,
    borderTopWidth: 1,
    gap: 10,
    paddingTop: 12,
  },
  secondary: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.secondary_border,
    borderRadius: 14,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
  },
});
