import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    gap: SIZES.padding2,
    paddingBottom: SIZES.padding * 2,
    paddingTop: SIZES.padding * 0.7,
  },
  panel: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.8,
    padding: SIZES.padding * 0.7,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.7,
    justifyContent: 'center',
    width: SIZES.padding * 1.7,
  },
  kind: {
    alignSelf: 'flex-start',
    borderRadius: SIZES.padding * 0.35,
    marginTop: SIZES.padding2,
    paddingHorizontal: SIZES.padding * 0.35,
    paddingVertical: SIZES.padding / 5,
  },
  kind_paid: {
    backgroundColor: COLORS.accent_line,
  },
  kind_alert: {
    backgroundColor: COLORS.danger_surface,
  },
  kind_info: {
    backgroundColor: COLORS.status_trial_bg,
  },
  file: {
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding * 0.6,
    borderWidth: 1,
    marginTop: SIZES.padding2,
    paddingHorizontal: SIZES.padding * 0.6,
    paddingVertical: SIZES.padding / 2,
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 0.6,
    paddingTop: SIZES.padding * 4,
  },
});
