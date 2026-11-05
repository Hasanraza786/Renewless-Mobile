import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import type { AppStackParamList } from '../../types';
import { eventCardProps } from '../../utils/events';
import { dateLabel } from '../../utils/scan';
import useCalendarDay from './index.function';
import { styles } from './styles';

type Props = Pick<NativeStackScreenProps<AppStackParamList, 'CalendarDay'>, 'route'>;

// A date with several events; each row opens its own Detail.
export default function CalendarDayScreen({ route }: Props) {
  const day = useCalendarDay(route.params.date);

  return (
    <Container style={styles.main_view}>
      <Header title={dateLabel(route.params.date)} onBack={goBack} />
      {day.status !== 'ready' ? (
        <StateView status={day.status === 'failed' ? 'failed' : 'loading'} message={day.status === 'failed' ? day.error : 'Loading this date.'} onRetry={day.retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <CustomText text={day.note} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {day.events.length ? (
            <View style={styles.rows}>
              {day.events.map((event, index) => (
                <View key={event.id} style={index < day.events.length - 1 && styles.divider}>
                  <SubscriptionCard {...eventCardProps(event, day.today)} onPress={() => day.openDetail(event.subscription_id)} />
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
      )}
    </Container>
  );
}
