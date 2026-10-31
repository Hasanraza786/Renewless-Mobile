import { useCallback } from 'react';
import {
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import RowView from '../../components/RowView';
import Container from '../../components/Container';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { addReview, dismissReview, loadReview } from '../../redux/actions/connectors-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { formatDate } from '../../utils/dates';
import { formatMoney } from '../../utils/money';
import { styles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Review'>;

const no_review_items: never[] = [];

export default function ReviewScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state =>
    state.connectors.reviewConnectorId === route.params.connectorId
      ? state.connectors.reviewItems
      : no_review_items,
  );
  const loading = useAppSelector(state => state.connectors.loading.review);
  const load_error = useAppSelector(state => state.connectors.error.review);
  const error = useAppSelector(state => state.connectors.reviewActionError);
  const busy_id = useAppSelector(state => state.connectors.reviewBusyId);
  const loaded = useAppSelector(
    state => state.connectors.reviewConnectorId === route.params.connectorId,
  );
  const status = loading ? 'loading' : load_error ? 'failed' : loaded ? 'ready' : 'loading';

  const load = useCallback(() => {
    dispatch(loadReview(route.params.connectorId));
  }, [dispatch, route.params.connectorId]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  function act(item_id: string, kind: 'add' | 'dismiss') {
    if (busy_id) return;
    dispatch(kind === 'add' ? addReview(item_id) : dismissReview(item_id));
  }

  return (
    <Container is_auth>
      <View style={styles.main_view}>
      <Header title="Review" onBack={() => navigation.goBack()} />
      <CustomText
        text={route.params.email}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={(SIZES.padding2 + SIZES.padding3 / 8)}
        mb={SIZES.padding2}
      />
      {status === 'loading' ? <StateView status="loading" message="Loading found renewals." /> : null}
      {status === 'failed' ? (
        <StateView status="failed" message={load_error} onRetry={load} />
      ) : null}
      {status === 'ready' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {error ? <CustomText text={error} weight={FONTS.regular} size={(SIZES.padding2 + SIZES.padding3 / 4)} mb={SIZES.padding2} /> : null}
          {items.length === 0 ? (
            <StateView status="empty" message="Nothing is waiting for review." />
          ) : (
            items.map(item => (
              <View key={item.id} style={styles.card}>
                <CustomText text={item.name} size={(SIZES.padding * 3 / 4)} />
                <CustomText
                  text={formatMoney(item.price, item.currency)}
                  weight={FONTS.regular}
                  size={(SIZES.padding2 + SIZES.padding3 / 8)}
                  mt={SIZES.padding3}
                />
                <CustomText
                  text={formatDate(item.nextRenewal)}
                  weight={FONTS.regular}
                  size={(SIZES.padding2 + SIZES.padding3 / 8)}
                  mt={SIZES.padding3}
                />
                <RowView align_items="stretch" gap={SIZES.padding} mt={SIZES.padding2 + 2}>
                  <Pressable disabled={busy_id === item.id} onPress={() => act(item.id, 'add')}>
                    <CustomText text="Add" color={COLORS.primary} size={(SIZES.padding2 + SIZES.padding3 / 4)} />
                  </Pressable>
                  <Pressable disabled={busy_id === item.id} onPress={() => act(item.id, 'dismiss')}>
                    <CustomText text="Dismiss" size={(SIZES.padding2 + SIZES.padding3 / 4)} />
                  </Pressable>
                </RowView>
              </View>
            ))
          )}
        </ScrollView>
      ) : null}
      </View>
    </Container>
  );
}
