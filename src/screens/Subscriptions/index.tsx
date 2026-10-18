import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { colors } from '../../constants/colors';
import { colorsForStatus, statusLabel } from '../../constants/statusColors';
import { loadSubscriptions } from '../../redux/actions/subscriptions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, SubscriptionStatus, TabParamList } from '../../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Subscriptions'>,
  NativeStackScreenProps<AppStackParamList>
>;

const FILTERS: SubscriptionStatus[] = ['upcoming', 'in_progress', 'expired'];

export default function SubscriptionsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.subscriptions.items);
  const loading = useAppSelector(state => state.subscriptions.loading.list);
  const error = useAppSelector(state => state.subscriptions.error.list);
  const status = loading ? 'loading' : error ? 'failed' : 'ready';
  const [filter, setFilter] = useState<SubscriptionStatus>('upcoming');
  const [query, setQuery] = useState('');

  const load = useCallback(() => {
    dispatch(loadSubscriptions());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter(item => {
      if (item.status !== filter) return false;
      if (!needle) return true;
      return item.name.toLowerCase().includes(needle);
    });
  }, [filter, items, query]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Subscriptions</Text>
        <Pressable onPress={() => navigation.navigate('AddSubscription')}>
          <Text style={styles.add}>Add</Text>
        </Pressable>
      </View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search companies"
        placeholderTextColor={colors.muted}
        style={styles.search}
      />
      <View style={styles.filters}>
        {FILTERS.map(item => {
          const selected = item === filter;
          const tone = colorsForStatus(item);
          return (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.chip,
                selected && { backgroundColor: tone.background },
              ]}>
              <Text style={[styles.chipText, selected && { color: tone.text }]}>
                {statusLabel(item)}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {status === 'loading' ? <StateView status="loading" message="Loading subscriptions." /> : null}
      {status === 'failed' ? <StateView status="failed" message={error} onRetry={load} /> : null}
      {status === 'ready' ? (
        <FlatList
          data={visible}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <StateView status="empty" message="Nothing in this filter." />
          }
          renderItem={({ item }) => (
            <SubscriptionCard
              item={item}
              onPress={() => navigation.navigate('SubscriptionDetail', { id: item.id })}
            />
          )}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  title: {
    color: colors.navy,
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
  },
  add: {
    color: colors.mint,
    fontSize: 16,
    fontWeight: '700',
  },
  search: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.navy,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: colors.navy,
    fontWeight: '600',
  },
});
