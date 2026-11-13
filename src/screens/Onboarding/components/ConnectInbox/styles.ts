import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  art: {
    height: SIZES.padding * 6.75,
  },
  brand_view: {
    alignItems: 'center',
    gap: SIZES.padding / 2,
  },
  icon_view: {
    height: SIZES.padding * 3.25,
    width: SIZES.padding * 3.25,
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    marginTop: -SIZES.padding * 1.3,
    opacity: 0.65,
  },
  // Every Connect message means it didn't connect (failed, cancelled, Gmail not allowed): coral, like other errors.
  feedback: {
    borderColor: COLORS.danger,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    padding: SIZES.padding2,
    marginVertical: SIZES.padding2,
  },
  trust: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding3 * 2,
    paddingHorizontal: SIZES.padding * 0.75,
    paddingVertical: SIZES.padding3 / 2,
    marginTop: SIZES.padding2,
  },
  trust_row: {
    paddingVertical: SIZES.padding * 0.7,
  },
  trust_divider: {
    borderBottomColor: COLORS.line_soft,
    borderBottomWidth: 1,
  },
  connect_button: {
    height: SIZES.padding * 2.4,
  },
  // The legal row ends flush with the footer, so it absorbs the footer's bottom padding.
  legal: {
    marginBottom: -SIZES.padding3 / 2,
    marginTop: SIZES.padding * 0.65,
  },
  legal_link: {
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
  },
});
