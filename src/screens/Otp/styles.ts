import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  destination: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 4,
    marginBottom: SIZES.padding + SIZES.padding3 + SIZES.padding3 / 4,
    paddingHorizontal: SIZES.padding2 + SIZES.padding3 - SIZES.padding3 / 4,
    paddingVertical: SIZES.padding3 * 2,
  },
  change_email: {
    alignSelf: 'flex-start',
    minHeight: SIZES.padding * 2 - SIZES.padding3,
    paddingTop: SIZES.padding2,
  },
  code: {
    gap: SIZES.padding3,
  },
  cell: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.code_border,
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
    flex: 1,
    height: SIZES.padding * 2 + SIZES.padding3 - SIZES.padding3 / 4,
    justifyContent: 'center',
  },
  cell_focused: {
    borderColor: COLORS.primary,
  },
  cell_error: {
    borderColor: COLORS.expired,
  },
  expiry: {
    marginBottom: SIZES.padding2,
    marginTop: SIZES.padding2 + SIZES.padding3 / 4,
  },
  submit: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2 + SIZES.padding3 + SIZES.padding3 / 8,
    marginTop: SIZES.padding2,
  },
  resend: {
    alignItems: 'center',
    marginTop: SIZES.padding + SIZES.padding3,
  },
  resend_button: {
    justifyContent: 'center',
    marginTop: SIZES.padding3 / 2 - SIZES.padding3 / 8,
    minHeight: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding3 + SIZES.padding3 / 4,
  },
});
