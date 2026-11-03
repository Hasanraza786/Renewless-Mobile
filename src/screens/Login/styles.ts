import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  forgot: {
    justifyContent: 'center',
    minHeight: SIZES.padding * 1.6,
    marginTop: SIZES.padding * 0.55,
    marginBottom: SIZES.padding / 2,
  },
  forgot_link: {
    alignSelf: 'flex-end',
    paddingHorizontal: 0,
  },
  submit: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2.45,
    marginTop: SIZES.padding / 5,
  },
  divider: {
    marginVertical: SIZES.padding * 1.25,
  },
  footer: {
    marginTop: SIZES.padding * 1.25,
  },
});
