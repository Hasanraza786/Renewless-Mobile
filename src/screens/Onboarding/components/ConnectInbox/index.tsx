import { Fragment } from 'react';
import { Pressable, View } from 'react-native';
import { arrow_icon, gmail_logo, logo_mark } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import RowView from '../../../../components/RowView';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import InfoTooltip from '../../../../components/InfoTooltip';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import SizedBox from '../../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { styles } from './styles';

type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding * 0.9;
const TRUST_ROWS = [
  ['Read-only access', 'We can’t send or delete emails'],
  ['You’re in control', 'Review before saving'],
  ['Scans & updates', 'Free to use'],
];

function Brand({ icon, label, size }: { icon: string; label: string; size: number }) {
  return (
    <View style={styles.brand}>
      <View style={styles.tile}>
        <Icons name={icon} icon_height={size} icon_width={size} />
      </View>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
    </View>
  );
}

export function ConnectInboxBody({ onboarding }: Props) {
  return (
    <Fragment>
      <RowView justify_content="center" gap={SIZES.padding * 0.75} style={styles.art} accessible accessibilityRole="image" accessibilityLabel="Connect Gmail to Renewless">
        <Brand icon={gmail_logo} label="Gmail" size={SIZES.padding * 1.55} />
        <Icons name={arrow_icon} icon_height={SIZES.padding * 1.05} stroke={COLORS.primary} style={styles.arrow} />
        <Brand icon={logo_mark} label="Renewless" size={SIZES.padding * 1.65} />
      </RowView>

      <SizedBox />

      <OnboardingTitle
        eyebrow="START WITH YOUR INBOX"
        title="Less typing."
        emphasis="More tracking."
        copy="Connect the Gmail account where you receive subscription receipts."
      />

      <CustomText
        mt={SIZES.padding * 1.3}
        text={
          onboarding.signed_in
            ? 'You’re already signed in. We’ll ask permission to find subscriptions in your Gmail.'
            : 'We’ll use this Google account to sign you in and ask permission to find subscriptions in your inbox.'
        }
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
        line_height={BODY_LINE}
      />
      {onboarding.connect_message ? (
        <View accessibilityRole="alert" style={styles.feedback}>
          <CustomText text={onboarding.connect_message} weight={FONTS.regular} size={SIZES.sm} line_height={BODY_LINE} />
        </View>
      ) : null}
      <View style={styles.trust}>
        {TRUST_ROWS.map(([label, value], index) => (
          <RowView align_items="stretch" justify_content="space-between" gap={SIZES.padding * 0.9} key={label} style={[styles.trust_row, index < TRUST_ROWS.length - 1 && styles.trust_divider]}>
            <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
            <CustomText text={value} weight={FONTS.regular} size={SIZES.sm} line_height={BODY_LINE} />
          </RowView>
        ))}
      </View>

      <SizedBox />

      <InfoTooltip
        label="How we use your email"
        paragraphs={[
          'Google grants read access to your mailbox. Renewless filters relevant receipts and renewal emails from the last 12 months, then uses AI to extract subscription details.',
          'You can disconnect your inbox. Your permission is required before processing.',
        ]}
      />
    </Fragment>
  );
}

export function ConnectInboxFooter({ onboarding }: Props) {
  return (
    <Fragment>
      <SizedBox height={SIZES.padding * 1.1} />

      <CustomButton
        variant="primary"
        style={styles.connect_button}
        text={onboarding.connect_loading ? 'Connecting…' : 'Connect Gmail and Login'}
        disabled={onboarding.connect_loading}
        busy={onboarding.connect_loading}
        onPress={onboarding.connectGoogle}
      />

      <SizedBox height={SIZES.padding * 0.65} />

      <CustomButton variant="link" text="Add subscriptions manually" onPress={onboarding.openManual} />

      <RowView align_items="stretch" justify_content="center" gap={SIZES.padding2} style={styles.legal}>
        {['Terms', 'Privacy'].map((label, index) => (
          <RowView gap={SIZES.padding2} key={label}>
            {index ? <CustomText text="·" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.md} /> : null}
            <Pressable accessibilityRole="link" onPress={onboarding.openLegal} style={styles.legal_link}>
              <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} decoration="underline" />
            </Pressable>
          </RowView>
        ))}
      </RowView>
    </Fragment>
  );
}
