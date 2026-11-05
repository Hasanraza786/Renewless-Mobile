import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  // Suggestions float over the fields below the service input.
  service: {
    zIndex: 2,
  },
  suggestions: {
    backgroundColor: COLORS.dialog_raised,
    borderColor: COLORS.select_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    left: 0,
    padding: SIZES.padding / 5,
    position: 'absolute',
    right: 0,
    top: SIZES.padding * 3.35,
  },
  suggestion: {
    borderRadius: SIZES.padding3,
    minHeight: SIZES.padding * 2.2,
    padding: SIZES.padding / 2,
  },
  currency: {
    width: SIZES.padding * 5,
  },
  switch_row: {
    marginTop: SIZES.padding3,
    minHeight: SIZES.padding * 2.2,
    paddingVertical: SIZES.padding / 2,
  },
  notes: {
    height: SIZES.padding * 3.2,
    paddingTop: SIZES.padding / 2,
    textAlignVertical: 'top',
  },
});
