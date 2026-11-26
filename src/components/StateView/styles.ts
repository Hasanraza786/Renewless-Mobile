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
  // Home's error, centred in the visible space; the screen runs under the floating tab bar, so the bottom padding
  // lifts the block clear of it.
  failed: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: SIZES.padding * 5,
  },
  retry: {
    marginTop: SIZES.padding * 1.1,
  },
});
