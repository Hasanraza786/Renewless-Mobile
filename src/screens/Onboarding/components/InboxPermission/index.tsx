import { View } from 'react-native';
import { google_icon } from '../../../../assets/icons';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import { FONTS, SIZES, colors } from '../../../../constants/theme';
import type { OnboardingController } from '../../index.function';
import { styles } from './styles';

type Props = { onboarding: OnboardingController };

const BODY_LINE = SIZES.padding - SIZES.padding3 / 4;

export function InboxPermissionBody({ onboarding }: Props) {
  return (
    <>
      <View style={styles.symbol}>
        <Icons name={google_icon} icon_height={SIZES.padding * 3 + SIZES.padding3 / 2} icon_width={SIZES.padding * 3 + SIZES.padding3 / 2} />
      </View>
      <OnboardingTitle
        eyebrow="CONNECT YOUR INBOX"
        title="Your inbox."
        emphasis="Your permission."
        copy="Choose your Google account and allow read-only access to find your subscriptions."
      />
      <View style={styles.panel}>
        <CustomText text={onboarding.google_email} size={SIZES.sm} line_height={BODY_LINE} />
        <CustomText
          text="Read-only Gmail access to find receipts and renewals. AI extraction is used for relevant messages."
          weight={FONTS.regular}
          color={colors.text_secondary}
          size={SIZES.sm}
          line_height={BODY_LINE}
          mt={SIZES.padding2}
        />
      </View>
    </>
  );
}

export function InboxPermissionFooter({ onboarding }: Props) {
  return (
    <>
      <View style={styles.primary}>
        <CustomButton variant="primary" text="Continue with Google →" onPress={onboarding.startScan} />
      </View>
      <View style={styles.secondary}>
        <CustomButton variant="secondary" text="Not now" onPress={() => onboarding.goTo('connectInbox', -1)} />
      </View>
    </>
  );
}
