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
    paddingVertical: SIZES.padding * 3.2,
  },
  dialog: {
    backgroundColor: COLORS.dialog,
    borderColor: COLORS.line_sheet,
    borderRadius: SIZES.padding * 0.9,
    borderWidth: 1,
    flexShrink: 1,
    overflow: 'hidden',
  },
  // Tablets: one standard dialog width, centred.
  dialog_tablet: {
    alignSelf: 'center',
    maxWidth: '100%',
    width: SIZES.padding * 22,
  },
  header: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    padding: SIZES.padding * 0.8,
  },
  close: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay_soft,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    height: SIZES.padding * 1.7,
    justifyContent: 'center',
    width: SIZES.padding * 1.7,
  },
  body: {
    paddingHorizontal: SIZES.padding * 0.8,
    paddingVertical: SIZES.padding / 5,
  },
  footer: {
    borderTopColor: COLORS.line_quiet,
    borderTopWidth: 1,
    padding: SIZES.padding * 0.8,
  },
});
