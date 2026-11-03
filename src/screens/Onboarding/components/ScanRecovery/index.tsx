import { View } from 'react-native';
import { hint_icon, inbox_badge_icon, offline_badge_icon, retry_icon } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import Mascot from '../../../../components/Mascot';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { styles } from './styles';

type Kind = 'no_results' | 'interrupted';
type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;
const ICON = SIZES.padding;

const COPY: Record<Kind, { badge: string; hint_icon: string; eyebrow: string; title: string; emphasis: string; copy: string; hint_title: string; hint: string; reassurance: string; retry: string }> = {
  no_results: {
    badge: inbox_badge_icon,
    hint_icon,
    eyebrow: 'YOUR INBOX, CHECKED',
    title: 'No subscriptions',
    emphasis: 'found this time.',
    copy: 'We didn’t find subscription receipts in this inbox from the last 12 months.',
    hint_title: 'Using another email for payments?',
    hint: 'Your receipts may be in a different inbox. Try the Gmail account you use for subscriptions.',
    reassurance: 'You can still track any subscription by adding it yourself.',
    retry: 'Try another Gmail account',
  },
  interrupted: {
    badge: offline_badge_icon,
    hint_icon: retry_icon,
    eyebrow: 'LET’S GET BACK ON TRACK',
    title: 'Your scan',
    emphasis: 'was interrupted.',
    copy: 'We couldn’t finish checking your inbox. Check your connection and try again.',
    hint_title: 'A quick check before retrying',
    hint: 'Check your internet connection. If Google asks, allow read-only Gmail access so we can complete your scan.',
    reassurance: 'You can also add subscriptions yourself and connect your inbox later.',
    retry: 'Try again',
  },
};

// Lost Gmail access needs a reconnect rather than a retry.
const ACCESS_COPY = 'Gmail access needs to be renewed before we can continue.';

function RecoveryBody({ kind, onboarding }: { kind: Kind } & Props) {
  const content = COPY[kind];
  const access = kind === 'interrupted' && onboarding.scan_failure === 'access';
  return (
    <>
      <View style={styles.art}>
        <View style={styles.mascot}>
          <Mascot expression="sad" size={SIZES.padding * 7 + SIZES.padding3 + SIZES.padding3 / 4} label="Loop is here to help" draw={!onboarding.reduce_motion} />
        </View>
        <View style={styles.badge}>
          <Icons name={content.badge} icon_height={ICON} icon_width={ICON} stroke={COLORS.primary} />
        </View>
      </View>
      <View style={styles.intro}>
        <OnboardingTitle eyebrow={content.eyebrow} title={content.title} emphasis={content.emphasis} copy={access ? ACCESS_COPY : content.copy} align="center" />
      </View>
      <View style={styles.hint}>
        <View style={styles.hint_icon}>
          <Icons name={content.hint_icon} icon_height={ICON} icon_width={ICON} stroke={COLORS.primary} />
        </View>
        <View style={styles.hint_text}>
          <CustomText text={content.hint_title} size={SIZES.lg} line_height={SIZES.padding + SIZES.padding3 / 4} />
          <CustomText text={content.hint} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} mt={SIZES.padding3 - SIZES.padding3 / 8} />
        </View>
      </View>
      <CustomText text={content.reassurance} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} align="center" style={styles.reassurance} />
    </>
  );
}

function RecoveryFooter({ kind, onboarding }: { kind: Kind } & Props) {
  return (
    <>
      <View style={styles.primary}>
        {kind === 'interrupted' ? (
          <CustomButton variant="primary" text={onboarding.scan_failure === 'access' ? 'Reconnect Gmail' : COPY[kind].retry} onPress={onboarding.retryScan} />
        ) : (
          <CustomButton variant="primary" text={COPY[kind].retry} onPress={() => onboarding.goTo('connectInbox', -1)} />
        )}
      </View>
      <View style={styles.secondary}>
        <CustomButton variant="secondary" text="Add a subscription manually" onPress={onboarding.openManual} />
      </View>
    </>
  );
}

export const ScanNoResultsBody = (props: Props) => <RecoveryBody kind="no_results" {...props} />;
export const ScanNoResultsFooter = (props: Props) => <RecoveryFooter kind="no_results" {...props} />;
export const ScanInterruptedBody = (props: Props) => <RecoveryBody kind="interrupted" {...props} />;
export const ScanInterruptedFooter = (props: Props) => <RecoveryFooter kind="interrupted" {...props} />;
