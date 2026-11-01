import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding + SIZES.padding3 / 4,
  },
  header: {
    marginBottom: SIZES.padding2 + SIZES.padding3 / 2,
    marginTop: SIZES.padding3 - SIZES.padding3 / 8,
  },
  bar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.padding * 2 + SIZES.padding3 / 2,
    justifyContent: 'space-between',
  },
  back: {
    alignItems: 'center',
    backgroundColor: colors.icon_button,
    borderColor: colors.line_faint,
    borderRadius: SIZES.padding2,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding * 2 + SIZES.padding3 / 2,
    justifyContent: 'center',
    width: SIZES.padding * 2 + SIZES.padding3 / 2,
  },
  back_spacer: {
    width: SIZES.padding * 2,
  },
  wordmark: {
    letterSpacing: SIZES.padding3 / 4,
  },
  steps: {
    flexDirection: 'row',
    gap: SIZES.padding3 / 2 + SIZES.padding3 / 8,
    marginTop: SIZES.padding - SIZES.padding3 / 2 - SIZES.padding3 / 8,
  },
  step: {
    backgroundColor: colors.progress_track,
    borderRadius: SIZES.padding3 / 2 - SIZES.padding3 / 8,
    flex: 1,
    height: SIZES.padding3 / 2 - SIZES.padding3 / 8,
  },
  step_done: {
    backgroundColor: colors.accent,
  },
  panel: {
    flex: 1,
  },
  scroll: {
    paddingBottom: SIZES.padding2 + SIZES.padding3 - SIZES.padding3 / 4,
    paddingHorizontal: SIZES.padding3 / 4,
    paddingTop: SIZES.padding3 / 2,
  },
  footer: {
    borderTopColor: colors.line_quiet,
    borderTopWidth: SIZES.padding3 / 8,
    paddingBottom: SIZES.padding3 / 2,
    paddingTop: SIZES.padding2,
  },
});
