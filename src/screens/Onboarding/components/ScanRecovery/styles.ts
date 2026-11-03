import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

const ART = SIZES.padding * 6 + SIZES.padding3;
const BADGE = SIZES.padding2 * 2 + SIZES.padding3;

export const styles = StyleSheet.create({
  art: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.accent_border,
    borderRadius: ART / 2,
    borderWidth: SIZES.padding3 / 8,
    height: ART,
    justifyContent: 'center',
    width: ART,
  },
  mascot: {
    position: 'absolute',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.background,
    borderRadius: SIZES.padding3 + SIZES.padding3 / 4 + SIZES.padding3 / 8,
    borderWidth: SIZES.padding3 / 2 - SIZES.padding3 / 8,
    bottom: SIZES.padding3 / 2,
    height: BADGE,
    justifyContent: 'center',
    position: 'absolute',
    right: SIZES.padding3 / 4,
    width: BADGE,
  },
  intro: {
    marginTop: SIZES.padding2 * 2,
  },
  hint: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding3 * 2,
    borderWidth: SIZES.padding3 / 8,
    flexDirection: 'row',
    gap: SIZES.padding2 - SIZES.padding3 / 8,
    marginTop: SIZES.padding + SIZES.padding3 / 4,
    padding: SIZES.padding3 * 2,
  },
  hint_icon: {
    paddingTop: SIZES.padding3 / 8,
  },
  hint_text: {
    flex: 1,
  },
  reassurance: {
    marginHorizontal: SIZES.padding3,
    marginTop: SIZES.padding3 * 2,
  },
  primary: {
    marginTop: SIZES.padding2,
  },
  secondary: {
    marginTop: SIZES.padding3 + SIZES.padding3 / 4,
  },
});
