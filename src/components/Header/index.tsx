import { Pressable, View } from 'react-native';
import { back_icon, bell_icon, plus_icon, trash_icon } from '../../assets/icons';
import { FONTS, SIZES } from '../../constants/theme';
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
};

const HIT_SLOP = SIZES.padding3 / 4;

// Fixed authenticated header: optional Back, title, then the shared Alerts bell and optional Add.
export default function Header({ title, onBack, onAdd, onDelete }: Props) {
  return (
    <RowView gap={SIZES.padding2} style={styles.main_view}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={HIT_SLOP} onPress={onBack}>
          <Icons name={back_icon} />
        </Pressable>
      ) : null}
      <View style={common_styles.flex_1}>
        <CustomText text={title} weight={FONTS.medium} size={SIZES.h3} accessibility_role="header" number_of_lines={1} />
      </View>
      <RowView gap={SIZES.padding3}>
        <Pressable accessibilityRole="button" accessibilityLabel="Alerts" hitSlop={HIT_SLOP} onPress={() => navigate('ComingSoon', { title: 'Alerts' })}>
          <Icons name={bell_icon} />
        </Pressable>
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
      </RowView>
    </RowView>
  );
}
