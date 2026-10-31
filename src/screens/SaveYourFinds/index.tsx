import { colors } from '../../constants/theme';
import { Alert, Pressable, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { apple_icon, check_icon, google_icon, logo_mark } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import { OnboardingSecondary } from '../../components/OnboardingButton';
import OnboardingHeader from '../../components/OnboardingHeader';
import OnboardingTitle from '../../components/OnboardingTitle';
import type { AuthStackParamList } from '../../types';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'SaveYourFinds'>;

function unavailable(name: string) {
  Alert.alert(`${name} isn’t available in the app yet.`);
}

export default function SaveYourFindsScreen({ navigation, route }: Props) {
  const { count, monthly, saved_total, next_name, next_when, next_amount } = route.params;
  const ready = { count, monthly: saved_total, next_name, next_when, next_amount };

  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={4} on_back={() => navigation.goBack()} />
        <View style={styles.body}>
          <View style={styles.tile}>
            <Icons name={logo_mark} icon_height={32} />
            <View style={styles.check}>
              <Icons name={check_icon} icon_height={14} stroke={colors.on_accent} />
            </View>
          </View>
          <OnboardingTitle
            variant="save"
            eyebrow="MAKE IT YOURS"
            title="Keep what"
            emphasis="you found."
            copy="Save your subscriptions and get reminded before they renew."
          />
          <View style={[styles.summary, { marginTop: 20 }]}>
            <CustomText text={`${count} ${count === 1 ? 'subscription' : 'subscriptions'} selected`} weight="Raleway-Regular" color={colors.text_secondary} size={12} line_height={16} />
            <CustomText text={`USD ${monthly}`} size={21} line_height={26} />
            <CustomText text="estimated/month" weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={15} />
          </View>
          <CustomText text="Free to save. No payment required." weight="Raleway-Regular" size={11} line_height={16} mt={16} />
          <CustomText text="Create an account or sign in to keep your subscriptions." weight="Raleway-Regular" color={colors.text_secondary} size={10} line_height={14} mt={10} />
        </View>
        <View style={styles.account}>
          <OnboardingSecondary text="Continue with Google" icon={google_icon} onPress={() => navigation.navigate('ReadyToGo', ready)} />
          <OnboardingSecondary text="Continue with Apple" icon={apple_icon} onPress={() => navigation.navigate('ReadyToGo', ready)} />
          <Pressable accessibilityRole="link" onPress={() => navigation.navigate('Signup')} style={styles.email}>
            <CustomText text="Continue with email" weight="Raleway-Regular" size={12} line_height={16} align="center" />
          </Pressable>
          <View style={styles.legal}>
            <CustomText text="Terms" weight="Raleway-Regular" color={colors.text_secondary} size={10} line_height={14} decoration="underline" onPress={() => unavailable('Terms')} />
            <CustomText text="·" weight="Raleway-Regular" color={colors.text_secondary} size={10} line_height={14} />
            <CustomText text="Privacy" weight="Raleway-Regular" color={colors.text_secondary} size={10} line_height={14} decoration="underline" onPress={() => unavailable('Privacy')} />
          </View>
        </View>
      </View>
    </Container>
  );
}
