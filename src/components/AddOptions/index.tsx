import { View } from 'react-native';
import { Fragment } from 'react';
import { chevron_right_icon, mail_icon, pencil_icon, sparkle_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { navigate } from '../../navigation/service';
import { trackEvent } from '../../utils/analytics';
import { common_styles } from '../../utils/common_styles';
import { afterModalClose } from '../../utils/modal';
import type { InboxProvider } from '../../types';
import CustomText from '../CustomText';
import InboxProviders from '../InboxProviders';
import Icons from '../Icons';
import RowView from '../RowView';
import { styles } from './styles';

type Props = {
  // Runs before the chosen screen opens (the Add sheet closes itself).
  onPick?: () => void;
  // Omitted: the Add sheet's Gmail and Outlook tiles. Home's sync-locked card passes a Connect another inbox row instead,
  // or null when both free inboxes are connected.
  inbox?: { title: string; copy: string; open: () => void } | null;
};

const OPTIONS = [
  { title: 'Add with AI', copy: 'Type, speak, or share a screenshot', icon: sparkle_icon, ai: true, option: 'ai', open: () => navigate('AiChat') },
  { title: 'Add manually', copy: 'Enter your subscription details', icon: pencil_icon, ai: false, option: 'manual', open: () => navigate('AddSubscription') },
];

// The ways to add a subscription: the Add sheet (Gmail and Outlook tiles, then AI and manual rows) and Home's sync-locked
// inbox card (option rows only).
export default function AddOptions({ onPick, inbox }: Props) {
  const options = inbox ? [{ ...inbox, icon: mail_icon, ai: false, option: 'inbox' }, ...OPTIONS] : OPTIONS;
  // The Add sheet closes first; the next screen opens once its fade ends.
  const run = (open: () => void) => {
    if (onPick) {
      onPick();
      afterModalClose(open);
    } else open();
  };
  const pickProvider = (provider: InboxProvider) => {
    trackEvent('add_option_selected', { option: provider });
    run(() => navigate('GmailScan', { connect: provider }));
  };
  return (
    <View style={styles.options}>
      {inbox === undefined ? (
        <Fragment>
          <CustomText text="Find subscriptions in your inbox" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} letter_spacing={0.5} />
          <InboxProviders variant="tiles" onPick={pickProvider} />
        </Fragment>
      ) : null}
      {options.map(option => (
        <RowView
          key={option.option}
          gap={SIZES.padding2}
          accessibilityRole="button"
          accessibilityLabel={`${option.title}. ${option.copy}`}
          onPress={() => {
            trackEvent('add_option_selected', { option: option.option });
            run(option.open);
          }}
          style={[styles.option, option.ai && styles.option_ai]}>
          <View style={[styles.icon, option.ai && styles.icon_ai]}>
            <Icons name={option.icon} />
          </View>
          <View style={common_styles.flex_1}>
            <CustomText text={option.title} weight={FONTS.medium} size={SIZES.md} />
            <CustomText mt={SIZES.padding / 4} text={option.copy} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
          </View>
          <Icons name={chevron_right_icon} />
        </RowView>
      ))}
    </View>
  );
}
