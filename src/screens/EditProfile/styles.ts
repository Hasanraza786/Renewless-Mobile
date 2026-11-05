import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  content: {
    paddingBottom: SIZES.padding * 2,
    paddingTop: SIZES.padding * 0.7,
  },
  email_card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginVertical: SIZES.padding * 0.7,
    padding: SIZES.padding2,
  },
});
