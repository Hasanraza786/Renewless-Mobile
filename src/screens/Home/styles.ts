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
    backgroundColor: COLORS.card,
    borderColor: COLORS.text_secondary,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    flexShrink: 1,
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
  // Add-widget prompt: the Small widget preview (169pt, as on the Home Screen).
  widget_preview: {
    alignItems: 'center',
    marginTop: SIZES.padding * 0.7,
  },
  widget_tile: {
    aspectRatio: 1,
    backgroundColor: COLORS.graphite,
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding * 1.25,
    borderWidth: 1,
    justifyContent: 'center',
    padding: SIZES.padding * 0.75,
    width: SIZES.padding * 8.45,
  },
  widget_dot: {
    borderRadius: SIZES.padding / 8,
    height: SIZES.padding / 4,
    width: SIZES.padding / 4,
  },
  widget_eyebrow: {
    marginTop: SIZES.padding * 0.55,
  },
  widget_service: {
    marginTop: SIZES.padding / 4,
  },
  benefits: {
    gap: SIZES.padding * 0.4,
    marginBottom: SIZES.padding * 0.6,
    marginTop: SIZES.padding * 0.8,
  },
  steps: {
    paddingLeft: SIZES.padding / 2,
  },
  watch: {
    marginBottom: SIZES.padding * 0.7,
    minHeight: SIZES.padding * 2.2,
  },
  // How-to clip on a fictional Home Screen.
  clip: {
    backgroundColor: COLORS.wallpaper_sage,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  clip_screen: {
    height: SIZES.padding * 11.5,
  },
  clip_grid: {
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.padding * 0.6,
    paddingTop: SIZES.padding * 2,
    rowGap: SIZES.padding * 0.7,
  },
  clip_cell: {
    alignItems: 'center',
    width: '25%',
  },
  clip_app: {
    alignItems: 'center',
    borderRadius: SIZES.padding * 0.55,
    height: SIZES.padding * 2,
    justifyContent: 'center',
    width: SIZES.padding * 2,
  },
  clip_plus: {
    alignItems: 'center',
    backgroundColor: COLORS.sage_text,
    borderRadius: SIZES.padding * 0.65,
    height: SIZES.padding * 1.3,
    justifyContent: 'center',
    left: SIZES.padding * 0.6,
    position: 'absolute',
    top: SIZES.padding / 2,
    width: SIZES.padding * 1.3,
  },
  clip_touch: {
    alignSelf: 'center',
    backgroundColor: COLORS.line_menu,
    borderRadius: SIZES.padding * 0.85,
    height: SIZES.padding * 1.7,
    position: 'absolute',
    top: SIZES.padding * 8.5,
    width: SIZES.padding * 1.7,
  },
  clip_drop: {
    left: SIZES.padding * 0.9,
    position: 'absolute',
    top: SIZES.padding * 2,
    transformOrigin: 'top left',
  },
  clip_sheet: {
    backgroundColor: COLORS.system_sheet,
    borderTopLeftRadius: SIZES.padding * 0.8,
    borderTopRightRadius: SIZES.padding * 0.8,
    bottom: 0,
    gap: SIZES.padding * 0.45,
    height: SIZES.padding * 7.5,
    left: SIZES.padding / 2,
    padding: SIZES.padding * 0.6,
    position: 'absolute',
    right: SIZES.padding / 2,
  },
  clip_search: {
    backgroundColor: COLORS.system_field,
    borderRadius: SIZES.padding * 0.45,
    paddingHorizontal: SIZES.padding * 0.45,
    paddingVertical: SIZES.padding * 0.3,
  },
  clip_mark: {
    alignItems: 'center',
    backgroundColor: COLORS.graphite,
    borderRadius: SIZES.padding * 0.3,
    height: SIZES.padding * 1.1,
    justifyContent: 'center',
    width: SIZES.padding * 1.1,
  },
  clip_add: {
    backgroundColor: COLORS.system_blue,
    borderRadius: SIZES.padding * 0.6,
    marginTop: SIZES.padding * 0.3,
    paddingVertical: SIZES.padding * 0.4,
  },
  clip_caption: {
    backgroundColor: COLORS.checkbox_fill,
    borderTopColor: COLORS.line_faint,
    borderTopWidth: 1,
    height: SIZES.padding * 1.7,
  },
  clip_caption_text: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clip_track: {
    backgroundColor: COLORS.line_sheet,
    borderRadius: SIZES.padding / 10,
    height: SIZES.padding * 0.15,
    marginTop: SIZES.padding / 2,
    overflow: 'hidden',
  },
  clip_bar: {
    backgroundColor: COLORS.primary,
    height: '100%',
    transformOrigin: 'left',
    width: '100%',
  },
});
