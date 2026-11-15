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
  message: {
    height: SIZES.padding * 7,
    paddingTop: SIZES.padding / 2,
  },
  reply_card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginVertical: SIZES.padding * 0.7,
    padding: SIZES.padding2,
  },
  request_error: {
    backgroundColor: COLORS.error_wash,
    borderColor: COLORS.error_line,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.6,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding * 0.55,
  },
});
