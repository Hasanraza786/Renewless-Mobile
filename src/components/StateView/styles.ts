import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  wrap: {
    gap: SIZES.padding3 * 2,
    paddingVertical: SIZES.padding  * 1.4,
  },
  // The mascot artwork already leaves space under its face, so no extra gap before the message.
  loading: {
    alignItems: 'center',
    gap: 0,
  },
});
