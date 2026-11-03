import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  symbol: {
    alignItems: 'center',
    marginVertical: SIZES.padding + SIZES.padding3 + SIZES.padding3 / 4,
  },
  panel: {
    backgroundColor: colors.card,
    borderRadius: SIZES.padding3 * 2,
    marginTop: SIZES.padding,
    padding: SIZES.padding2 + SIZES.padding3 / 4,
  },
  primary: {
    marginTop: SIZES.padding + SIZES.padding3 / 4,
  },
  secondary: {
    marginTop: SIZES.padding3 + SIZES.padding3 / 4,
  },
});
