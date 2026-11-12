import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.checkbox_line,
    borderRadius: SIZES.padding * 0.3,
    borderWidth: 1,
    height: SIZES.padding * 0.95,
    justifyContent: 'center',
    width: SIZES.padding * 0.95,
  },
  box_checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  box_disabled: {
    opacity: 0.4,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.dialog_raised,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    width: SIZES.padding * 1.6,
  },
  identity: {
    marginBottom: SIZES.padding,
  },
  trial_end: {
    backgroundColor: COLORS.surface_mint,
    borderColor: COLORS.line_mint,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.75,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding2,
  },
  check_row: {
    marginTop: SIZES.padding * 0.9,
    minHeight: SIZES.padding * 2.2,
  },
  field: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    paddingVertical: SIZES.padding * 0.55,
  },
  sheet_button: {
    marginTop: SIZES.padding,
  },
  inbox_option: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    minHeight: SIZES.padding * 2.6,
  },
  // The inbox under the title, with Change.
  inbox_line: {
    flexWrap: 'wrap',
    marginTop: SIZES.padding * 0.7,
  },
  // Already tracked rows are informational.
  tracked: {
    opacity: 0.7,
  },
});
