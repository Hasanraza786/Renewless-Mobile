import { colors } from '../../constants/theme';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { arrow_icon, gmail_logo, logo_mark } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import InfoTooltip from '../../components/InfoTooltip';
import { OnboardingLink, OnboardingPrimary } from '../../components/OnboardingButton';
import OnboardingHeader from '../../components/OnboardingHeader';
import OnboardingTitle from '../../components/OnboardingTitle';
import type { AuthStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ConnectInbox'>;

const FACTS = [
  ['Read-only access', 'No sending or deleting'],
  ['You stay in control', 'Review before saving'],
  ['First scan', 'Free · one Gmail inbox'],
];

export default function ConnectInboxScreen({ navigation }: Props) {
  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={2} on_back={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false} style={common_styles.flex_1}>
          <View style={styles.art} accessibilityLabel="Connect Gmail to Renewless">
            <View style={styles.brand}>
              <View style={styles.tile}>
                <Icons name={gmail_logo} icon_height={33} />
              </View>
              <CustomText text="Gmail" weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={16} />
            </View>
            <Icons name={arrow_icon} icon_height={24} stroke={colors.accent} />
            <View style={styles.brand}>
              <View style={styles.tile}>
                <Icons name={logo_mark} icon_height={33} />
              </View>
              <CustomText text="Renewless" weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={16} />
            </View>
          </View>
          <OnboardingTitle
            variant="connect"
            eyebrow="LET YOUR INBOX DO THE WORK"
            title="Less typing."
            emphasis="More discovering."
            copy="Find recurring receipts and renewal emails from the last 12 months."
          />
          <View style={styles.trust}>
            {FACTS.map(([title, detail], index) => (
              <View key={title} style={[styles.row, index === FACTS.length - 1 && styles.row_last]}>
                <CustomText text={title} weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={16} />
                <CustomText text={detail} weight="Raleway-Regular" size={11} line_height={16} />
              </View>
            ))}
          </View>
          <InfoTooltip
            label="How your email is processed"
            paragraphs={[
              'Google grants read access to your mailbox. Renewless filters relevant receipts and renewal emails, then uses AI to extract subscription details.',
              'You can disconnect your inbox. Your permission is required before processing.',
            ]}
          />
        </ScrollView>
        <View style={styles.footer}>
          <OnboardingPrimary text="Connect Gmail & scan" onPress={() => navigation.navigate('InboxPermission')} />
          <OnboardingLink text="I’ll add subscriptions manually" onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
    </Container>
  );
}
