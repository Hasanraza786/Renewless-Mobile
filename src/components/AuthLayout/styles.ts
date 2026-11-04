import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: SIZES.padding3,
    paddingHorizontal: SIZES.padding,
  },
  content_brand: {
    paddingTop: SIZES.padding * 1.55,
  },
  content_recovery: {
    paddingTop: SIZES.padding * 0.55,
  },
  recovery_top: {
    height: SIZES.padding * 2.4,
    marginBottom: SIZES.padding * 1.9,
  },
  back: {
    height: SIZES.padding * 2,
    width: SIZES.padding * 2,
  },
  copy_recovery: {
    maxWidth: SIZES.padding * 14.5,
  },
  divider_line: {
    backgroundColor: COLORS.line_faint,
    flex: 1,
    height: 1,
  },
  social: {
    gap: SIZES.padding * 0.55,
  },
  footer: {
    height: SIZES.padding * 2,
  },
  footer_link: {
    justifyContent: 'center',
    minHeight: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding3 / 4,
  },
  brand: {
    marginBottom: SIZES.padding * 1.6,
  },
  brand_compact: {
    marginBottom: SIZES.padding * 1.2,
  },
});
