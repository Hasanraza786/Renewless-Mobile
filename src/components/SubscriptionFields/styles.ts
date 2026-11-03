import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  chip: {
    borderColor: COLORS.hairline,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding3,
  },
  chip_on: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});
