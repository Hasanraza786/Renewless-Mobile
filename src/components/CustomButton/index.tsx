import { Pressable } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import { styles } from './styles';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function CustomButton({ text, onPress, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <CustomText
        text={text}
        color={disabled ? COLORS.disabled_text : COLORS.on_accent}
        size={SIZES.button}
        line_height={SIZES.button_line}
      />
    </Pressable>
  );
}
