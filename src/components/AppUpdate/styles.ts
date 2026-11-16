import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  notes: {
    backgroundColor: COLORS.line_hint,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding * 0.6,
    borderWidth: 1,
    gap: SIZES.padding * 0.4,
    marginBottom: SIZES.padding * 0.8,
    padding: SIZES.padding * 0.6,
  },
});
