import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.sheet_scrim,
  },
  sheet: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.line_sheet,
    borderTopLeftRadius: SIZES.padding * 1.2,
    borderTopRightRadius: SIZES.padding * 1.2,
    borderWidth: SIZES.padding3 / 8,
    maxHeight: '85%',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: COLORS.handle,
    borderRadius: SIZES.padding3 / 2,
    height: SIZES.padding3 / 2,
    width: SIZES.padding * 1.8,
  },
  close: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay_soft,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding * 0.55,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding * 1.8,
    justifyContent: 'center',
    width: SIZES.padding * 1.8,
  },
  header: {
    marginTop: SIZES.padding * 0.9,
    marginBottom: SIZES.padding,
  },
});
