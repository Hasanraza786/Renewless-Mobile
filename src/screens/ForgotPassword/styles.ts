import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: SIZES.padding,
  },
  link: {
    alignSelf: 'center',
    marginTop: SIZES.padding3 * 2,
  },
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding2 * 2,
    paddingTop: SIZES.padding3,
  },
});
