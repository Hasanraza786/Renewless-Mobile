import { useCallback } from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { loadNotifications } from '../../redux/actions/notifications-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { formatDate } from '../../utils/dates';
import { styles } from './styles';

// Legacy notices list; the Alerts section replaces it.
type Props = NativeStackScreenProps<AppStackParamList>;

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
    <Container is_auth>
      <View style={styles.main_view}>
      <Header title="Notifications" onBack={() => navigation.goBack()} />
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
              <CustomText text={item.name} size={SIZES.md} />
              <CustomText text={formatDate(item.date)} weight={FONTS.regular} size={SIZES.sm} mt={SIZES.padding2 / 2} />
              <CustomText
                text={item.estimated ? 'Estimated' : 'Confirmed'}
                weight={FONTS.regular}
                color={COLORS.text_secondary}
                size={SIZES.sm}
                mt={SIZES.padding3 / 2}
              />
            </View>
          )}
        />
      ) : null}
      </View>
    </Container>
  );
}
