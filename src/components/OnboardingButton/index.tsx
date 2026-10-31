import { colors } from '../../constants/theme';
import { Pressable, View } from 'react-native';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { styles } from './styles';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: string;
};

export function OnboardingPrimary({ text, onPress, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.primary, pressed && !disabled && styles.pressed, disabled && styles.disabled]}>
      <CustomText text={text} color={disabled ? colors.text_secondary : colors.on_accent} size={14} line_height={20} />
    </Pressable>
  );
}

export function OnboardingSecondary({ text, onPress, icon }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.secondary}>
      {icon ? (
        <View style={styles.social_icon}>
          <Icons name={icon} icon_height={20} fill={colors.text} />
        </View>
      ) : null}
      <CustomText text={text} size={icon ? 13 : 14} line_height={18} />
    </Pressable>
  );
}

export function OnboardingLink({ text, onPress, light }: { text: string; onPress: () => void; light?: boolean }) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} style={styles.link}>
      <CustomText text={text} weight="Raleway-Regular" color={light ? colors.text : colors.text_secondary} size={12} line_height={16} align="center" />
    </Pressable>
  );
}
