import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.sheet_scrim,
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 3,
  },
  dialog: {
    backgroundColor: COLORS.dialog,
    borderColor: COLORS.line_sheet,
    borderRadius: SIZES.padding * 0.9,
    borderWidth: 1,
    flexShrink: 1,
    overflow: 'hidden',
  },
  body: {
    padding: SIZES.padding * 0.8,
  },
  close: {
    alignItems: 'center',
    backgroundColor: COLORS.line_hint,
    borderColor: COLORS.line_faint,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    width: SIZES.padding * 1.8,
  },
});
