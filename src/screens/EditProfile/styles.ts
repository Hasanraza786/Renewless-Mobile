import { StyleSheet } from 'react-native';
import { colors, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  choice: {
    borderColor: colors.hairline,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding2 + 2,
    paddingVertical: SIZES.padding3,
  },
  choice_on: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
});
