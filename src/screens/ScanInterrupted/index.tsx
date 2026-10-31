import { Pressable, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loop_sad, offline_badge_icon, retry_icon } from '../../assets/icons';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import OnboardingHeader from '../../components/OnboardingHeader';
import OnboardingTitle from '../../components/OnboardingTitle';
import RowView from '../../components/RowView';
import { FONTS, SIZES, colors } from '../../constants/theme';
import type { AuthStackParamList } from '../../types';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ScanInterrupted'>;

export default function ScanInterruptedScreen({ navigation }: Props) {
  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={3} on_back={() => navigation.navigate('ConnectInbox')} />
        <View style={styles.art}>
          <Icons name={loop_sad} icon_height={150} />
          <View style={styles.badge}>
            <Icons name={offline_badge_icon} icon_height={16} stroke={colors.text} />
          </View>
        </View>
        <OnboardingTitle
          variant="empty"
          eyebrow="LET’S GET BACK ON TRACK"
          title="Your scan"
          emphasis="was interrupted."
          copy="We couldn’t finish checking your inbox. Reconnect and try again."
        />
        <RowView align_items="flex-start" gap={SIZES.padding2} style={styles.hint}>
          <Icons name={retry_icon} icon_height={20} stroke={colors.accent} />
          <View style={{ flex: 1 }}>
            <CustomText text="A quick check before retrying" size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.body_line} />
            <CustomText
              text="Check your internet connection. If Google asks, allow read-only Gmail access so we can complete your scan."
              weight={FONTS.regular}
              color={colors.text_secondary}
              size={(SIZES.padding2 + SIZES.padding3 / 8)}
              line_height={SIZES.supporting_line}
              mt={SIZES.padding3 / 2}
            />
          </View>
        </RowView>
        <CustomText
          text="You can also add subscriptions yourself and connect your inbox later."
          weight={FONTS.regular}
          color={colors.text_secondary}
          size={(SIZES.padding2 + SIZES.padding3 / 8)}
          line_height={SIZES.supporting_line}
        />
        <View style={styles.footer}>
          <CustomButton text="Reconnect & try again" onPress={() => navigation.navigate('ConnectInbox')} />
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Signup')} style={styles.secondary}>
            <CustomText text="Add a subscription manually" size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.button_line} />
          </Pressable>
        </View>
      </View>
    </Container>
  );
}
