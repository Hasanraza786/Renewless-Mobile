import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import ScreenHeader from '../../components/ScreenHeader';
import StateView from '../../components/StateView';
import { colors } from '../../constants/colors';
import { addReview, dismissReview, loadReview } from '../../redux/actions/connectors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { formatDate } from '../../utils/dates';
import { formatMoney } from '../../utils/money';

type Props = NativeStackScreenProps<AppStackParamList, 'Review'>;

const noReviewItems: never[] = [];

export default function ReviewScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state =>
    state.connectors.reviewConnectorId === route.params.connectorId
      ? state.connectors.reviewItems
      : noReviewItems,
  );
  const loading = useAppSelector(state => state.connectors.loading.review);
  const loadError = useAppSelector(state => state.connectors.error.review);
  const error = useAppSelector(state => state.connectors.reviewActionError);
  const busyId = useAppSelector(state => state.connectors.reviewBusyId);
  const loaded = useAppSelector(
    state => state.connectors.reviewConnectorId === route.params.connectorId,
  );
  const status = loading ? 'loading' : loadError ? 'failed' : loaded ? 'ready' : 'loading';

  const load = useCallback(() => {
    dispatch(loadReview(route.params.connectorId));
  }, [dispatch, route.params.connectorId]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  function act(itemId: string, kind: 'add' | 'dismiss') {
    if (busyId) return;
    dispatch(kind === 'add' ? addReview(itemId) : dismissReview(itemId));
  }

  return (
    <Screen isAuth>
      <ScreenHeader title="Review" onBack={() => navigation.goBack()} />
      <Text style={styles.email}>{route.params.email}</Text>
      {status === 'loading' ? <StateView status="loading" message="Loading found renewals." /> : null}
      {status === 'failed' ? (
        <StateView status="failed" message={loadError} onRetry={load} />
      ) : null}
      {status === 'ready' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {items.length === 0 ? (
            <StateView status="empty" message="Nothing is waiting for review." />
          ) : (
            items.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.line}>{formatMoney(item.price, item.currency)}</Text>
                <Text style={styles.line}>{formatDate(item.nextRenewal)}</Text>
                <View style={styles.actions}>
                  <Pressable disabled={busyId === item.id} onPress={() => act(item.id, 'add')}>
                    <Text style={styles.add}>Add</Text>
                  </Pressable>
                  <Pressable disabled={busyId === item.id} onPress={() => act(item.id, 'dismiss')}>
                    <Text style={styles.dismiss}>Dismiss</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  email: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 12,
  },
  error: {
    color: colors.navy,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  name: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '700',
  },
  line: {
    color: colors.navy,
    fontSize: 15,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 14,
  },
  add: {
    color: colors.mint,
    fontSize: 16,
    fontWeight: '700',
  },
  dismiss: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '700',
  },
});
