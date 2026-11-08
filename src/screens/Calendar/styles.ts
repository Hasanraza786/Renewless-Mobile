import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding,
  },
  nav: {
    marginBottom: SIZES.padding2,
    marginTop: SIZES.padding / 5,
  },
  // 36pt month controls (compacted from 44pt, 7 November 2026); hitSlop keeps a 44pt target.
  nav_button: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_quiet,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    height: SIZES.padding * 1.8,
    width: SIZES.padding * 1.8,
  },
  today_button: {
    paddingHorizontal: SIZES.padding / 2,
    width: undefined,
  },
  heading: {
    paddingHorizontal: SIZES.padding / 5,
    paddingVertical: SIZES.padding / 5,
  },
  summary: {
    borderColor: COLORS.accent_card,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: SIZES.padding * 0.7,
    paddingVertical: SIZES.padding / 2,
  },
  count: {
    flexShrink: 0,
    borderLeftColor: COLORS.line_quiet,
    borderLeftWidth: 1,
    paddingLeft: SIZES.padding3,
  },
  board: {
    marginTop: SIZES.padding2,
  },
  legend: {
    marginTop: SIZES.padding * 0.45,
  },
  dot: {
    borderRadius: SIZES.padding / 8,
    height: SIZES.padding / 4,
    width: SIZES.padding / 4,
  },
  today_mark: {
    borderColor: COLORS.primary,
    borderRadius: SIZES.padding * 0.15,
    borderWidth: 1,
    height: SIZES.padding * 0.45,
    width: SIZES.padding * 0.45,
  },
  next: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    marginTop: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding * 0.65,
    paddingTop: SIZES.padding / 2,
  },
  // Pulls the shared card's top padding up under the label so the card stays compact.
  next_card: {
    marginHorizontal: -SIZES.padding2,
    marginTop: -SIZES.padding * 0.3,
  },
  all_clear: {
    paddingBottom: SIZES.padding * 0.65,
  },
});
