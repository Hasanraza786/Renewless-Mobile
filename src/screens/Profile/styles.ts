import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding,
    paddingTop: SIZES.padding * 0.75,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.avatar_fill,
    borderRadius: SIZES.padding * 1.1,
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    width: SIZES.padding * 2.2,
  },
  inboxes: {
    marginTop: SIZES.padding * 0.85,
  },
  inbox_group: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_hint,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.35,
    overflow: 'hidden',
  },
  inbox_row: {
    padding: SIZES.padding2,
  },
  inbox_divider: {
    borderColor: COLORS.line_soft,
    borderTopWidth: 1,
  },
  add_block: {
    borderColor: COLORS.line_soft,
    borderTopWidth: 1,
    paddingBottom: SIZES.padding2,
  },
  add_row: {
    padding: SIZES.padding2,
  },
  add_icon: {
    alignItems: 'center',
    backgroundColor: COLORS.accent_soft,
    borderRadius: SIZES.padding * 0.75,
    height: SIZES.padding * 1.5,
    justifyContent: 'center',
    width: SIZES.padding * 1.5,
  },
  add_buttons: {
    paddingLeft: SIZES.padding * 2.6,
    paddingRight: SIZES.padding2,
  },
  inbox_logo: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay_faint,
    borderRadius: SIZES.padding * 0.45,
    height: SIZES.padding * 1.6,
    justifyContent: 'center',
    width: SIZES.padding * 1.5,
  },
  dot: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding / 10,
    height: SIZES.padding / 5,
    width: SIZES.padding / 5,
  },
  dot_paused: {
    backgroundColor: COLORS.renewing_soon,
  },
  no_inbox: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.7,
    marginTop: SIZES.padding * 0.35,
    padding: SIZES.padding2,
  },
  connect: {
    justifyContent: 'center',
    minHeight: SIZES.padding * 2.2,
    paddingLeft: SIZES.padding / 4,
  },
  danger_button: {
    backgroundColor: COLORS.danger_wash,
    borderColor: COLORS.danger_line,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.85,
    minHeight: SIZES.padding * 2.2,
  },
});
