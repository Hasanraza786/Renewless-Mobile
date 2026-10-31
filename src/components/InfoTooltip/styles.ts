import { colors } from '../../constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    position: 'relative',
  },
  trigger: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  popover: {
    backgroundColor: colors.tooltip,
    borderColor: colors.accent_ring,
    borderRadius: 16,
    borderWidth: 1,
    bottom: 52,
    padding: 14,
    position: 'absolute',
    right: 0,
    width: '100%',
    zIndex: 12,
  },
  popover_head: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  popover_title: {
    flex: 1,
  },
  close: {
    alignItems: 'center',
    backgroundColor: colors.overlay_soft,
    borderRadius: 10,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
});
