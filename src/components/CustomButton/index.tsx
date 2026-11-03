import { Pressable } from 'react-native';
import { COLORS, FONTS, SIZES, colors } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { styles } from './styles';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  // Omitted = the legacy filled button; the others are the approved prototype buttons.
  variant?: 'primary' | 'secondary' | 'link' | 'social';
  // SVG markup for the leading provider icon of a social button.
  icon?: string;
  loading?: boolean;
};

export default function CustomButton({ text, onPress, disabled, variant, icon, loading }: Props) {
  if (variant) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled, busy: !!loading }}
        disabled={disabled || loading}
        onPress={onPress}
        style={({ pressed }) => [
          styles[variant],
          pressed && !disabled && styles.pressed_variant,
          disabled && styles.disabled_variant,
        ]}>
        {icon ? <Icons name={icon} icon_height={SIZES.padding} icon_width={SIZES.padding} fill={colors.text} style={styles.social_icon} /> : null}
        <CustomText
          text={text}
          weight={variant === 'primary' || variant === 'social' ? FONTS.medium : FONTS.regular}
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
