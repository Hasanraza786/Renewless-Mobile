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
    borderTopLeftRadius: SIZES.padding + SIZES.padding3 / 2,
    borderTopRightRadius: SIZES.padding + SIZES.padding3 / 2,
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
    width: SIZES.padding * 2 - SIZES.padding3 / 2,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: SIZES.padding2,
    marginBottom: SIZES.padding,
    marginTop: SIZES.padding + SIZES.padding3 / 4 - SIZES.padding3 / 2,
  },
  header_text: {
    flex: 1,
  },
  close: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay_soft,
    borderColor: COLORS.line_soft,
    borderRadius: SIZES.padding2 - SIZES.padding3 / 8,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding * 2 - SIZES.padding3 / 2,
    justifyContent: 'center',
    width: SIZES.padding * 2 - SIZES.padding3 / 2,
  },
});
