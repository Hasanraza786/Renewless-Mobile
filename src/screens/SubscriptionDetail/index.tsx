import { useCallback } from 'react';
import {
  Alert,
  Pressable,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { colorsForStatus, statusLabel } from '../../constants/status_colors';
import { loadSubscription, removeSubscriptionById } from '../../redux/actions/subscriptions-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { formatDate } from '../../utils/dates';
import { formatMoney } from '../../utils/money';
import { styles } from './styles';

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
    <Container is_auth>
      <View style={styles.main_view}>
      <Header title="Subscription" onBack={() => navigation.goBack()} />
      {status === 'loading' ? <StateView status="loading" message="Loading this subscription." /> : null}
      {status === 'failed' ? <StateView status="failed" message={error} onRetry={load} /> : null}
      {status === 'ready' && item && tone ? (
        <View style={styles.card}>
          <CustomText text={item.name} size={SIZES.screen_heading} line_height={SIZES.screen_heading_line} />
          <CustomText
            text={statusLabel(item.status)}
            size={SIZES.field_label}
            line_height={SIZES.field_label_line}
            color={tone.text}
            mt={SIZES.padding2}
            style={[styles.badge, { backgroundColor: tone.background }]}
          />
          <CustomText
            text={formatMoney(item.price, item.currency)}
            size={SIZES.row_price}
            line_height={SIZES.row_price_line}
            mt={SIZES.padding2}
          />
          <CustomText
            text={`Cycle ${item.cycle}`}
            weight={FONTS.regular}
            size={SIZES.supporting}
            line_height={SIZES.supporting_line}
            mt={SIZES.padding2}
            transform="capitalize"
          />
          <CustomText
            text={`Started ${formatDate(item.startDate)}`}
            weight={FONTS.regular}
            size={SIZES.supporting}
            line_height={SIZES.supporting_line}
            mt={SIZES.padding2}
          />
          <CustomText
            text={`Renews ${renewal}`}
            weight={FONTS.regular}
            size={SIZES.supporting}
            line_height={SIZES.supporting_line}
            mt={SIZES.padding2}
          />
          {item.note ? (
            <CustomText
              text={item.note}
              weight={FONTS.regular}
              color={COLORS.text_secondary}
              size={SIZES.body}
              line_height={SIZES.body_line}
              mt={SIZES.padding2}
            />
          ) : null}
          <Pressable
            onPress={() => navigation.navigate('EditSubscription', { id: item.id })}
            style={styles.action}>
            <CustomText text="Edit" color={COLORS.primary} size={SIZES.button} line_height={SIZES.button_line} />
          </Pressable>
          <Pressable onPress={onDelete} style={styles.action}>
            <CustomText text="Delete" color={COLORS.expired} size={SIZES.button} line_height={SIZES.button_line} />
          </Pressable>
        </View>
      ) : null}
      </View>
    </Container>
  );
}
