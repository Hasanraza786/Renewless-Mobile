import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
  mark: {
    width: SIZES.padding * 5,
    height: SIZES.padding * 5,
  },
  tagline: {
    alignSelf: 'stretch',
    marginTop: SIZES.padding2,
  },
  name: {
    marginTop: SIZES.padding,
  },
});
