import { useCallback } from 'react';
import {
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { notification_icon, profile_icon } from '../../assets/icons';
import Icons from '../../components/Icons';
import RowView from '../../components/RowView';
import Container from '../../components/Container';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES, colors } from '../../constants/theme';
import { loadDashboard } from '../../redux/actions/dashboard-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, TabParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { formatMoney } from '../../utils/money';
import { styles } from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Dashboard'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function DashboardScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.dashboard.data);
  const loading = useAppSelector(state => state.dashboard.loading);
  const error = useAppSelector(state => state.dashboard.error);
  const status = loading ? 'loading' : error ? 'failed' : data ? 'ready' : 'loading';

  const load = useCallback(() => {
    dispatch(loadDashboard());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const month =
    data && data.thisMonth.length
      ? data.thisMonth.map(item => formatMoney(item.amount, item.currency)).join(' + ')
      : formatMoney(0, 'USD');

  return (
    <Container>
      <View style={styles.main_view}>
      <RowView gap={0} style={{ marginBottom: SIZES.padding3 * 2 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile"
          hitSlop={SIZES.padding3}
          onPress={() => navigation.navigate('Profile')}
          style={styles.icon_button}>
          <Icons name={profile_icon} icon_height={SIZES.padding * 1.1} stroke={colors.accent} />
        </Pressable>
        <CustomText text="Dashboard" size={(SIZES.padding + SIZES.padding3 / 4)} line_height={SIZES.screen_heading_line} align="center" style={common_styles.flex_1} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={SIZES.padding3}
          onPress={() => navigation.navigate('Notifications')}
          style={styles.icon_button}>
          <Icons name={notification_icon} icon_height={SIZES.padding * 1.1} stroke={colors.accent} />
        </Pressable>
      </RowView>
      {status === 'loading' ? <StateView status="loading" message="Loading your counts." /> : null}
      {status === 'failed' ? (
        <StateView status="failed" message={error} onRetry={load} />
      ) : null}
      {status === 'ready' && data ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <RowView align_items="stretch" gap={SIZES.padding2} style={{ flexWrap: 'wrap', marginBottom: SIZES.padding3 }}>
            <Count label="Active subscriptions" value={String(data.active)} />
            <Count label="Renewing in the next 7 days" value={String(data.renewingSoon)} />
            <Count label="This month's total" value={month} />
            <Count label="Expired" value={String(data.expired)} />
          </RowView>
          <CustomText text="Next renewals" size={(SIZES.padding - SIZES.padding2 / 4)} line_height={SIZES.section_line} mt={SIZES.padding3} mb={SIZES.padding2} />
          {data.upcoming.length === 0 ? (
            <StateView status="empty" message="No upcoming renewals yet." />
          ) : (
            data.upcoming.map(item => (
              <SubscriptionCard
                key={item.id}
                item={item}
                onPress={() => navigation.navigate('SubscriptionDetail', { id: item.id })}
              />
            ))
          )}
        </ScrollView>
      ) : null}
      </View>
    </Container>
  );
}

function Count({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.count}>
      <CustomText text={value} size={(SIZES.padding + SIZES.padding3 / 4)} line_height={SIZES.screen_heading_line} />
      <CustomText
        text={label}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={(SIZES.padding2 + SIZES.padding3 / 8)}
        line_height={SIZES.supporting_line}
        mt={SIZES.padding2 / 2}
      />
    </View>
  );
}
