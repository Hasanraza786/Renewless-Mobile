import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding3,
  },
  back: {
    height: SIZES.padding * 2,
    width: SIZES.padding * 2,
  },
  back_spacer: {
    width: SIZES.padding * 2,
    height: SIZES.padding * 2
  },
  step: {
    backgroundColor: COLORS.progress_track,
    borderRadius: SIZES.padding * 0.15,
    flex: 1,
    height: SIZES.padding * 0.15,
  },
  step_done: {
    backgroundColor: COLORS.primary,
  },
  scroll: {
    paddingBottom: SIZES.padding * 0.9,
    paddingTop: SIZES.padding3 / 2,
  },
  scroll_fitted: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  footer: {
    paddingBottom: SIZES.padding3 / 2,
  },
  footer_divider: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: SIZES.padding3 / 8,
  },
});
