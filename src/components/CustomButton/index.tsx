import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { styles } from './styles';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  // Omitted = the legacy filled button; the others are the approved prototype buttons.
  variant?: 'primary' | 'secondary' | 'link' | 'social' | 'danger';
  // Size/shape override where a screen's approved button differs from the variant (height, radius).
  style?: StyleProp<ViewStyle>;
  // SVG markup for the leading provider icon of a social button.
  icon?: string;
  busy?: boolean;
};

export default function CustomButton({ text, onPress, disabled, variant, style, icon, busy }: Props) {
  if (variant) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled, busy: !!busy }}
        disabled={disabled || busy}
        onPress={onPress}
        // Text links stay visually compact but get a 44pt touch target.
        hitSlop={variant === 'link' ? SIZES.padding2 : undefined}
        style={({ pressed }) => [
          styles[variant],
          style,
          pressed && !disabled && styles.pressed_variant,
          disabled && styles.disabled_variant,
        ]}>
        {icon ? <Icons name={icon} style={styles.social_icon} /> : null}
        <CustomText
          text={text}
          weight={variant === 'primary' || variant === 'social' ? FONTS.medium : FONTS.regular}
          color={variant === 'primary' ? COLORS.background : variant === 'danger' ? COLORS.on_danger : variant === 'link' ? COLORS.text_secondary : COLORS.text_primary}
          size={SIZES.sm}
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
        color={disabled ? COLORS.text_secondary : COLORS.background}
        size={SIZES.md}
        line_height={null}
      />
    </Pressable>
  );
}
