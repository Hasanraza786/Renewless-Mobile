import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  cancel: {
    alignItems: 'center',
    paddingVertical: SIZES.padding3 * 2,
  },
});
