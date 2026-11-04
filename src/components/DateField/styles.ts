import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  field: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.field_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    flexDirection: 'row',
    height: SIZES.padding * 2.15,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding2,
  },
  field_open: {
    borderColor: COLORS.primary,
  },
});
