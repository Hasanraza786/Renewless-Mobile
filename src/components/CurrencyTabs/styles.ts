import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  tabs: {
    flexWrap: 'wrap',
  },
  tab: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.text_secondary,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    minHeight: SIZES.padding * 1.6,
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: SIZES.padding / 5,
  },
  tab_active: {
    borderColor: COLORS.primary,
  },
});
