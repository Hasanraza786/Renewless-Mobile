import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding * 2,
    paddingTop: SIZES.padding,
  },
  // The same card as MenuGroup, without a title.
  group: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_hint,
    borderRadius: SIZES.padding * 0.75,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding2,
  },
});
