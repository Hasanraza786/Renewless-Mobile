import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import StateView from '../../components/StateView';
import { colors } from '../../constants/colors';
import { loadConnectors } from '../../redux/actions/connectors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, TabParamList } from '../../types';
import { formatDate } from '../../utils/dates';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Connectors'>,
  NativeStackScreenProps<AppStackParamList>
>;

function syncLabel(value: string | null) {
  if (!value) return 'Not synced';
  return formatDate(value);
}

export default function ConnectorsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.connectors.connectors);
  const loading = useAppSelector(state => state.connectors.loading.list);
  const error = useAppSelector(state => state.connectors.error.list);
  const status = loading ? 'loading' : error ? 'failed' : 'ready';

  const load = useCallback(() => {
    dispatch(loadConnectors());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Connectors</Text>
        <Pressable onPress={() => navigation.navigate('AddConnector')}>
          <Text style={styles.add}>Add</Text>
        </Pressable>
      </View>
      {status === 'loading' ? <StateView status="loading" message="Loading accounts." /> : null}
      {status === 'failed' ? <StateView status="failed" message={error} onRetry={load} /> : null}
      {status === 'ready' ? (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <StateView status="empty" message="No Gmail accounts connected." />
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Review', { connectorId: item.id, email: item.email })
              }
              style={styles.card}>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.meta}>{item.status}</Text>
              <Text style={styles.meta}>Last sync {syncLabel(item.lastSync)}</Text>
            </Pressable>
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
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  email: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 6,
    textTransform: 'capitalize',
  },
});
