import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  submit: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2 + SIZES.padding3 + SIZES.padding3 / 8,
    marginTop: SIZES.padding + SIZES.padding3 + SIZES.padding3 / 4,
  },
  footer: {
    marginTop: SIZES.padding + SIZES.padding3 - SIZES.padding3 / 4,
  },
});
