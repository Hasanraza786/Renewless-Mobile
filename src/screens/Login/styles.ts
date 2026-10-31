import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding2 * 2,
    paddingTop: SIZES.padding3,
  },
  content: {
    flexGrow: 1,
    paddingBottom: SIZES.padding,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.padding3 * 2,
    marginTop: -SIZES.padding3,
  },
});
