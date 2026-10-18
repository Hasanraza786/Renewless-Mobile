import { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import ScreenHeader from '../../components/ScreenHeader';
import StateView from '../../components/StateView';
import { colors } from '../../constants/colors';
import { colorsForStatus, statusLabel } from '../../constants/statusColors';
import { loadSubscription, removeSubscriptionById } from '../../redux/actions/subscriptions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { formatDate } from '../../utils/dates';
import { formatMoney } from '../../utils/money';

type Props = NativeStackScreenProps<AppStackParamList, 'SubscriptionDetail'>;

export default function SubscriptionDetailScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const item = useAppSelector(state =>
    state.subscriptions.current?.id === route.params.id ? state.subscriptions.current : null,
  );
  const loading = useAppSelector(state => state.subscriptions.loading.detail);
  const error = useAppSelector(state => state.subscriptions.error.detail);
  const status = loading ? 'loading' : error ? 'failed' : item ? 'ready' : 'loading';

  const load = useCallback(() => {
    dispatch(loadSubscription(route.params.id));
  }, [dispatch, route.params.id]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  function onDelete() {
    if (!item) return;
    Alert.alert('Delete subscription', `Delete ${item.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(removeSubscriptionById(item.id, () => navigation.goBack()));
        },
      },
    ]);
  }

  const tone = item ? colorsForStatus(item.status) : null;
  const renewal =
    item && item.renewalSource === 'predicted'
      ? `${formatDate(item.nextRenewal)} Estimated`
      : item
        ? formatDate(item.nextRenewal)
        : '';

  return (
    <Screen isAuth>
      <ScreenHeader title="Subscription" onBack={() => navigation.goBack()} />
      {status === 'loading' ? <StateView status="loading" message="Loading this subscription." /> : null}
      {status === 'failed' ? <StateView status="failed" message={error} onRetry={load} /> : null}
      {status === 'ready' && item && tone ? (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={[styles.badge, { backgroundColor: tone.background, color: tone.text }]}>
            {statusLabel(item.status)}
          </Text>
          <Text style={styles.line}>{formatMoney(item.price, item.currency)}</Text>
          <Text style={styles.line}>Cycle {item.cycle}</Text>
          <Text style={styles.line}>Started {formatDate(item.startDate)}</Text>
          <Text style={styles.line}>Renews {renewal}</Text>
          {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
          <Pressable
            onPress={() => navigation.navigate('EditSubscription', { id: item.id })}
            style={styles.action}>
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>
          <Pressable onPress={onDelete} style={styles.action}>
            <Text style={styles.delete}>Delete</Text>
          </Pressable>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  name: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: '700',
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    fontWeight: '700',
    marginTop: 12,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  line: {
    color: colors.navy,
    fontSize: 16,
    marginTop: 12,
    textTransform: 'capitalize',
  },
  note: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  action: {
    marginTop: 16,
  },
  actionText: {
    color: colors.mint,
    fontSize: 16,
    fontWeight: '700',
  },
  delete: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '700',
  },
});
