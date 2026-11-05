import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    gap: SIZES.padding2,
    paddingBottom: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  panel: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.8,
    padding: SIZES.padding * 0.7,
  },
  // Next event
  toolbar: {
    marginBottom: SIZES.padding3,
  },
  event_tab: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.text_secondary,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    flexDirection: 'row',
    flexShrink: 1,
    gap: SIZES.padding * 0.3,
    maxWidth: SIZES.padding * 6.6,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding3,
  },
  event_tab_active: {
    borderColor: COLORS.primary,
  },
  see_all: {
    justifyContent: 'center',
    minHeight: SIZES.padding * 2.2,
    padding: SIZES.padding3,
  },
  event_card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_quiet,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    paddingVertical: SIZES.padding2,
  },
  top_row: {
    paddingHorizontal: SIZES.padding * 0.7
  },
  // This month
  month_card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.overlay_soft,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    padding: SIZES.padding * 0.7,
  },
  month_grid: {
    marginTop: SIZES.padding * 0.8,
  },
  month_column: {
    flex: 1,
  },
  month_column_divided: {
    borderLeftColor: COLORS.line_faint,
    borderLeftWidth: 1,
    paddingLeft: SIZES.padding2,
  },
  // Top spending
  view_all: {
    paddingVertical: SIZES.padding * 0.3,
  },
  spend_row: {
    alignItems: 'center',
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: SIZES.padding / 2,
    paddingVertical: SIZES.padding * 0.55,
  },
  spend_avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.6,
    justifyContent: 'center',
    width: SIZES.padding * 1.6,
  },
  others_avatar: {
    backgroundColor: COLORS.progress_track,
    borderRadius: SIZES.padding * 0.8,
  },
  spend_track: {
    backgroundColor: COLORS.line_faint,
    borderRadius: SIZES.padding3,
    height: SIZES.padding / 4,
    marginTop: SIZES.padding3,
    overflow: 'hidden',
  },
  spend_fill: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding3,
    height: '100%',
  },
  spend_value: {
    alignItems: 'flex-end',
  },
  trials: {
    borderTopColor: COLORS.line_faint,
    borderTopWidth: 1,
    marginTop: SIZES.padding2,
    paddingTop: SIZES.padding / 2,
  },
  trial_row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding * 0.45,
    paddingBottom: SIZES.padding / 10,
    paddingTop: SIZES.padding2,
  },
  trial_avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.5,
    justifyContent: 'center',
    width: SIZES.padding * 1.5,
  },
  // Coming up · 6 months
  bars: {
    marginTop: SIZES.padding * 0.7,
  },
  bar_column: {
    flex: 1,
    gap: SIZES.padding * 0.45,
  },
  bar_space: {
    height: SIZES.padding * 5.05,
    justifyContent: 'flex-end',
  },
  bar: {
    backgroundColor: COLORS.chart_bar,
    borderBottomLeftRadius: SIZES.padding * 0.15,
    borderBottomRightRadius: SIZES.padding * 0.15,
    borderTopLeftRadius: SIZES.padding * 0.3,
    borderTopRightRadius: SIZES.padding * 0.3,
  },
  bar_active: {
    backgroundColor: COLORS.primary,
  },
  chart_selection: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: 1,
    marginTop: SIZES.padding / 2,
    paddingTop: SIZES.padding / 2,
  },
  // Error: sad Loop, message and retry centred in the visible space; the screen runs under the floating
  // tab bar, so the bottom padding lifts the block clear of it.
  failed: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: SIZES.padding * 5,
  },
  // Empty
  empty: {
    alignItems: 'center',
    paddingTop: SIZES.padding * 5.7,
  },
  empty_primary: {
    marginTop: SIZES.padding * 1.1,
  },
  empty_secondary: {
    marginTop: SIZES.padding / 2,
  },
  // Skeleton
  sk_root: {
    gap: SIZES.padding2,
  },
  sk_block: {
    backgroundColor: COLORS.skeleton,
  },
  sk_row: {
    paddingVertical: SIZES.padding * 0.65,
  },
  sk_row_divided: {
    borderTopColor: COLORS.overlay_soft,
    borderTopWidth: 1,
  },
  sk_lines: {
    gap: SIZES.padding * 0.45,
  },
  sk_month: {
    marginVertical: SIZES.padding * 0.8,
  },
  sk_month_column: {
    gap: SIZES.padding3,
  },
  sk_gap: {
    marginTop: SIZES.padding * 0.65,
  },
  sk_bars: {
    height: SIZES.padding * 5.4,
    marginTop: SIZES.padding * 0.7,
  },
  sk_bar: {
    backgroundColor: COLORS.skeleton,
    borderRadius: SIZES.padding * 0.3,
  },
});
