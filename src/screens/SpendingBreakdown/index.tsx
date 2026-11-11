import { ScrollView } from 'react-native';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import { SpendRows, TrialRows } from '../../components/SpendRows';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack, navigate } from '../../navigation/service';
import useHomeSnapshot from '../../utils/use-home-snapshot';
import { styles } from './styles';

// Every paid platform by monthly-equivalent spend within each currency; free trials stay separate.
export default function SpendingBreakdownScreen() {
  const { data, status, error, retry } = useHomeSnapshot();

  return (
    <Container style={styles.main_view}>
      <Header title="Spending breakdown" onBack={goBack} />
      {!data ? (
        <StateView status={status === 'failed' ? 'failed' : 'loading'} message={status === 'failed' ? error : 'Loop is adding up your spending…'} onRetry={retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <CustomText text="Platforms ranked by estimated monthly spend. Quarterly and yearly plans are averaged per month; currencies stay separate." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <SpendRows spending={data.spending} all onPlatform={(platform_id, name) => navigate('PlatformSubscriptions', { platform_id, name })} />
          <TrialRows trials={data.trials} onPress={id => navigate('SubscriptionDetail', { id })} />
        </ScrollView>
      )}
    </Container>
  );
}
