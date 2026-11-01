import { View } from 'react-native';
import { arrow_icon, gmail_logo, logo_mark } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import InfoTooltip from '../../../../components/InfoTooltip';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { FONTS, SIZES, colors } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { styles } from './styles';

type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;
const TRUST_ROWS = [
  ['Read-only access', 'No sending or deleting'],
  ['You stay in control', 'Review before saving'],
  ['Gmail scans & updates', 'Included at no cost'],
];

function Brand({ icon, label, size }: { icon: string; label: string; size: number }) {
  return (
    <View style={styles.brand}>
      <View style={styles.tile}>
        <Icons name={icon} icon_height={size} icon_width={size} />
      </View>
      <CustomText text={label} weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
    </View>
  );
}

export function ConnectInboxBody(_: Props) {
  return (
    <>
      <View style={styles.art} accessible accessibilityRole="image" accessibilityLabel="Connect Gmail to Renewless">
        <Brand icon={gmail_logo} label="Gmail" size={SIZES.padding * 2 - SIZES.padding3 - SIZES.padding3 / 8} />
        <Icons name={arrow_icon} icon_height={SIZES.padding + SIZES.padding3 / 8} stroke={colors.accent} style={styles.arrow} />
        <Brand icon={logo_mark} label="Renewless" size={SIZES.padding * 2 - SIZES.padding3 + SIZES.padding3 / 8} />
      </View>
      <View style={styles.intro}>
        <OnboardingTitle
          eyebrow="LET YOUR INBOX DO THE WORK"
          title="Less typing."
          emphasis="More discovering."
          copy="Find recurring receipts and renewal emails from the last 12 months."
        />
      </View>
      <View style={styles.trust}>
        {TRUST_ROWS.map(([label, value], index) => (
          <View key={label} style={[styles.trust_row, index < TRUST_ROWS.length - 1 && styles.trust_divider]}>
            <CustomText text={label} weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={BODY_LINE} />
            <CustomText text={value} weight={FONTS.regular} size={SIZES.sm} line_height={BODY_LINE} />
          </View>
        ))}
      </View>
      <View style={styles.info}>
        <InfoTooltip
          label="How your email is processed"
          paragraphs={[
            'Google grants read access to your mailbox. Renewless filters relevant receipts and renewal emails, then uses AI to extract subscription details.',
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
        <CustomButton variant="primary" text="Connect Gmail & scan" onPress={() => onboarding.goTo('inboxPermission')} />
      </View>
      <View style={styles.link}>
        <CustomButton variant="link" text="I’ll add subscriptions manually" onPress={onboarding.openSignup} />
      </View>
    </>
  );
}
