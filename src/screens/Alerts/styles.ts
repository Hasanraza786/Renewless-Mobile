import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding * 1.9,
    paddingTop: SIZES.padding * 0.7,
  },
  banner: {
    backgroundColor: COLORS.warning_wash,
    borderColor: COLORS.warning_line,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    marginTop: SIZES.padding * 1.1,
    padding: SIZES.padding2,
  },
  banner_action: {
    paddingVertical: SIZES.padding / 4,
  },
  group: {
    marginTop: SIZES.padding * 1.1,
  },
  group_next: {
    marginTop: SIZES.padding * 0.65,
  },
  heading: {
    marginBottom: SIZES.padding * 0.35,
    paddingHorizontal: SIZES.padding / 10,
  },
  count: {
    alignItems: 'center',
    backgroundColor: COLORS.line_hint,
    borderRadius: SIZES.padding * 0.3,
    minWidth: SIZES.padding * 0.85,
    paddingHorizontal: SIZES.padding / 5,
  },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_hint,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    minHeight: SIZES.padding * 3.6,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding / 2,
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.surface_option,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.7,
    justifyContent: 'center',
    width: SIZES.padding * 1.7,
  },
  empty: {
    alignItems: 'center',
    paddingBottom: SIZES.padding * 1.25,
    paddingHorizontal: SIZES.padding2,
    paddingTop: SIZES.padding * 4.5,
  },
  mascot_ring: {
    alignItems: 'center',
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding * 2.7,
    borderWidth: 1,
    height: SIZES.padding * 5.4,
    justifyContent: 'center',
    overflow: 'visible',
    width: SIZES.padding * 5.4,
  },
  empty_copy: {
    maxWidth: SIZES.padding * 12.5,
  },
  manage: {
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_ring,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.95,
    minHeight: SIZES.padding * 2.2,
    paddingHorizontal: SIZES.padding2,
  },
});
