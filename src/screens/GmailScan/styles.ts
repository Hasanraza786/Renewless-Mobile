import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const RING = SIZES.padding * 10.2;

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding,
    paddingTop: SIZES.padding * 0.7,
  },
  inbox: {
    backgroundColor: COLORS.surface_field,
    borderColor: COLORS.line_field,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding2,
  },
  visual: {
    alignItems: 'center',
    height: RING,
    justifyContent: 'center',
    marginTop: SIZES.padding * 0.1,
  },
  halo: {
    alignItems: 'center',
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding * 3.3,
    borderWidth: 1,
    height: SIZES.padding * 6.6,
    justifyContent: 'center',
    overflow: 'visible',
    width: SIZES.padding * 6.6,
  },
  halo_large: {
    borderRadius: SIZES.padding * 3.5,
    height: SIZES.padding * 7,
    width: SIZES.padding * 7,
  },
  recovery_visual: {
    alignItems: 'center',
    marginTop: SIZES.padding * 1.6,
  },
  step: {
    backgroundColor: COLORS.surface_step,
    borderRadius: SIZES.padding * 0.55,
    minHeight: SIZES.padding * 2.1,
    paddingHorizontal: SIZES.padding2,
  },
  steps: {
    gap: SIZES.padding * 0.35,
    marginTop: SIZES.padding * 1.1,
  },
  step_mark: {
    alignItems: 'center',
    borderColor: COLORS.line_step,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    height: SIZES.padding,
    justifyContent: 'center',
    width: SIZES.padding,
  },
  step_done: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  summary: {
    backgroundColor: COLORS.surface_mint,
    borderColor: COLORS.line_mint,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.9,
    padding: SIZES.padding * 0.75,
  },
  summary_count: {
    borderRightColor: COLORS.line_mint,
    borderRightWidth: 1,
    paddingRight: SIZES.padding * 0.85,
  },
  section: {
    marginTop: SIZES.padding * 1.1,
  },
  count_badge: {
    backgroundColor: COLORS.control_surface,
    borderRadius: SIZES.padding / 4,
    paddingHorizontal: SIZES.padding / 4,
    paddingVertical: SIZES.padding * 0.15,
  },
  list: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_list,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.45,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: SIZES.padding * 0.55,
    paddingVertical: SIZES.padding * 0.65,
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  box: {
    alignItems: 'center',
    backgroundColor: COLORS.checkbox_fill,
    borderColor: COLORS.checkbox_line,
    borderRadius: SIZES.padding * 0.3,
    borderWidth: 1,
    height: SIZES.padding * 0.95,
    justifyContent: 'center',
    width: SIZES.padding * 0.95,
  },
  box_checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  box_disabled: {
    opacity: 0.4,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.dialog_raised,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    width: SIZES.padding * 1.6,
  },
  end: {
    alignItems: 'flex-end',
    maxWidth: SIZES.padding * 5,
  },
  review_link: {
    minHeight: SIZES.padding * 2.2,
  },
  duplicates: {
    marginTop: SIZES.padding * 1.1,
    minHeight: SIZES.padding * 2.2,
  },
  duplicate_row: {
    paddingVertical: SIZES.padding3,
  },
  // Bordered secondary action on the recovery screens.
  link: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surface_quiet_button,
    borderColor: COLORS.line_quiet_button,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.8,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding * 0.9,
  },
  footer: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: 1,
    marginHorizontal: -SIZES.padding,
    paddingBottom: SIZES.padding3,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  // Sheets
  identity: {
    marginBottom: SIZES.padding,
  },
  trial_end: {
    backgroundColor: COLORS.surface_mint,
    borderColor: COLORS.line_mint,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.75,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding2,
  },
  check_row: {
    marginTop: SIZES.padding * 0.9,
    minHeight: SIZES.padding * 2.2,
  },
  field: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    paddingVertical: SIZES.padding * 0.55,
  },
  sheet_button: {
    marginTop: SIZES.padding,
  },
  inbox_option: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    minHeight: SIZES.padding * 2.6,
  },
});
