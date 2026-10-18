import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import ScreenHeader from '../../components/ScreenHeader';
import StateView from '../../components/StateView';
import { colors } from '../../constants/colors';
import { loadNotifications } from '../../redux/actions/notifications';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { formatDate } from '../../utils/dates';

type Props = NativeStackScreenProps<AppStackParamList, 'Notifications'>;

export default function NotificationsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.notifications.items);
  const loading = useAppSelector(state => state.notifications.loading);
  const error = useAppSelector(state => state.notifications.error);
  const status = loading ? 'loading' : error ? 'failed' : 'ready';

  const load = useCallback(() => {
    dispatch(loadNotifications());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <Screen isAuth>
      <ScreenHeader title="Notifications" onBack={() => navigation.goBack()} />
      {status === 'loading' ? <StateView status="loading" message="Loading notices." /> : null}
      {status === 'failed' ? <StateView status="failed" message={error} onRetry={load} /> : null}
      {status === 'ready' && items.length === 0 ? (
        <StateView status="empty" message="No renewal notices yet." />
      ) : null}
      {status === 'ready' && items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>{formatDate(item.date)}</Text>
              <Text style={styles.kind}>{item.estimated ? 'Estimated' : 'Confirmed'}</Text>
            </View>
          )}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  name: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    color: colors.navy,
    marginTop: 6,
  },
  kind: {
    color: colors.muted,
    marginTop: 4,
  },
});
