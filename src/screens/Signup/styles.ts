import { StyleSheet } from 'react-native';
import { colors, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding2 * 2,
    paddingTop: SIZES.padding3,
  },
  content: {
    flexGrow: 1,
    paddingBottom: SIZES.padding,
  },
  choice: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.hairline,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: SIZES.control_height,
    paddingHorizontal: SIZES.padding3,
  },
  choice_on: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
});
