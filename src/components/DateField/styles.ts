import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  field: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.field_border,
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
    flexDirection: 'row',
    height: SIZES.padding * 2 + SIZES.padding3 * 3 / 8,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding2,
  },
  field_open: {
    borderColor: COLORS.primary,
  },
});
