import { ScrollView } from 'react-native';
import Container from '../../components/Container';
import CurrencyTabs from '../../components/CurrencyTabs';
import SizedBox from '../../components/SizedBox';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import { SpendRows, TrialRows } from '../../components/SpendRows';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack, navigate } from '../../navigation/service';
import useHomeSnapshot from '../../utils/use-home-snapshot';
import { useCurrencySwitch } from '../../utils/currency-switch';
import { styles } from './styles';

// Every paid platform by monthly-equivalent spend within each currency; free trials stay separate.
export default function SpendingBreakdownScreen() {
  const { data, status, error, retry } = useHomeSnapshot();
  // Several currencies: only the selected currency's ranking and trials.
  const currency = useCurrencySwitch(data ? [...data.spending, ...data.trials].map(item => item.currency) : []);

  return (
    <Container style={styles.main_view}>
      <Header title="Spending breakdown" onBack={goBack} />
      {!data ? (
        <StateView status={status === 'failed' ? 'failed' : 'loading'} message={status === 'failed' ? error : 'Loop is adding up your spending…'} onRetry={retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <CustomText text="Platforms ranked by estimated monthly spend. Quarterly and yearly plans are averaged per month; currencies stay separate." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {currency.several ? (
            <>
              <SizedBox height={SIZES.padding2} />
              <CurrencyTabs currencies={currency.currencies} selected={currency.selected} onSelect={currency.selectCurrency} />
            </>
          ) : null}
          <SpendRows spending={currency.only(data.spending)} all onPlatform={(platform_id, name) => navigate('PlatformSubscriptions', { platform_id, name })} />
          <TrialRows trials={currency.only(data.trials)} onPress={id => navigate('SubscriptionDetail', { id })} />
        </ScrollView>
      )}
    </Container>
  );
}
