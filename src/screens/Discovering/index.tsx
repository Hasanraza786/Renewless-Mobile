import { colors } from '../../constants/theme';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loop_mascot } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import { OnboardingPrimary } from '../../components/OnboardingButton';
import OnboardingHeader from '../../components/OnboardingHeader';
import OnboardingTitle from '../../components/OnboardingTitle';
import type { AuthStackParamList } from '../../types';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Discovering'>;

const STAGES = ['Finding receipts', 'Grouping subscriptions', 'Checking renewal details'];

export default function DiscoveringScreen({ navigation }: Props) {
  const [done_count, setDoneCount] = useState(0);

  useEffect(() => {
    if (done_count >= STAGES.length) return;
    const timer = setTimeout(() => setDoneCount(count => count + 1), 1100);
    return () => clearTimeout(timer);
  }, [done_count]);

  const finished = done_count >= STAGES.length;

  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={3} on_back={() => navigation.navigate('ConnectInbox')} />
        <View style={styles.radar}>
          <View style={[styles.ring, finished && { borderColor: colors.accent }]} />
          <Icons name={loop_mascot} icon_height={75} />
        </View>
        <OnboardingTitle
          eyebrow="A LITTLE CLARITY IS ON ITS WAY"
          title="Connecting the dots."
          copy="Turning your receipts into a clearer picture of your subscriptions."
        />
        {STAGES.map((label, index) => {
          const done = index < done_count;
          return (
            <View key={label} style={styles.stage}>
              <View style={styles.badge}>
                <CustomText text={done ? '✓' : `0${index + 1}`} weight="Raleway-Regular" color={done ? colors.accent : colors.text_secondary} size={10} line_height={14} />
              </View>
              <CustomText text={label} weight="Raleway-Regular" color={done ? colors.accent : colors.text_secondary} size={12} line_height={16} />
            </View>
          );
        })}
        <View style={styles.footer}>
          <OnboardingPrimary text="Review my subscriptions →" disabled={!finished} onPress={() => navigation.navigate('YourSubscriptions')} />
        </View>
      </View>
    </Container>
  );
}
