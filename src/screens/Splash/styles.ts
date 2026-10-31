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
  name: {
    marginTop: SIZES.padding,
  },
  tagline: {
    marginTop: SIZES.padding2,
    alignSelf: 'stretch',
  },
});
