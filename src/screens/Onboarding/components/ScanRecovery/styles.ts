import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

const ART = SIZES.padding * 6.4;
const BADGE = SIZES.padding * 1.6;

export const styles = StyleSheet.create({
  art: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.accent_border,
    borderRadius: ART / 2,
    borderWidth: 1,
    height: ART,
    justifyContent: 'center',
    width: ART,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.background,
    borderRadius: SIZES.padding * 0.55,
    borderWidth: SIZES.padding * 0.15,
    bottom: SIZES.padding3 / 2,
    height: BADGE,
    justifyContent: 'center',
    position: 'absolute',
    right: SIZES.padding3 / 4,
    width: BADGE,
  },
  // Fills the circle so Loop centres in it.
  mascot_centre: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
  },
  hint: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding3 * 2,
    borderWidth: 1,
    padding: SIZES.padding3 * 2,
    marginTop: SIZES.padding * 1.1,
  },
  hint_icon: {
    paddingTop: 1,
  },
  reassurance: {
    marginHorizontal: SIZES.padding3,
  },
});
