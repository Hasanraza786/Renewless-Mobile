import { StyleSheet } from 'react-native';
import { colors, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  row: {
    backgroundColor: colors.card,
    borderColor: colors.hairline,
    borderRadius: SIZES.padding3 * 2,
    borderWidth: 1,
    marginBottom: SIZES.padding2,
    padding: SIZES.padding3 * 2,
  },
});
