import { StyleSheet } from 'react-native';
import { colors, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.hairline,
    borderRadius: SIZES.padding3 * 2,
    borderWidth: 1,
    marginBottom: SIZES.padding2,
    padding: SIZES.padding3 * 2,
  },
  badge: {
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: SIZES.padding3 / 2,
  },
});
