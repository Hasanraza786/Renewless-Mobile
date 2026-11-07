import { ScrollView, View } from 'react-native';
import AddSheet from '../../components/AddSheet';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Mascot from '../../components/Mascot';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import AddWidget from './components/AddWidget';
import Forecast from './components/Forecast';
import HomeSkeleton from './components/HomeSkeleton';
import MonthCard from './components/MonthCard';
import NextEvent from './components/NextEvent';
import TopSpending from './components/TopSpending';
import useHome from './index.function';
import { styles } from './styles';

export default function HomeScreen() {
  const home = useHome();
  const { data, status } = home;

  return (
    <Container tab_bar style={styles.main_view}>
      <Header title="Home" onAdd={home.openAdd} />
      {status === 'loading' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} scrollEnabled={false}>
          <HomeSkeleton reduce_motion={home.reduce_motion} />
        </ScrollView>
      ) : status === 'failed' ? (
        <View style={styles.failed}>
          <Mascot expression="sad" size={SIZES.padding * 5.75} label="Loop" draw={!home.reduce_motion} />
          <CustomText text={home.error} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
          <CustomButton variant="primary" text="Try again" onPress={home.retry} style={styles.empty_primary} />
        </View>
      ) : data && !data.has_subscriptions ? (
        <View style={styles.empty}>
          <Mascot expression="neutral" size={SIZES.padding * 5.75} label="Loop" draw={!home.reduce_motion} />
          <CustomText mt={SIZES.padding * 0.9} text="Your subscriptions, in one place" size={SIZES.lg} align="center" />
          <CustomText mt={SIZES.padding2} text="Add your first subscription to see what renews next." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
          <CustomButton variant="primary" text="Add manually" onPress={home.openAddManual} style={styles.empty_primary} />
          <CustomButton variant="secondary" text="Connect Gmail" onPress={home.openConnectGmail} style={styles.empty_secondary} />
        </View>
      ) : (
        // scrollableAxes: iOS adds the floating tab bar inset at the bottom without a second top inset under the fixed header.
        <ScrollView showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="scrollableAxes"
          contentContainerStyle={styles.content}>
          <NextEvent home={home} />
          <MonthCard home={home} />
          <TopSpending home={home} />
          <Forecast home={home} />
        </ScrollView>
      )}
      <AddSheet visible={home.add_open} onClose={home.closeAdd} />
      <AddWidget home={home} />
    </Container>
  );
}
