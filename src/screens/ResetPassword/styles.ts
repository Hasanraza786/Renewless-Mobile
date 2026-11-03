import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  hint: {
    marginBottom: SIZES.padding + SIZES.padding3 / 2 - SIZES.padding3 / 8,
    marginTop: SIZES.padding3 + SIZES.padding3 / 4 + SIZES.padding3 / 8,
  },
  submit: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2 + SIZES.padding3 + SIZES.padding3 / 8,
    marginTop: SIZES.padding + SIZES.padding3 + SIZES.padding3 / 4,
  },
  note: {
    marginTop: SIZES.padding + SIZES.padding3 / 4,
  },
});
