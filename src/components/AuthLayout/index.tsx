import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { apple_icon, back_icon, google_icon, logo_mark } from '../../assets/icons';
import { COLORS, FONTS, SIZES, behavior } from '../../constants/theme';
import type { AuthProvider } from '../../types';
import Container from '../Container';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { styles } from './styles';

type Props = {
  title: string;
  copy: string;
  // Login and Sign up show the R + Renewless brand; recovery screens show Back and the R mark.
  onBack?: () => void;
  // Sign up's tighter approved spacing.
  compact?: boolean;
  children: ReactNode;
};

const HEADING_LINE = SIZES.padding + SIZES.padding3;
const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;

export default function AuthLayout({ title, copy, onBack, compact, children }: Props) {
  return (
    <Container is_auth>
      <KeyboardAvoidingView behavior={behavior} style={styles.flex}>
        <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, onBack ? styles.content_recovery : styles.content_brand]}>
          {onBack ? (
            <View style={styles.recovery_top}>
              <Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={SIZES.padding3 / 4} onPress={onBack} style={styles.back}>
                <Icons name={back_icon} icon_height={SIZES.padding * 2} icon_width={SIZES.padding * 2} />
              </Pressable>
              <Icons name={logo_mark} icon_height={SIZES.padding + SIZES.padding2 - SIZES.padding3 / 4} icon_width={SIZES.padding + SIZES.padding2 - SIZES.padding3 / 4} />
            </View>
          ) : (
            <View accessible accessibilityRole="header" accessibilityLabel="Renewless" style={[styles.brand, compact && styles.brand_compact]}>
              <Icons name={logo_mark} icon_height={SIZES.padding + SIZES.padding2 - SIZES.padding3 / 8} icon_width={SIZES.padding + SIZES.padding2 - SIZES.padding3 / 8} />
              <CustomText text="Renewless" size={SIZES.h3} line_height={HEADING_LINE} style={styles.tight} />
            </View>
          )}
          <View style={[styles.intro, compact && styles.intro_compact, onBack && styles.intro_recovery]}>
            <CustomText text={title} size={SIZES.h3} line_height={HEADING_LINE} style={styles.tight} />
            <CustomText text={copy} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} style={onBack ? styles.copy_recovery : styles.copy} />
          </View>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

export function AuthDivider({ style }: { style: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.divider, style]}>
      <View style={styles.divider_line} />
      <CustomText text="or" weight={FONTS.regular} color={COLORS.divider_text} size={SIZES.sm} line_height={BODY_LINE} />
      <View style={styles.divider_line} />
    </View>
  );
}

export function SocialButtons({ onPress, disabled }: { onPress: (provider: AuthProvider) => void; disabled?: boolean }) {
  return (
    <View style={styles.social}>
      <CustomButton variant="social" icon={google_icon} text="Continue with Google" disabled={disabled} onPress={() => onPress('google')} />
      <CustomButton variant="social" icon={apple_icon} text="Continue with Apple" disabled={disabled} onPress={() => onPress('apple')} />
    </View>
  );
}

// "New to Renewless? Sign up" style row.
export function AuthFooterLink({ prompt, link, onPress, style }: { prompt: string; link: string; onPress: () => void; style: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.footer, style]}>
      <CustomText text={prompt} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
      <Pressable accessibilityRole="link" onPress={onPress} style={styles.footer_link}>
        <CustomText text={link} color={COLORS.primary} size={SIZES.sm} line_height={BODY_LINE} />
      </Pressable>
    </View>
  );
}
