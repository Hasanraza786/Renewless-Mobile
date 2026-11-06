import { View } from 'react-native';
import { chevron_right_icon, gmail_logo, pencil_icon, sparkle_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { navigate } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import AppSheet from '../AppSheet';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';
import { styles } from './styles';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const OPTIONS = [
  { title: 'Add with AI', copy: 'Type, speak, or share a screenshot', icon: sparkle_icon, ai: true, open: () => navigate('AiChat') },
  { title: 'Add manually', copy: 'Enter your subscription details', icon: pencil_icon, ai: false, open: () => navigate('AddSubscription') },
  { title: 'Connect Gmail', copy: 'Find subscriptions in your inbox', icon: gmail_logo, ai: false, open: () => navigate('GmailScan') },
];

// Header + on Home, List and Calendar (and an empty Calendar date): exactly three ways to add. Close keeps the screen as it was.
export default function AddSheet({ visible, onClose }: Props) {
  return (
    <AppSheet visible={visible} title="Add a subscription" subtitle="Choose what works for you." onClose={onClose}>
      <View style={styles.options}>
        {OPTIONS.map(option => (
          <RowView
            key={option.title}
            gap={SIZES.padding2}
            accessibilityRole="button"
            accessibilityLabel={`${option.title}. ${option.copy}`}
            onPress={() => {
              onClose();
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
    </AppSheet>
  );
}
