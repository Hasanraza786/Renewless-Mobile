import { View } from 'react-native';
import { chevron_right_icon, gmail_logo, pencil_icon, sparkle_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { navigate } from '../../navigation/service';
import { trackEvent } from '../../utils/analytics';
import { common_styles } from '../../utils/common_styles';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';
import { styles } from './styles';

type Props = {
  // Runs before the chosen screen opens (the Add sheet closes itself).
  onPick?: () => void;
  // Home's sync-locked card says Connect another Gmail / Find subscriptions in a second inbox; null leaves the Gmail row
  // out (both free inboxes are connected).
  gmail?: { title: string; copy: string; open: () => void } | null;
};

const OPTIONS = [
  { title: 'Connect Gmail', copy: 'Find subscriptions in your inbox', icon: gmail_logo, ai: false, option: 'gmail', open: () => navigate('GmailScan') },
  { title: 'Add with AI', copy: 'Type, speak, or share a screenshot', icon: sparkle_icon, ai: true, option: 'ai', open: () => navigate('AiChat') },
  { title: 'Add manually', copy: 'Enter your subscription details', icon: pencil_icon, ai: false, option: 'manual', open: () => navigate('AddSubscription') },
];

// The three ways to add a subscription as option rows (icon, title, one line, chevron): the Add sheet and Home's
// sync-locked Gmail card.
export default function AddOptions({ onPick, gmail }: Props) {
  const options = gmail === null ? OPTIONS.slice(1) : gmail ? [{ ...OPTIONS[0], ...gmail }, ...OPTIONS.slice(1)] : OPTIONS;
  return (
    <View style={styles.options}>
      {options.map(option => (
        <RowView
          key={option.option}
          gap={SIZES.padding2}
          accessibilityRole="button"
          accessibilityLabel={`${option.title}. ${option.copy}`}
          onPress={() => {
            trackEvent('add_option_selected', { option: option.option });
            onPick?.();
            option.open();
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
