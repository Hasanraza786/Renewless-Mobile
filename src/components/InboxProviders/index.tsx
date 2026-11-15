import { Fragment } from 'react';
import { Pressable, View } from 'react-native';
import { chevron_right_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import type { InboxProvider } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { INBOX_BRAND } from '../../utils/inbox';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';
import SizedBox from '../SizedBox';
import { styles } from './styles';

type Props = {
  // buttons: onboarding and the empty Home; tiles: the Add sheet; rows: the Choose inbox sheet.
  variant: 'buttons' | 'tiles' | 'rows';
  onPick: (provider: InboxProvider) => void;
  // Button labels when they differ from Continue with Gmail / Outlook (onboarding signs in too).
  labels?: Record<InboxProvider, string>;
  // The provider whose connect is running: its button says Connecting… and both are disabled.
  busy?: InboxProvider | null;
};

const PROVIDERS: { provider: InboxProvider; tile: string; row: string }[] = [
  { provider: 'gmail', tile: 'Gmail & Workspace', row: 'Gmail or Google Workspace' },
  { provider: 'outlook', tile: 'Hotmail & Live', row: 'Outlook, Hotmail or Live' },
];

// Gmail and Outlook side by side at equal size and weight (Google's branding rule: never less prominent than another provider).
export default function InboxProviders({ variant, onPick, labels, busy = null }: Props) {
  if (variant === 'buttons') {
    return (
      <View>
        {PROVIDERS.map(({ provider }, index) => (
          <Fragment key={provider}>
            {index ? <SizedBox height={SIZES.padding / 2} /> : null}
            <CustomButton
              variant="social"
              icon={INBOX_BRAND[provider].logo}
              text={busy === provider ? 'Connecting…' : labels?.[provider] ?? `Continue with ${INBOX_BRAND[provider].name}`}
              busy={busy === provider}
              disabled={!!busy}
              onPress={() => onPick(provider)}
              style={styles.button}
            />
          </Fragment>
        ))}
      </View>
    );
  }
  if (variant === 'tiles') {
    return (
      <RowView align_items="stretch" gap={SIZES.padding * 0.45}>
        {PROVIDERS.map(({ provider, tile }) => (
          <Pressable
            key={provider}
            accessibilityRole="button"
            accessibilityLabel={`${INBOX_BRAND[provider].name}. ${tile}`}
            onPress={() => onPick(provider)}
            style={({ pressed }) => [styles.option, styles.tile, pressed && styles.pressed]}>
            <View style={styles.icon}>
              <Icons name={INBOX_BRAND[provider].logo} icon_height={SIZES.padding * 1.2} icon_width={SIZES.padding * 1.2} />
            </View>
            <CustomText mt={SIZES.padding * 0.5} text={INBOX_BRAND[provider].name} weight={FONTS.medium} size={SIZES.md} />
            <CustomText mt={SIZES.padding / 4} text={tile} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
          </Pressable>
        ))}
      </RowView>
    );
  }
  return (
    <View style={styles.rows}>
      {PROVIDERS.map(({ provider, row }) => (
        <RowView
          key={provider}
          gap={SIZES.padding2}
          accessibilityRole="button"
          accessibilityLabel={`${INBOX_BRAND[provider].name}. ${row}`}
          onPress={() => onPick(provider)}
          style={styles.option}>
          <View style={styles.icon}>
            <Icons name={INBOX_BRAND[provider].logo} icon_height={SIZES.padding * 1.2} icon_width={SIZES.padding * 1.2} />
          </View>
          <View style={common_styles.flex_1}>
            <CustomText text={INBOX_BRAND[provider].name} weight={FONTS.medium} size={SIZES.md} />
            <CustomText mt={SIZES.padding / 4} text={row} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
          </View>
          <Icons name={chevron_right_icon} />
        </RowView>
      ))}
    </View>
  );
}
