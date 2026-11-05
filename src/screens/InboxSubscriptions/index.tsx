import { ScrollView, View } from 'react-native';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Mascot from '../../components/Mascot';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { recordCardProps } from '../../utils/events';
import useInboxSubscriptions, { type InboxSubscriptionsRoute } from './index.function';
import { styles } from './styles';

export default function InboxSubscriptionsScreen({ route }: { route: InboxSubscriptionsRoute }) {
  const imports = useInboxSubscriptions(route);

  return (
    <Container is_auth style={styles.main_view}>
      <Header title="Imported subscriptions" onBack={goBack} />
      {imports.status !== 'ready' ? (
        <StateView status={imports.status === 'failed' ? 'failed' : 'loading'} message={imports.status === 'failed' ? imports.error : 'Loading imported subscriptions.'} onRetry={imports.retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <CustomText text={imports.email} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <CustomText mt={SIZES.padding * 0.65} text={imports.count_text} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {imports.records.length ? (
            <View style={styles.rows}>
              {imports.records.map((record, index) => (
                <View key={record.id} style={index < imports.records.length - 1 && styles.divider}>
                  <SubscriptionCard {...recordCardProps(record, imports.today)} accessibility_label={`View ${record.name} imported subscription`} onPress={() => imports.openDetail(record.id)} />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.empty}>
              <View style={styles.mascot_ring} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                <Mascot expression="neutral" size={SIZES.padding * 5.05} label="Loop" />
              </View>
              <CustomText mt={SIZES.padding} text="No imported subscriptions" size={SIZES.lg} align="center" accessibility_role="header" />
              <CustomText mt={SIZES.padding / 2} text="Subscriptions imported from this inbox will appear here." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
            </View>
          )}
          <CustomText mt={SIZES.padding * 0.8} text="Manually added subscriptions aren’t included here." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </ScrollView>
      )}
    </Container>
  );
}
