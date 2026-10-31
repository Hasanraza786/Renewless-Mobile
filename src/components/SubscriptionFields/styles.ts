import { StyleSheet } from 'react-native';
import { colors, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  chip: {
    borderColor: colors.hairline,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding3,
  },
  chip_on: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
});
