import { Pressable } from 'react-native';
import { COLORS, FONTS, SIZES, colors } from '../../constants/theme';
import CustomText from '../CustomText';
import { styles } from './styles';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  // Omitted = the legacy filled button; the others are the approved prototype buttons.
  variant?: 'primary' | 'secondary' | 'link';
};

export default function CustomButton({ text, onPress, disabled, variant }: Props) {
  if (variant) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles[variant],
          pressed && !disabled && styles.pressed_variant,
          disabled && styles.disabled_variant,
        ]}>
        <CustomText
          text={text}
          weight={variant === 'primary' ? FONTS.medium : FONTS.regular}
          color={variant === 'primary' ? colors.on_accent : variant === 'link' ? colors.text_secondary : colors.text}
          size={SIZES.sm}
          line_height={SIZES.padding - SIZES.padding3 / 4}
          align="center"
        />
      </Pressable>
    );
  }

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
        size={(SIZES.padding2 + SIZES.padding3 / 4)}
      />
    </Pressable>
  );
}
