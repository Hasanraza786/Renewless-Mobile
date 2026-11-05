import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding * 2,
    paddingTop: SIZES.padding * 0.7,
  },
});
