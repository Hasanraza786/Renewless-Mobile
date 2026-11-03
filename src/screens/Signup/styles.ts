import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  field: {
    marginBottom: SIZES.padding3 * 2,
  },
  submit: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2 + SIZES.padding3 + SIZES.padding3 / 8,
    marginTop: SIZES.padding,
  },
  divider: {
    marginVertical: SIZES.padding + SIZES.padding3 / 4,
  },
  footer: {
    marginTop: SIZES.padding,
  },
});
