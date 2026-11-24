import { Platform, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import LinkText from '../LinkText';
import { styles } from './styles';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  // Omitted = the legacy filled button; the others are the approved prototype buttons.
  // outline: the second action beside a filled primary, mint border and mint text (24 Nov 2026).
  variant?: 'primary' | 'secondary' | 'outline' | 'link' | 'social' | 'danger';
  // Size/shape override where a screen's approved button differs from the variant (height, radius).
  style?: StyleProp<ViewStyle>;
  // SVG markup for the leading provider icon of a social button.
  icon?: string;
  busy?: boolean;
  // An SVG after the label (View subscription ›, Save n subscriptions →).
  trailing_icon?: string;
};

export default function CustomButton({ text, onPress, disabled, variant, style, icon, busy, trailing_icon }: Props) {
  if (variant) {
    const color = variant === 'primary' ? COLORS.background : variant === 'danger' ? COLORS.on_danger : variant === 'link' ? COLORS.text_secondary : variant === 'outline' ? COLORS.primary : COLORS.text_primary;
    const weight = variant === 'primary' || variant === 'social' || variant === 'outline' ? FONTS.medium : FONTS.regular;
    return (
      <Pressable
        accessibilityRole="button"
        // Android never clears a busy state once set, so there a request in flight reads as disabled instead.
        accessibilityState={Platform.OS === 'ios' ? { disabled: !!disabled, busy: !!busy } : { disabled: !!disabled || !!busy }}
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
        {trailing_icon ? <LinkText text={text} weight={weight} color={color} icon={trailing_icon} justify_content="center" /> : <CustomText text={text} weight={weight} color={color} size={SIZES.sm} align="center" />}
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
