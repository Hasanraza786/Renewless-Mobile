import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  destination: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.7,
    paddingHorizontal: SIZES.padding * 0.9,
    paddingVertical: SIZES.padding3 * 2,
    marginBottom: SIZES.padding * 1.5,
  },
  change_email: {
    alignSelf: 'flex-start',
    minHeight: SIZES.padding * 1.6,
    paddingTop: SIZES.padding2,
  },
  code: {
    gap: SIZES.padding3,
  },
  cell: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.code_border,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    flex: 1,
    height: SIZES.padding * 2.3,
    justifyContent: 'center',
  },
  cell_focused: {
    borderColor: COLORS.primary,
  },
  cell_error: {
    borderColor: COLORS.expired,
  },
  submit: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2.45,
    marginTop: SIZES.padding2,
  },
  resend: {
    alignItems: 'center',
    marginTop: SIZES.padding * 1.4,
  },
  resend_button: {
    justifyContent: 'center',
    minHeight: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding / 2,
    marginTop: SIZES.padding * 0.15,
  },
});
