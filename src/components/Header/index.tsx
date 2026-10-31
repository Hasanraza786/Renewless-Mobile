import {
  Pressable,
  View,
} from 'react-native';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { SIZES, colors } from '../../constants/theme';
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
          <CustomText text="Back" color={colors.text} size={SIZES.button} line_height={SIZES.button_line} />
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
      <CustomText text={title} size={SIZES.screen_heading} line_height={SIZES.screen_heading_line} align="center" style={common_styles.flex_1} />
      {action_label && onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} style={styles.side}>
          <CustomText text={action_label} color={colors.accent} size={SIZES.button} line_height={SIZES.button_line} align="right" />
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
    </RowView>
  );
}
