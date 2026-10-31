import { colors } from '../../constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingBottom: 26,
    paddingHorizontal: 22,
    paddingTop: 7,
  },
  art: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
    height: 135,
    justifyContent: 'center',
  },
  brand: {
    alignItems: 'center',
    gap: 10,
  },
  tile: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line_faint,
    borderRadius: 20,
    borderWidth: 1,
    height: 65,
    justifyContent: 'center',
    width: 65,
  },
  trust: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  row: {
    borderBottomColor: colors.line_soft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 18,
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  row_last: {
    borderBottomWidth: 0,
  },
  footer: {
    backgroundColor: colors.background,
    borderTopColor: colors.line_quiet,
    borderTopWidth: 1,
    paddingTop: 12,
  },
});
