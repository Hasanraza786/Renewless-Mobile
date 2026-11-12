import { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack, navigate } from '../../navigation/service';
import type { HomeEvent, MoneyTotal } from '../../types';
import { eventCardProps } from '../../utils/events';
import useHomeSnapshot from '../../utils/use-home-snapshot';
import { styles } from './styles';
import { money } from '../../utils/money';

const totalsText = (totals: MoneyTotal[]) => (totals.length ? totals.map(item => money(item.currency, item.amount)).join('\n') : 'None scheduled');

function Group({ title, items, today, empty }: { title: string; items: HomeEvent[]; today: string; empty: string }) {
  return (
    <Fragment>
      <CustomText
        mt={SIZES.padding * 0.9}
        size={SIZES.lg}
        accessibility_role="header"
        text={
          <>
            {`${title} `}
            <CustomText text={`· ${items.length}`} color={COLORS.text_secondary} size={SIZES.sm} />
          </>
        }
      />
      <View style={styles.list}>
        {items.length ? (
          items.map((item, index) => (
            <View key={item.id} style={index < items.length - 1 && styles.divider}>
              <SubscriptionCard {...eventCardProps(item, today, true)} onPress={() => navigate('SubscriptionDetail', { id: item.subscription_id })} />
            </View>
          ))
        ) : (
          <CustomText text={empty} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} style={styles.empty} />
        )}
      </View>
    </Fragment>
  );
}

// This month's expected and still-upcoming charges by currency; upcoming first, then earlier this month.
export default function ThisMonthScreen() {
  const { data, status, error, retry } = useHomeSnapshot();

  return (
    <Container style={styles.main_view}>
      <Header title="This month" onBack={goBack} />
      {!data ? (
        <StateView status={status === 'failed' ? 'failed' : 'loading'} message={status === 'failed' ? error : 'Loop is checking this month…'} onRetry={retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <CustomText
            text={new Date(`${data.month.month}-01T12:00:00`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            weight={FONTS.regular}
            color={COLORS.text_secondary}
            size={SIZES.sm}
          />
          <View style={styles.totals}>
            <CustomText text="Expected total" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding2} text={totalsText(data.month.expected)} size={SIZES.lg} />
            <CustomText mt={SIZES.padding * 0.7} text="Still upcoming" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding2} text={totalsText(data.month.upcoming)} size={SIZES.lg} />
          </View>
          <Group title="Upcoming" items={data.month.events.filter(item => item.date >= data.today)} today={data.today} empty="No upcoming renewals in this month." />
          <Group title="Earlier this month" items={data.month.events.filter(item => item.date < data.today)} today={data.today} empty="No earlier charges scheduled." />
          <CustomText mt={SIZES.padding2} text="Scheduled charges are estimates, not confirmed payments. Subscriptions without a renewal date are excluded." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </ScrollView>
      )}
    </Container>
  );
}
