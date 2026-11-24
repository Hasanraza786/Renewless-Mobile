import { Fragment } from 'react';
import { View } from 'react-native';
import { hint_icon, inbox_badge_icon, offline_badge_icon, retry_icon } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import RowView from '../../../../components/RowView';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import Mascot from '../../../../components/Mascot';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import SizedBox from '../../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { common_styles } from '../../../../utils/common_styles';
import { INBOX_BRAND } from '../../../../utils/inbox';
import { styles } from './styles';

type Kind = 'no_results' | 'interrupted';
type Props = { onboarding: OnboardingController };

const COPY: Record<Kind, { badge: string; hint_icon: string; eyebrow: string; title: string; emphasis: string; copy: string; hint_title: string; hint: string; reassurance: string; retry: string }> = {
  no_results: {
    badge: inbox_badge_icon,
    hint_icon,
    eyebrow: 'YOUR INBOX, CHECKED',
    title: 'No subscriptions',
    emphasis: 'found this time.',
    copy: 'We didn’t find subscription receipts in this inbox from the last 12 months.',
    hint_title: 'Using another email for payments?',
    hint: 'Your receipts may be in a different inbox. Try the inbox you use for subscriptions.',
    reassurance: 'You can still track any subscription by adding it yourself.',
    retry: 'Try another inbox',
  },
  interrupted: {
    badge: offline_badge_icon,
    hint_icon: retry_icon,
    eyebrow: 'LET’S GET BACK ON TRACK',
    title: 'Your scan',
    emphasis: 'was interrupted.',
    copy: 'We couldn’t finish checking your inbox. Check your connection and try again.',
    hint_title: 'A quick check before retrying',
    hint: 'Check your internet connection. If asked, allow read-only access to your inbox so we can complete your scan.',
    reassurance: 'You can also add subscriptions yourself and connect your inbox later.',
    retry: 'Try again',
  },
};

// Lost inbox access needs a reconnect rather than a retry; the copy names the inbox's mail service.
const accessCopy = (name: string) => `${name} access needs to be renewed before we can continue.`;

// The sad Loop in its circle with a corner badge, drawn at 122pt so it sits centred inside the circle on every recovery
// screen (no results, interrupted and the Gmail recovery; user, 13 November 2026).
export function RecoveryArt({ badge, reduce_motion }: { badge: string; reduce_motion: boolean }) {
  return (
    <View style={styles.art}>
      <View style={[common_styles.absolute, styles.mascot_centre]}>
        <Mascot expression="sad" size={SIZES.padding * 6.1} label="Loop is here to help" draw={!reduce_motion} />
      </View>
      <View style={styles.badge}>
        <Icons name={badge} />
      </View>
    </View>
  );
}

function RecoveryBody({ kind, onboarding }: { kind: Kind } & Props) {
  const content = COPY[kind];
  const access = kind === 'interrupted' && onboarding.scan_failure === 'access';
  return (
    <Fragment>
      {onboarding.is_tablet ? null : (
        <Fragment>
          <RecoveryArt badge={content.badge} reduce_motion={onboarding.reduce_motion} />
          <SizedBox height={SIZES.padding2 * 2} />
        </Fragment>
      )}

      <OnboardingTitle eyebrow={content.eyebrow} title={content.title} emphasis={content.emphasis} copy={access ? accessCopy(INBOX_BRAND[onboarding.inbox_provider].name) : content.copy} align="center" />

      <RowView align_items="stretch" gap={SIZES.padding * 0.55} style={styles.hint}>
        <View style={styles.hint_icon}>
          <Icons name={content.hint_icon} />
        </View>
        <View style={common_styles.flex_1}>
          <CustomText text={content.hint_title} size={SIZES.lg} />
          <CustomText mt={SIZES.padding * 0.35} text={content.hint} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
      </RowView>

      <CustomText mt={SIZES.padding3 * 2} text={content.reassurance} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" style={styles.reassurance} />
    </Fragment>
  );
}

function RecoveryFooter({ kind, onboarding }: { kind: Kind } & Props) {
  return (
    <Fragment>
      <SizedBox height={SIZES.padding2} />

      {kind === 'interrupted' ? (
        <CustomButton variant="primary" text={onboarding.scan_failure === 'access' ? `Reconnect ${INBOX_BRAND[onboarding.inbox_provider].name}` : COPY[kind].retry} onPress={onboarding.retryScan} />
      ) : (
        <CustomButton variant="primary" text={COPY[kind].retry} onPress={() => onboarding.goTo('connectInbox', -1)} />
      )}

      <SizedBox height={SIZES.padding / 2} />

      <CustomButton variant="outline" text="Add with AI" onPress={onboarding.openAi} />
      <SizedBox height={SIZES.padding * 0.65} />
      <CustomButton variant="link" text="Add manually" onPress={onboarding.openManual} />
    </Fragment>
  );
}

export const ScanNoResultsArt = ({ onboarding }: Props) => <RecoveryArt badge={COPY.no_results.badge} reduce_motion={onboarding.reduce_motion} />;
export const ScanInterruptedArt = ({ onboarding }: Props) => <RecoveryArt badge={COPY.interrupted.badge} reduce_motion={onboarding.reduce_motion} />;
export const ScanNoResultsBody = (props: Props) => <RecoveryBody kind="no_results" {...props} />;
export const ScanNoResultsFooter = (props: Props) => <RecoveryFooter kind="no_results" {...props} />;
export const ScanInterruptedBody = (props: Props) => <RecoveryBody kind="interrupted" {...props} />;
export const ScanInterruptedFooter = (props: Props) => <RecoveryFooter kind="interrupted" {...props} />;
