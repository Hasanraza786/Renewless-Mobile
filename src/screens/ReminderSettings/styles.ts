import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding,
    paddingTop: SIZES.padding * 0.7,
  },
  group: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_hint,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding * 0.65,
  },
  first_group: {
    marginTop: SIZES.padding * 0.95,
  },
  toggle: {
    paddingVertical: SIZES.padding * 0.75,
  },
  divider: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
  },
  disabled: {
    opacity: 0.45,
  },
  defaults: {
    paddingBottom: SIZES.padding2,
    paddingTop: SIZES.padding * 0.75,
  },
  device: {
    marginTop: SIZES.padding * 0.85,
    paddingVertical: SIZES.padding / 5,
  },
  device_action: {
    minHeight: SIZES.padding * 2.2,
  },
  footer: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: 1,
    marginHorizontal: -SIZES.padding,
    paddingBottom: SIZES.padding3,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  box: {
    alignItems: 'center',
    borderColor: COLORS.checkbox_border,
    borderRadius: SIZES.padding * 0.3,
    borderWidth: 1,
    height: SIZES.padding,
    justifyContent: 'center',
    marginTop: SIZES.padding / 10,
    width: SIZES.padding,
  },
  box_checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});
