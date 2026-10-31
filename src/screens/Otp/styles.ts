import { StyleSheet } from 'react-native';
import { colors, SIZES } from '../../constants/theme';

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
  link: {
    alignSelf: 'center',
    marginBottom: SIZES.padding3,
    marginTop: SIZES.padding3 * 2,
  },
  codeField: {
    justifyContent: 'space-between',
    marginBottom: SIZES.padding3 / 2,
  },
  cell: {
    backgroundColor: colors.card,
    borderColor: colors.control_border,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    height: SIZES.control_height,
    overflow: 'hidden',
    width: SIZES.padding * 2.3,
  },
  cell_focused: {
    borderColor: colors.accent,
  },
});
