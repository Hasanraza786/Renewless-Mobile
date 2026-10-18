import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { colors } from '../../constants/colors';
import { loadDashboard } from '../../redux/actions/dashboard';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, TabParamList } from '../../types';
import { formatMoney } from '../../utils/money';

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
    <Screen>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile"
          hitSlop={8}
          onPress={() => navigation.navigate('Profile')}
          style={styles.iconButton}>
          <ProfileIcon />
        </Pressable>
        <Text style={styles.title}>Dashboard</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={8}
          onPress={() => navigation.navigate('Notifications')}
          style={styles.iconButton}>
          <NotificationIcon />
        </Pressable>
      </View>
      {status === 'loading' ? <StateView status="loading" message="Loading your counts." /> : null}
      {status === 'failed' ? (
        <StateView status="failed" message={error} onRetry={load} />
      ) : null}
      {status === 'ready' && data ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            <Count label="Active subscriptions" value={String(data.active)} />
            <Count label="Renewing in the next 7 days" value={String(data.renewingSoon)} />
            <Count label="This month's total" value={month} />
            <Count label="Expired" value={String(data.expired)} />
          </View>
          <Text style={styles.section}>Next renewals</Text>
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
    </Screen>
  );
}

function ProfileIcon() {
  return (
    <View style={styles.profileIcon}>
      <View style={styles.profileHead} />
      <View style={styles.profileBody} />
    </View>
  );
}

function NotificationIcon() {
  return (
    <View style={styles.bell}>
      <View style={styles.bellBody} />
      <View style={styles.bellClapper} />
    </View>
  );
}

function Count({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.count}>
      <Text style={styles.countValue}>{value}</Text>
      <Text style={styles.countLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  title: {
    color: colors.navy,
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  iconButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  profileIcon: {
    alignItems: 'center',
    height: 22,
    justifyContent: 'flex-end',
    width: 22,
  },
  profileHead: {
    backgroundColor: colors.mint,
    borderRadius: 6,
    height: 8,
    width: 8,
  },
  profileBody: {
    backgroundColor: colors.mint,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 8,
    marginTop: 2,
    width: 14,
  },
  bell: {
    alignItems: 'center',
    height: 22,
    justifyContent: 'flex-end',
    width: 22,
  },
  bellBody: {
    backgroundColor: colors.mint,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 12,
    width: 14,
  },
  bellClapper: {
    backgroundColor: colors.mint,
    borderRadius: 2,
    height: 3,
    marginTop: 2,
    width: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  count: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    width: '47%',
  },
  countValue: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: '700',
  },
  countLabel: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 6,
  },
  section: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
  },
});
