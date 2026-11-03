import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.hairline,
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
