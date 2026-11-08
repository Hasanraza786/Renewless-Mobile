import { Pressable, View } from 'react-native';
import { back_icon, bell_icon, gear_box_icon, plus_icon, trash_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';
import { styles } from './styles';
import { navigate } from '../../navigation/service';

type Props = {
  title: string;
  onBack?: () => void;
  // Header + on Home/List/Calendar opens the Add sheet.
  onAdd?: () => void;
  // Detail's top Delete (remove tracking).
  onDelete?: () => void;
  // Alerts itself: the settings gear replaces the bell.
  onSettings?: () => void;
  // Profile: the app Settings gear after the bell.
  onAppSettings?: () => void;
  // Decorative mark after the title (the Gmail logo in the Gmail scan).
  accessory?: string;
  // AI chat: second line under the title and the brand mark after the bell.
  subtitle?: string;
  mark?: string;
};

const HIT_SLOP = SIZES.padding3 / 4;

// Fixed authenticated header: optional Back, title, then the shared Alerts bell and optional Add.
export default function Header({ title, onBack, onAdd, onDelete, onSettings, onAppSettings, accessory, subtitle, mark }: Props) {
  return (
    <RowView gap={SIZES.padding2} style={styles.main_view}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={HIT_SLOP} onPress={onBack}>
          <Icons name={back_icon} />
        </Pressable>
      ) : null}
      <View style={common_styles.flex_1}>
        <CustomText text={title} weight={FONTS.medium} size={SIZES.h4} accessibility_role="header" number_of_lines={2} />
        {subtitle ? <CustomText mt={SIZES.padding3 * 0.75} text={subtitle} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} /> : null}
      </View>
      {accessory ? (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Icons name={accessory} icon_height={SIZES.padding * 1.25} icon_width={SIZES.padding * 1.25} />
        </View>
      ) : null}
      <RowView gap={SIZES.padding3}>
        {onSettings ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Reminder settings" hitSlop={HIT_SLOP} onPress={onSettings}>
            <Icons name={gear_box_icon} />
          </Pressable>
        ) : (
          <Pressable accessibilityRole="button" accessibilityLabel="Alerts" hitSlop={HIT_SLOP} onPress={() => navigate('Alerts')}>
            <Icons name={bell_icon} />
          </Pressable>
        )}
        {onAppSettings ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Settings" hitSlop={HIT_SLOP} onPress={onAppSettings}>
            <Icons name={gear_box_icon} />
          </Pressable>
        ) : null}
        {onAdd ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Add subscription" hitSlop={HIT_SLOP} onPress={onAdd}>
            <Icons name={plus_icon} />
          </Pressable>
        ) : null}
        {onDelete ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Remove tracking" hitSlop={HIT_SLOP} onPress={onDelete}>
            <Icons name={trash_icon} />
          </Pressable>
        ) : null}
        {mark ? (
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Icons name={mark} icon_height={SIZES.padding * 1.2} icon_width={SIZES.padding * 1.2} />
          </View>
        ) : null}
      </RowView>
    </RowView>
  );
}
