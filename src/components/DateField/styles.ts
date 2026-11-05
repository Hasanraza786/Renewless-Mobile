import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  field: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.field_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    height: SIZES.padding * 2.15,
    paddingHorizontal: SIZES.padding2,
  },
  field_open: {
    borderColor: COLORS.primary,
  },
});
