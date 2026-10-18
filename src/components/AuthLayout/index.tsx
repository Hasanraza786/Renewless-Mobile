import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import Container from '../Container';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  children: ReactNode;
  footer?: ReactNode;
  plain?: boolean;
  logo?: boolean;
};

function RenewlessMark() {
  return (
    <View style={styles.logoRow}>
      <View style={styles.mark}>
        <Text style={styles.markLetter}>R</Text>
      </View>
      <Text style={styles.brand}>Renewless</Text>
    </View>
  );
}

export default function AuthLayout({
  title,
  subtitle,
  onBack,
  children,
  footer,
  plain = false,
  logo = false,
}: Props) {
  const insets = useSafeAreaInsets();
  const contentBottom = 16 + Math.max(12 - insets.bottom, 0);

  return (
    <Container isAuth style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, { paddingBottom: contentBottom }]}>
          <View style={styles.brandBlock}>
            {logo ? <RenewlessMark /> : <Text style={styles.brand}>Renewless</Text>}
            <View style={styles.rule} />
            <Text style={styles.tagline}>
              Stop the subscription renewals you don't need.
            </Text>
          </View>

          {onBack ? (
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              style={styles.back}
              hitSlop={8}>
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          ) : null}

          <View style={plain ? styles.plain : styles.card}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            {children}
          </View>

          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

export function AuthError({ message }: { message: string }) {
  if (!message) return null;
  return <Text style={styles.error}>{message}</Text>;
}

export function AuthPrompt({
  label,
  link,
  onPress,
}: {
  label: string;
  link: string;
  onPress: () => void;
}) {
  return (
    <Text style={styles.prompt}>
      {label}{' '}
      <Text accessibilityRole="link" onPress={onPress} style={styles.promptLink}>
        {link}
      </Text>
    </Text>
  );
}

export function AuthLink({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="link" hitSlop={8} onPress={onPress} style={styles.linkHit}>
      <Text style={styles.linkText}>{label}</Text>
    </Pressable>
  );
}

export function AuthAction({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.action}>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: 8,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  brandBlock: {
    marginBottom: 20,
    marginTop: 8,
  },
  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  mark: {
    alignItems: 'center',
    backgroundColor: colors.navy,
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  markLetter: {
    color: colors.mintBright,
    fontSize: 26,
    fontWeight: '700',
  },
  brand: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  rule: {
    backgroundColor: colors.mint,
    borderRadius: 2,
    height: 3,
    marginTop: 10,
    width: 36,
  },
  tagline: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 10,
  },
  back: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginBottom: 12,
    minHeight: 44,
    paddingRight: 12,
  },
  backText: {
    color: colors.mint,
    fontSize: 16,
    fontWeight: '700',
  },
  plain: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  title: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 16,
    marginTop: -8,
  },
  footer: {
    gap: 10,
    marginTop: 'auto',
    paddingTop: 24,
  },
  action: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 16,
  },
  actionLabel: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    color: '#B91C1C',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  prompt: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  promptLink: {
    color: colors.mint,
    fontWeight: '700',
  },
  linkHit: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 16,
    minHeight: 32,
  },
  linkText: {
    color: colors.mint,
    fontSize: 15,
    fontWeight: '700',
  },
});
