import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import RowView from '../../components/RowView';
import Container from '../../components/Container';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import CustomText from '../../components/CustomText';
import { COLORS, SIZES } from '../../constants/theme';
import { colorsForStatus, statusLabel } from '../../constants/status_colors';
import { loadSubscriptions } from '../../redux/actions/subscriptions-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, SubscriptionStatus, TabParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

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
    <Container>
      <View style={styles.main_view}>
      <RowView gap={0} style={{ marginBottom: SIZES.padding2 }}>
        <CustomText text="Subscriptions" size={(SIZES.padding + SIZES.padding3 / 4)} style={common_styles.flex_1} />
        <Pressable onPress={() => navigation.navigate('AddSubscription')}>
          <CustomText text="Add" color={COLORS.primary} size={(SIZES.padding2 + SIZES.padding3 / 4)} />
        </Pressable>
      </RowView>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search companies"
        placeholderTextColor={COLORS.text_secondary}
        style={styles.search}
      />
      <RowView align_items="stretch" gap={SIZES.padding3} style={{ marginBottom: SIZES.padding2 }}>
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
              <CustomText
                text={statusLabel(item)}
                size={(SIZES.padding2 + SIZES.padding3 / 4)}
                color={selected ? tone.text : COLORS.text_primary}
              />
            </Pressable>
          );
        })}
      </RowView>
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
      </View>
    </Container>
  );
}
