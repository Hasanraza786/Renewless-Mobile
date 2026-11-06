import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding * 1.9,
  },
  identity: {
    alignItems: 'center',
    paddingBottom: SIZES.padding,
    paddingTop: SIZES.padding * 0.8,
  },
  pill: {
    borderRadius: SIZES.padding * 0.45,
    borderWidth: 1,
    marginTop: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding * 0.45,
    paddingVertical: SIZES.padding / 4,
  },
  pill_synced: {
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_card,
  },
  pill_syncing: {
    backgroundColor: COLORS.status_trial_bg,
    borderColor: COLORS.status_trial_bg,
  },
  pill_alert: {
    backgroundColor: COLORS.danger_wash,
    borderColor: COLORS.danger_line,
  },
  pill_paused: {
    backgroundColor: COLORS.warning_wash,
    borderColor: COLORS.warning_line,
  },
  facts: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.75,
    paddingHorizontal: SIZES.padding * 0.65,
    paddingVertical: SIZES.padding * 0.15,
  },
  fact: {
    minHeight: SIZES.padding * 2.25,
    paddingVertical: SIZES.padding * 0.65,
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  error_box: {
    backgroundColor: COLORS.danger_wash,
    borderColor: COLORS.danger_line,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.75,
    padding: SIZES.padding2,
  },
  sync: {
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_line,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.85,
    padding: SIZES.padding * 0.7,
  },
  disconnect: {
    borderColor: COLORS.danger_line,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: SIZES.padding * 0.85,
    minHeight: SIZES.padding * 2.2,
  },
});
