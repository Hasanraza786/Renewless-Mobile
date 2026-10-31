import { colors } from '../../constants/theme';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { check_icon, icloud_logo, loop_happy, netflix_logo, spotify_logo } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import { OnboardingPrimary } from '../../components/OnboardingButton';
import OnboardingHeader from '../../components/OnboardingHeader';
import OnboardingTitle from '../../components/OnboardingTitle';
import type { AuthStackParamList } from '../../types';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ReadyToGo'>;

const LOGOS: Record<string, string> = {
  Netflix: netflix_logo,
  Spotify: spotify_logo,
  'iCloud+': icloud_logo,
};

export default function ReadyToGoScreen({ navigation, route }: Props) {
  const { count, monthly, next_name, next_when, next_amount } = route.params;
  const logo = next_name ? LOGOS[next_name] : undefined;

  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={5} on_back={() => navigation.goBack()} />
        <View style={styles.body}>
          <View style={styles.halo}>
            <Icons name={loop_happy} icon_height={120} />
            <View style={styles.badge}>
              <Icons name={check_icon} icon_height={18} stroke={colors.on_accent} />
            </View>
          </View>
          <OnboardingTitle
            variant="ready"
            eyebrow="A LITTLE LESS TO REMEMBER"
            title="You’re all set,"
            emphasis="Alex."
            copy="Your subscriptions are together. Your next renewal is easier to keep track of."
          />
          <View style={styles.summary}>
            <View style={styles.stat}>
              <CustomText text={String(count)} size={20} line_height={24} />
              <CustomText text={count === 1 ? 'subscription saved' : 'subscriptions saved'} weight="Raleway-Regular" color={colors.text_secondary} size={10} line_height={14} />
            </View>
            <View style={styles.split}>
              <CustomText text={`USD ${monthly}`} size={20} line_height={24} />
              <CustomText text="Estimated monthly cost" weight="Raleway-Regular" color={colors.text_secondary} size={10} line_height={14} />
            </View>
          </View>
          {next_name && logo ? (
            <View style={styles.next}>
              <View style={styles.logo}>
                <Icons name={logo} icon_height={24} />
              </View>
              <View>
                <CustomText text="NEXT ESTIMATED RENEWAL" weight="Raleway-Regular" color={colors.accent} size={8} line_height={12} style={{ letterSpacing: 0.8 }} />
                <CustomText text={next_name} size={13} line_height={18} mt={5} />
                <CustomText text={`${next_when} · USD ${next_amount}`} weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={16} mt={5} />
              </View>
            </View>
          ) : (
            <CustomText text="Add a renewal date to see what’s coming next." weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={18} align="center" mt={12} />
          )}
          <CustomText text="Set reminders and stay ahead of your next renewal." weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={18} align="center" mt={12} />
        </View>
        <View style={styles.footer}>
          <OnboardingPrimary text="Go to my dashboard →" onPress={() => undefined} disabled />
        </View>
      </View>
    </Container>
  );
}
