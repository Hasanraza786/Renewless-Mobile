import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding,
    paddingTop: SIZES.padding * 0.7,
  },
  mark: {
    alignItems: 'center',
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding * 0.65,
    borderWidth: 1,
    height: SIZES.padding * 2.1,
    justifyContent: 'center',
    width: SIZES.padding * 2.1,
  },
  intro: {
    maxWidth: SIZES.padding * 14.25,
  },
  input: {
    borderRadius: SIZES.padding * 0.55,
    height: SIZES.padding * 2.2,
    paddingRight: SIZES.padding * 2.3,
  },
  request_error: {
    backgroundColor: COLORS.error_wash,
    borderColor: COLORS.error_line,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.35,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding * 0.55,
  },
  // Pinned above the safe area; the hairline spans the full width.
  footer: {
    borderTopColor: COLORS.line_soft,
    borderTopWidth: 1,
    marginHorizontal: -SIZES.padding,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding3,
    paddingTop: SIZES.padding * 0.65,
  },
  provider: {
    paddingTop: SIZES.padding * 1.15,
  },
});
