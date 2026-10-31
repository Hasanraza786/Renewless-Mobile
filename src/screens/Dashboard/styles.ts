import { StyleSheet } from 'react-native';
import { colors, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  icon_button: {
    alignItems: 'center',
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    width: SIZES.padding * 2.2,
  },
  count: {
    backgroundColor: colors.card,
    borderColor: colors.hairline,
    borderRadius: SIZES.padding3 * 2,
    borderWidth: 1,
    padding: SIZES.padding2 + 2,
    width: '47%',
  },
});
