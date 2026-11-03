import { Pressable, View } from 'react-native';
import { arrow_icon, gmail_logo, logo_mark } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import InfoTooltip from '../../../../components/InfoTooltip';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { styles } from './styles';

type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;
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
    <>
      <View style={styles.art} accessible accessibilityRole="image" accessibilityLabel="Connect Gmail to Renewless">
        <Brand icon={gmail_logo} label="Gmail" size={SIZES.padding * 2 - SIZES.padding3 - SIZES.padding3 / 8} />
        <Icons name={arrow_icon} icon_height={SIZES.padding + SIZES.padding3 / 8} stroke={COLORS.primary} style={styles.arrow} />
        <Brand icon={logo_mark} label="Renewless" size={SIZES.padding * 2 - SIZES.padding3 + SIZES.padding3 / 8} />
      </View>
      <View style={styles.intro}>
        <OnboardingTitle
          eyebrow="START WITH YOUR INBOX"
          title="Less typing."
          emphasis="More tracking."
          copy="Connect the Gmail account where you receive subscription receipts."
        />
      </View>
      <CustomText
        text={
          onboarding.signed_in
            ? 'You’re already signed in. We’ll ask permission to find subscriptions in your Gmail.'
            : 'We’ll use this Google account to sign you in and ask permission to find subscriptions in your inbox.'
        }
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
        line_height={BODY_LINE}
        style={styles.disclosure}
      />
      {onboarding.connect_message ? (
        <View accessibilityRole="alert" style={styles.feedback}>
          <CustomText text={onboarding.connect_message} weight={FONTS.regular} size={SIZES.sm} line_height={BODY_LINE} />
        </View>
      ) : null}
      <View style={styles.trust}>
        {TRUST_ROWS.map(([label, value], index) => (
          <View key={label} style={[styles.trust_row, index < TRUST_ROWS.length - 1 && styles.trust_divider]}>
            <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
            <CustomText text={value} weight={FONTS.regular} size={SIZES.sm} line_height={BODY_LINE} />
          </View>
        ))}
      </View>
      <View style={styles.info}>
        <InfoTooltip
          label="How we use your email"
          paragraphs={[
            'Google grants read access to your mailbox. Renewless filters relevant receipts and renewal emails from the last 12 months, then uses AI to extract subscription details.',
            'You can disconnect your inbox. Your permission is required before processing.',
          ]}
        />
      </View>
    </>
  );
}

export function ConnectInboxFooter({ onboarding }: Props) {
  return (
    <>
      <View style={styles.primary}>
        <CustomButton
          variant="primary"
          style={styles.connect_button}
          text={onboarding.connect_loading ? 'Connecting…' : 'Connect Gmail and Login'}
          disabled={onboarding.connect_loading}
          busy={onboarding.connect_loading}
          onPress={onboarding.connectGoogle}
        />
      </View>
      <View style={styles.link}>
        <CustomButton variant="link" text="Add subscriptions manually" onPress={onboarding.openManual} />
      </View>
      <View style={styles.legal}>
        {['Terms', 'Privacy'].map((label, index) => (
          <View key={label} style={styles.legal_item}>
            {index ? <CustomText text="·" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.md} /> : null}
            <Pressable accessibilityRole="link" onPress={onboarding.openLegal} style={styles.legal_link}>
              <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={BODY_LINE} decoration="underline" />
            </Pressable>
          </View>
        ))}
      </View>
    </>
  );
}
