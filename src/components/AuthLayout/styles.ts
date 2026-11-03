import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: SIZES.padding3,
    paddingHorizontal: SIZES.padding,
  },
  content_brand: {
    paddingTop: SIZES.padding + SIZES.padding2 - SIZES.padding3 / 8,
  },
  content_recovery: {
    paddingTop: SIZES.padding2 - SIZES.padding3 / 8,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding3 - SIZES.padding3 / 8,
    marginBottom: SIZES.padding * 2 - SIZES.padding3,
  },
  brand_compact: {
    marginBottom: SIZES.padding + SIZES.padding3 / 2,
  },
  tight: {
    letterSpacing: -SIZES.padding3 / 16,
  },
  recovery_top: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.padding * 2 + SIZES.padding3,
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2 - SIZES.padding3 / 4,
  },
  back: {
    height: SIZES.padding * 2,
    width: SIZES.padding * 2,
  },
  intro: {
    marginBottom: SIZES.padding + SIZES.padding3 + SIZES.padding3 / 8,
  },
  intro_compact: {
    marginBottom: SIZES.padding + SIZES.padding3 / 2,
  },
  intro_recovery: {
    marginBottom: SIZES.padding * 2 - SIZES.padding3,
  },
  copy: {
    marginTop: SIZES.padding3 + SIZES.padding3 / 8,
  },
  copy_recovery: {
    marginTop: SIZES.padding2,
    maxWidth: SIZES.padding * 14 + SIZES.padding3 + SIZES.padding3 / 4,
  },
  divider: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding2 + SIZES.padding3 / 4 + SIZES.padding3 / 8,
  },
  divider_line: {
    backgroundColor: COLORS.line_faint,
    flex: 1,
    height: SIZES.padding3 / 8,
  },
  social: {
    gap: SIZES.padding2 - SIZES.padding3 / 8,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding3 / 2 + SIZES.padding3 / 4,
    height: SIZES.padding * 2,
    justifyContent: 'center',
  },
  footer_link: {
    justifyContent: 'center',
    minHeight: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding3 / 4,
  },
});
