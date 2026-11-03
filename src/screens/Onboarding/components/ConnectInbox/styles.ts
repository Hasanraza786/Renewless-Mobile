import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  art: {
    // 15pt beside the 48-wide arrow box keeps the prototype's 18pt gap to its 42pt-wide drawing.
    height: SIZES.padding * 6.75,
  },
  brand: {
    alignItems: 'center',
    gap: SIZES.padding / 2,
  },
  tile: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding * 3.25,
    justifyContent: 'center',
    width: SIZES.padding * 3.25,
  },
  arrow: {
    marginTop: -SIZES.padding * 1.3,
    opacity: 0.65,
  },
  feedback: {
    borderColor: COLORS.primary,
    borderRadius: SIZES.padding2,
    borderWidth: SIZES.padding3 / 8,
    padding: SIZES.padding2,
    marginVertical: SIZES.padding2,
  },
  trust: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding3 * 2,
    paddingHorizontal: SIZES.padding * 0.75,
    paddingVertical: SIZES.padding3 / 2,
  },
  trust_row: {
    paddingVertical: SIZES.padding * 0.7,
  },
  trust_divider: {
    borderBottomColor: COLORS.line_soft,
    borderBottomWidth: SIZES.padding3 / 8,
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
