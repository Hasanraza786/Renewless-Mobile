import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    gap: SIZES.padding2,
    paddingBottom: SIZES.padding * 1.2,
    paddingTop: SIZES.padding * 0.7,
  },
  message: {
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    padding: SIZES.padding2,
  },
  overview: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_quiet,
    borderRadius: SIZES.padding * 0.9,
    borderWidth: 1,
    paddingBottom: SIZES.padding * 0.7,
    paddingHorizontal: SIZES.padding * 0.8,
    paddingTop: SIZES.padding * 0.9,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 2,
    justifyContent: 'center',
    width: SIZES.padding * 2,
  },
  badge: {
    borderRadius: SIZES.padding * 0.35,
    paddingHorizontal: SIZES.padding * 0.35,
    paddingVertical: SIZES.padding / 4,
  },
  cost: {
    marginTop: SIZES.padding * 0.9,
  },
  next_event: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: 1,
    marginTop: SIZES.padding * 0.75,
    paddingTop: SIZES.padding2,
  },
  panel: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.padding * 0.8,
    padding: SIZES.padding * 0.7,
  },
  field: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    paddingVertical: SIZES.padding / 2,
  },
  field_value: {
    flexShrink: 1,
  },
  inline_link: {
    justifyContent: 'center',
    minHeight: SIZES.padding * 2.2,
  },
  link_card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding * 0.75,
    borderWidth: 1,
    padding: SIZES.padding * 0.7,
  },
  sync: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: 1,
    marginTop: SIZES.padding / 2,
    paddingTop: SIZES.padding / 2,
  },
  manage: {
    backgroundColor: COLORS.accent_select,
    borderColor: COLORS.accent_border,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding * 0.75,
    paddingVertical: SIZES.padding * 0.65,
  },
  actions: {
    paddingBottom: SIZES.padding2,
    paddingTop: SIZES.padding2,
  },
  action: {
    borderRadius: SIZES.padding2,
    flex: 1,
    height: SIZES.padding * 2.4,
  },
});
