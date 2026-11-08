import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding * 2,
  },
  first: {
    marginTop: SIZES.padding * 0.75,
  },
  toggle: {
    paddingVertical: SIZES.padding * 0.75,
  },
  note: {
    marginHorizontal: SIZES.padding / 10,
  },
});
