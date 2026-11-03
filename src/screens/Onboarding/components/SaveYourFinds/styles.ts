import { StyleSheet } from 'react-native';
import { SIZES, colors } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  art: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderColor: colors.accent_tile,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 2 + SIZES.padding3 / 8,
    borderWidth: SIZES.padding3 / 8,
    height: SIZES.padding * 3 - SIZES.padding3 / 2,
    justifyContent: 'center',
    marginBottom: SIZES.padding3 * 2,
    width: SIZES.padding * 3 - SIZES.padding3 / 2,
  },
  check: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: SIZES.padding2,
    bottom: -SIZES.padding3 / 2,
    height: SIZES.padding2 * 2,
    justifyContent: 'center',
    position: 'absolute',
    right: -SIZES.padding3 / 2,
    width: SIZES.padding2 * 2,
  },
  summary: {
    backgroundColor: colors.card,
    borderColor: colors.accent_border,
    borderRadius: SIZES.padding2 + SIZES.padding3 / 4,
    borderWidth: SIZES.padding3 / 8,
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding2 + SIZES.padding3 / 4,
    paddingVertical: SIZES.padding2,
  },
  footer: {
    marginTop: SIZES.padding3,
  },
  gap: {
    marginTop: SIZES.padding3 + SIZES.padding3 / 4,
  },
  email: {
    alignItems: 'center',
    paddingVertical: SIZES.padding3 + SIZES.padding3 / 4 + SIZES.padding3 / 8,
  },
  legal: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: SIZES.padding3 / 2,
    paddingTop: SIZES.padding3 / 4,
  },
  legal_item: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.padding3 + SIZES.padding3 / 4,
  },
  legal_link: {
    paddingHorizontal: SIZES.padding3 - SIZES.padding3 / 4,
    paddingVertical: SIZES.padding3 - SIZES.padding3 / 8,
  },
});
