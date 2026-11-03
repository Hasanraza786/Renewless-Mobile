import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  submit: {
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2.45,
    marginTop: SIZES.padding * 1.5,
  },
  footer: {
    marginTop: SIZES.padding * 1.3,
  },
});
