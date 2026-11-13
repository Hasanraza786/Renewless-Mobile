import { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import { clock_accent_icon } from '../../assets/icons';
import AddChoiceLinks from '../../components/AddChoiceLinks';
import AddOptions from '../../components/AddOptions';
import AddSheet from '../../components/AddSheet';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import Mascot from '../../components/Mascot';
import RowView from '../../components/RowView';
import SizedBox from '../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import AddWidget from './components/AddWidget';
import Forecast from './components/Forecast';
import HomeSkeleton from './components/HomeSkeleton';
import MonthCard from './components/MonthCard';
import NextEvent from './components/NextEvent';
import TopSpending from './components/TopSpending';
import { ConnectArt, TrustRows } from '../Onboarding/components/ConnectInbox';
import useHome, { type HomeRoute } from './index.function';
import { styles } from './styles';

export default function HomeScreen({ route }: { route: HomeRoute }) {
  const home = useHome(route);
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
        // Gmail hero (locked 13 Nov 2026): Connect Gmail leads in the onboarding style, then Add with AI · Add manually.
        // When the connected inbox can't sync yet there is no Connect Gmail: the sync date and the three add options.
        <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="scrollableAxes" contentContainerStyle={styles.empty}>
          <ConnectArt />
          {home.locked_inbox ? (
            <Fragment>
              <RowView gap={SIZES.padding / 4} style={styles.sync_pill}>
                <Icons name={clock_accent_icon} />
                <CustomText text={`Next sync · ${home.next_sync}`} weight={FONTS.regular} color={COLORS.primary} size={SIZES.xs} />
              </RowView>
              <CustomText mt={SIZES.padding * 0.6} text="Your inbox was checked recently" size={SIZES.h4} align="center" />
              <CustomText
                mt={SIZES.padding2}
                text={`${home.locked_inbox.email} syncs once a week. Until then, you can still add subscriptions:`}
                weight={FONTS.regular}
                color={COLORS.text_secondary}
                size={SIZES.sm}
                align="center"
              />
              <SizedBox />
              <AddOptions gmail={home.can_add_inbox ? { title: 'Connect another Gmail', copy: 'Find subscriptions in a second inbox', open: home.connectAnother } : null} />
            </Fragment>
          ) : (
            <Fragment>
              <CustomText mt={SIZES.padding} text="Let Loop find your subscriptions" size={SIZES.h4} align="center" />
              <CustomText
                mt={SIZES.padding2}
                text="Connect Gmail and Loop lists what you pay for from your receipts. It takes about a minute."
                weight={FONTS.regular}
                color={COLORS.text_secondary}
                size={SIZES.sm}
                align="center"
              />
              <TrustRows />
              <CustomButton variant="primary" text="Connect Gmail" onPress={home.openConnectGmail} style={styles.empty_primary} />
              <SizedBox height={SIZES.padding * 0.6} />
              <AddChoiceLinks onAi={home.openAddAi} onManual={home.openAddManual} />
            </Fragment>
          )}
        </ScrollView>
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
