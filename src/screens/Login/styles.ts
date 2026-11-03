import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  field: {
    marginBottom: SIZES.padding2 + SIZES.padding3 - SIZES.padding3 / 4,
  },
  forgot: {
    justifyContent: 'center',
    marginBottom: SIZES.padding3 + SIZES.padding3 / 4,
    marginTop: SIZES.padding3 + SIZES.padding3 / 4 + SIZES.padding3 / 8,
    minHeight: SIZES.padding * 2 - SIZES.padding3,
  },
  forgot_link: {
    alignSelf: 'flex-end',
    paddingHorizontal: 0,
  },
  submit: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2 + SIZES.padding3 + SIZES.padding3 / 8,
    marginTop: SIZES.padding3 / 2,
  },
  divider: {
    marginVertical: SIZES.padding + SIZES.padding3 / 2 + SIZES.padding3 / 8,
  },
  footer: {
    marginTop: SIZES.padding + SIZES.padding3 / 2 + SIZES.padding3 / 8,
  },
});
