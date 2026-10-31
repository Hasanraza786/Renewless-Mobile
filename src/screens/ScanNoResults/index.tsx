import { Pressable, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { hint_icon, inbox_badge_icon, loop_sad } from '../../assets/icons';
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

type Props = NativeStackScreenProps<AuthStackParamList, 'ScanNoResults'>;

export default function ScanNoResultsScreen({ navigation }: Props) {
  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={3} on_back={() => navigation.navigate('ConnectInbox')} />
        <View style={styles.art}>
          <Icons name={loop_sad} icon_height={150} />
          <View style={styles.badge}>
            <Icons name={inbox_badge_icon} icon_height={16} stroke={colors.text} />
          </View>
        </View>
        <OnboardingTitle
          variant="empty"
          eyebrow="YOUR INBOX, CHECKED"
          title="No subscriptions"
          emphasis="found this time."
          copy="We didn’t find subscription receipts in this inbox from the last 12 months."
        />
        <RowView align_items="flex-start" gap={SIZES.padding2} style={styles.hint}>
          <Icons name={hint_icon} icon_height={20} stroke={colors.accent} />
          <View style={{ flex: 1 }}>
            <CustomText text="Using another email for payments?" size={SIZES.body} line_height={SIZES.body_line} />
            <CustomText
              text="Your receipts may be in a different inbox. Try the Gmail account you use for subscriptions."
              weight={FONTS.regular}
              color={colors.text_secondary}
              size={SIZES.supporting}
              line_height={SIZES.supporting_line}
              mt={SIZES.padding3 / 2}
            />
          </View>
        </RowView>
        <CustomText
          text="You can still track any subscription by adding it yourself."
          weight={FONTS.regular}
          color={colors.text_secondary}
          size={SIZES.supporting}
          line_height={SIZES.supporting_line}
        />
        <View style={styles.footer}>
          <CustomButton text="Try another Gmail account" onPress={() => navigation.navigate('ConnectInbox')} />
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Signup')} style={styles.secondary}>
            <CustomText text="Add a subscription manually" size={SIZES.button} line_height={SIZES.button_line} />
          </Pressable>
        </View>
      </View>
    </Container>
  );
}
