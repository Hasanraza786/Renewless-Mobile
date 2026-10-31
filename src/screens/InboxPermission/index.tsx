import { colors } from '../../constants/theme';
import { Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { google_icon } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import { OnboardingPrimary } from '../../components/OnboardingButton';
import OnboardingHeader from '../../components/OnboardingHeader';
import OnboardingTitle from '../../components/OnboardingTitle';
import type { AuthStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'InboxPermission'>;

export default function InboxPermissionScreen({ navigation }: Props) {
  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={2} on_back={() => navigation.navigate('ConnectInbox')} />
        <ScrollView showsVerticalScrollIndicator={false} style={common_styles.flex_1}>
          <View style={styles.symbol}>
            <Icons name={google_icon} icon_height={64} />
          </View>
          <OnboardingTitle
            eyebrow="CONNECT YOUR INBOX"
            title="Your inbox."
            emphasis="Your permission."
            copy="Choose your Google account and allow read-only access to find your subscriptions."
          />
          <View style={styles.panel}>
            <CustomText text="alex@example.com" size={14} line_height={20} />
            <CustomText
              text="Read-only Gmail access to find receipts and renewals. AI extraction is used for relevant messages."
              weight="Raleway-Regular"
              color={colors.text_secondary}
              size={13}
              line_height={20}
              mt={8}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <OnboardingPrimary text="Continue with Google →" onPress={() => navigation.navigate('Discovering')} />
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('ConnectInbox')} style={styles.secondary}>
            <CustomText text="Not now" size={14} line_height={20} />
          </Pressable>
        </View>
      </View>
    </Container>
  );
}
