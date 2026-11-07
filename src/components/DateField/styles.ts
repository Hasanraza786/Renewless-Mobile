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
  field_form: {
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.select_border,
    height: SIZES.padding * 2.1,
  },
  field_error: {
    borderColor: COLORS.expired,
  },
  // The native date wheel keeps its own width, so centre it in the sheet.
  wheel: {
    alignItems: 'center',
  },
  field_open: {
    borderColor: COLORS.primary,
  },
});
