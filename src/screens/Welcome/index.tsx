import { colors } from '../../constants/theme';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { find_icon, loop_mascot, netflix_logo, remember_icon, track_icon } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import { OnboardingLink, OnboardingPrimary } from '../../components/OnboardingButton';
import OnboardingHeader from '../../components/OnboardingHeader';
import OnboardingTitle from '../../components/OnboardingTitle';
import type { AuthStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const BENEFITS = [
  { icon: find_icon, label: 'Find' },
  { icon: track_icon, label: 'Track' },
  { icon: remember_icon, label: 'Remember' },
];

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={1} />
        <ScrollView showsVerticalScrollIndicator={false} style={common_styles.flex_1}>
          <View style={styles.scene} accessibilityLabel="An email receipt becomes an organized subscription">
            <View style={styles.orbit} />
            <View style={styles.receipt}>
              <CustomText text="✉   YOUR INBOX" weight="Raleway-Regular" color={colors.text_secondary} size={8} line_height={12} style={{ letterSpacing: 1 }} />
              <CustomText text="Your monthly receipt" size={12} line_height={16} mt={12} mb={12} />
              <View style={styles.line} />
              <View style={[styles.line, styles.line_short]} />
              <CustomText text="$15.99" weight="Raleway-Regular" size={21} line_height={26} />
            </View>
            <View style={styles.found}>
              <View style={styles.logo}>
                <Icons name={netflix_logo} icon_height={24} />
              </View>
              <View style={common_styles.flex_1}>
                <CustomText text="Netflix" size={13} line_height={16} />
                <CustomText text="Monthly · renews Oct 27" weight="Raleway-Regular" color={colors.text_secondary} size={9} line_height={12} mt={6} />
              </View>
              <CustomText text="$15.99" weight="Raleway-Regular" size={14} line_height={18} />
            </View>
            <View style={styles.pill}>
              <CustomText text="✓   Renewal found" weight="Raleway-Regular" color={colors.accent} size={10} line_height={14} />
            </View>
            <View style={styles.loop}>
              <Icons name={loop_mascot} icon_height={58} />
            </View>
          </View>
          <OnboardingTitle
            eyebrow="LESS GUESSWORK. MORE CONTROL."
            title="Know what renews."
            emphasis="Before it does."
            copy="Find subscriptions in your Gmail, understand their cost, and stay ahead of renewals."
          />
          <View style={styles.benefits}>
            {BENEFITS.map(item => (
              <View key={item.label} style={styles.benefit}>
                <Icons name={item.icon} icon_height={22} stroke={colors.accent} />
                <CustomText text={item.label} weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={22} />
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <OnboardingPrimary text="Find my subscriptions →" onPress={() => navigation.navigate('ConnectInbox')} />
          <OnboardingLink text="Already have an account? Log in" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    </Container>
  );
}
