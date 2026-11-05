import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';

export const styles = StyleSheet.create({
  notes_input: {
    height: SIZES.padding * 5,
    paddingTop: SIZES.padding2,
    textAlignVertical: 'top',
  },
  check_row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding2,
    marginTop: SIZES.padding2,
    minHeight: SIZES.padding * 2.2,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.checkbox_border,
    borderRadius: SIZES.padding * 0.3,
    borderWidth: 1,
    height: SIZES.padding,
    justifyContent: 'center',
    width: SIZES.padding,
  },
  checkbox_checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sheet_button: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2.4,
    marginTop: SIZES.padding * 0.8,
  },
  sheet_actions: {
    marginTop: SIZES.padding,
  },
  half: {
    borderRadius: SIZES.padding2,
    flex: 1,
    height: SIZES.padding * 2.4,
  },
  danger: {
    backgroundColor: COLORS.expired,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.sheet_scrim,
  },
  dialog_wrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
  dialog: {
    backgroundColor: COLORS.dialog_raised,
    borderRadius: SIZES.padding * 1.2,
    padding: SIZES.padding,
  },
});
