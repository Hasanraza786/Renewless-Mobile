import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  row: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.hairline,
    borderRadius: SIZES.padding3 * 2,
    borderWidth: 1,
    marginBottom: SIZES.padding2,
    padding: SIZES.padding3 * 2,
  },
});
