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
  top: {
    marginBottom: SIZES.padding * 0.7,
  },
  bubble: {
    borderRadius: SIZES.padding * 0.75,
    borderWidth: 1,
    marginBottom: SIZES.padding / 2,
    maxWidth: '88%',
    paddingHorizontal: SIZES.padding * 0.65,
    paddingVertical: SIZES.padding * 0.6,
  },
  bubble_you: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.avatar_fill,
    borderColor: COLORS.line_quiet,
  },
  bubble_team: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.card,
    borderColor: COLORS.accent_soft,
  },
  team_mark: {
    alignItems: 'center',
    backgroundColor: COLORS.accent_chip,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding,
    justifyContent: 'center',
    width: SIZES.padding,
  },
  note: {
    backgroundColor: COLORS.accent_wash,
    borderColor: COLORS.accent_soft,
    borderRadius: SIZES.padding * 0.7,
    borderWidth: 1,
    marginTop: SIZES.padding / 5,
    paddingHorizontal: SIZES.padding * 0.65,
    paddingVertical: SIZES.padding * 0.6,
  },
  // Pinned above the safe area; the hairline spans the full width (as Change password).
  footer: {
    borderTopColor: COLORS.line_soft,
    borderTopWidth: 1,
    marginHorizontal: -SIZES.padding,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding3,
    paddingTop: SIZES.padding * 0.65,
  },
});
