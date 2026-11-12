import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { apple_icon, back_icon, google_icon, logo_mark } from '../../assets/icons';
import { COLORS, FONTS, SIZES, behavior } from '../../constants/theme';
import type { AuthProvider } from '../../types';
import Container from '../Container';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import RowView from '../RowView';
import SizedBox from '../SizedBox';
import Icons from '../Icons';
import { common_styles } from '../../utils/common_styles';
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

export default function AuthLayout({ title, copy, onBack, compact, children }: Props) {
  return (
    <Container is_auth>
      <KeyboardAvoidingView behavior={behavior} style={common_styles.flex_1}>
        <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, onBack ? styles.content_recovery : styles.content_brand]}>
          {onBack ? (
            <RowView justify_content="space-between" style={styles.recovery_top}>
              <Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={SIZES.padding3 / 4} onPress={onBack} style={styles.back}>
                <Icons name={back_icon} />
              </Pressable>
              <Icons name={logo_mark} icon_height={SIZES.padding * 1.5} icon_width={SIZES.padding * 1.5} />
            </RowView>
          ) : (
            <RowView accessible accessibilityRole="header" accessibilityLabel="Renewless" gap={SIZES.padding * 0.35} style={compact ? styles.brand_compact : styles.brand}>
              <Icons name={logo_mark} icon_height={SIZES.padding * 1.55} icon_width={SIZES.padding * 1.55} />
              <CustomText text="Renewless" size={SIZES.h3} letter_spacing={-0.5} />
            </RowView>
          )}

          <CustomText text={title} size={SIZES.h3} letter_spacing={-0.5} />

          <CustomText mt={onBack ? SIZES.padding2 : SIZES.padding * 0.45} text={copy} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} style={onBack && styles.copy_recovery} />

          <SizedBox height={onBack ? SIZES.padding * 1.6 : compact ? SIZES.padding * 1.2 : SIZES.padding * 1.45} />

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

export function AuthDivider({ style }: { style: StyleProp<ViewStyle> }) {
  return (
    <RowView gap={SIZES.padding * 0.75} style={style}>
      <View style={styles.divider_line} />
      <CustomText text="or" weight={FONTS.regular} color={COLORS.divider_text} size={SIZES.sm} />
      <View style={styles.divider_line} />
    </RowView>
  );
}

export function SocialButtons({ onPress, disabled }: { onPress: (provider: AuthProvider) => void; disabled?: boolean }) {
  return (
    <View style={styles.social}>
      <CustomButton variant="social" icon={google_icon} text="Continue with Google" disabled={disabled} onPress={() => onPress('google')} />
      {/* Sign in with Apple is iOS only; Android has no Apple flow. */}
      {Platform.OS === 'ios' ? <CustomButton variant="social" icon={apple_icon} text="Continue with Apple" disabled={disabled} onPress={() => onPress('apple')} /> : null}
    </View>
  );
}

// "New to Renewless? Sign up" style row.
export function AuthFooterLink({ prompt, link, onPress, style }: { prompt: string; link: string; onPress: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <RowView justify_content="center" gap={SIZES.padding * 0.3} style={[styles.footer, style]}>
      <CustomText text={prompt} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <Pressable accessibilityRole="link" onPress={onPress} style={styles.footer_link}>
        <CustomText text={link} color={COLORS.primary} size={SIZES.sm} />
      </Pressable>
    </RowView>
  );
}
