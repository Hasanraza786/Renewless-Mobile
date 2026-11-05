import { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack, navigate } from '../../navigation/service';
import type { HomeEvent } from '../../types';
import { eventCardProps } from '../../utils/events';
import { dateLabel } from '../../utils/scan';
import useHomeSnapshot from '../../utils/use-home-snapshot';
import { styles } from './styles';

// Each dated subscription's next renewal or trial end, grouped by date, through the labelled end date.
export default function UpcomingScreen() {
  const { data, status, error, retry } = useHomeSnapshot();
  const groups = new Map<string, HomeEvent[]>();
  for (const item of data?.upcoming ?? []) groups.set(item.date, [...(groups.get(item.date) ?? []), item]);

  return (
    <Container style={styles.main_view}>
      <Header title="Upcoming" onBack={goBack} />
      {!data ? (
        <StateView status={status === 'failed' ? 'failed' : 'loading'} message={status === 'failed' ? error : 'Loading upcoming renewals.'} onRetry={retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <CustomText text={`Next renewal or trial end for each subscription · through ${dateLabel(data.upcoming_until)}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <CustomText mt={SIZES.padding2} text={`${data.upcoming.length} subscription${data.upcoming.length === 1 ? '' : 's'}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {data.upcoming.length ? (
            [...groups].map(([date, items]) => (
              <Fragment key={date}>
                <CustomText mt={SIZES.padding * 0.8} text={dateLabel(date)} size={SIZES.lg} accessibility_role="header" />
                <View style={styles.group}>
                  {items.map((item, index) => (
                    <View key={item.id} style={index < items.length - 1 && styles.divider}>
                      <SubscriptionCard {...eventCardProps(item, data.today, true)} chevron onPress={() => navigate('SubscriptionDetail', { id: item.subscription_id })} />
                    </View>
                  ))}
                </View>
              </Fragment>
            ))
          ) : (
            <CustomText mt={SIZES.padding} text={`No renewals or trials ending through ${dateLabel(data.upcoming_until)}.`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          )}
        </ScrollView>
      )}
    </Container>
  );
}
