import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  spend_row: {
    alignItems: 'center',
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: SIZES.padding / 2,
    paddingVertical: SIZES.padding * 0.55,
  },
  spend_avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.6,
    justifyContent: 'center',
    width: SIZES.padding * 1.6,
  },
  others_avatar: {
    backgroundColor: COLORS.progress_track,
    borderRadius: SIZES.padding * 0.8,
  },
  spend_track: {
    backgroundColor: COLORS.line_faint,
    borderRadius: SIZES.padding3,
    height: SIZES.padding / 4,
    marginTop: SIZES.padding3,
    overflow: 'hidden',
  },
  spend_fill: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding3,
    height: '100%',
  },
  spend_value: {
    alignItems: 'flex-end',
  },
  trials: {
    borderTopColor: COLORS.line_faint,
    borderTopWidth: 1,
    marginTop: SIZES.padding2,
    paddingTop: SIZES.padding / 2,
  },
  trial_row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding * 0.45,
    paddingBottom: SIZES.padding / 10,
    paddingTop: SIZES.padding2,
  },
  trial_avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.logo_tile,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 1.5,
    justifyContent: 'center',
    width: SIZES.padding * 1.5,
  },
});
