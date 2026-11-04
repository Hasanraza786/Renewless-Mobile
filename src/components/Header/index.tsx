import {
  Pressable,
  View,
} from 'react-native';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { COLORS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = {
  title: string;
  onBack?: () => void;
  action_label?: string;
  onAction?: () => void;
};

export default function Header({ title, onBack, action_label, onAction }: Props) {
  return (
    <RowView gap={0} style={{ marginBottom: SIZES.padding * 0.9 }}>
      {onBack ? (
        <Pressable accessibilityRole="button" onPress={onBack} style={styles.side}>
          <CustomText text="Back" color={COLORS.text_primary} size={SIZES.md} />
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
      <CustomText text={title} size={SIZES.h3} align="center" style={common_styles.flex_1} />
      {action_label && onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} style={styles.side}>
          <CustomText text={action_label} color={COLORS.primary} size={SIZES.md} align="right" />
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
    </RowView>
  );
}
