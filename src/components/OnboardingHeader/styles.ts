import { colors } from '../../constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
  },
  back: {
    alignItems: 'center',
    backgroundColor: colors.icon_button,
    borderColor: colors.line_faint,
    borderRadius: 12,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  spacer: {
    height: 40,
    width: 40,
  },
  word: {
    letterSpacing: 2,
  },
  mark: {
    alignItems: 'flex-end',
    width: 44,
  },
  steps: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 12,
    marginTop: 15,
  },
  step: {
    backgroundColor: colors.progress_track,
    borderRadius: 3,
    flex: 1,
    height: 3,
  },
  step_done: {
    backgroundColor: colors.accent,
  },
});
