import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack, navigate } from '../../navigation/service';
import type { AppStackParamList } from '../../types';
import { recordCardProps } from '../../utils/events';
import usePlatformSubscriptions from './index.function';
import { styles } from './styles';

type Props = Pick<NativeStackScreenProps<AppStackParamList, 'PlatformSubscriptions'>, 'route'>;

export default function PlatformSubscriptionsScreen({ route }: Props) {
  const screen = usePlatformSubscriptions(route);

  return (
    <Container style={styles.main_view}>
      <Header title={screen.title} onBack={goBack} />
      {screen.status !== 'ready' ? (
        <StateView status={screen.status === 'failed' ? 'failed' : 'loading'} message={screen.status === 'failed' ? screen.error : 'Loading subscriptions.'} onRetry={screen.retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <CustomText text={screen.summary} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {screen.records.length ? (
            <View style={styles.list}>
              {screen.records.map((record, index) => (
                <View key={record.id} style={index < screen.records.length - 1 && styles.divider}>
                  <SubscriptionCard {...recordCardProps(record, screen.today)} onPress={() => navigate('SubscriptionDetail', { id: record.id })} />
                </View>
              ))}
            </View>
          ) : (
            <CustomText mt={SIZES.padding2} text="No other subscriptions on this platform." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          )}
        </ScrollView>
      )}
    </Container>
  );
}
