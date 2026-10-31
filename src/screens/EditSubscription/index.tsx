import { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton';
import Container from '../../components/Container';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import SubscriptionFields, {
  type SubscriptionDraft,
} from '../../components/SubscriptionFields';
import CustomText from '../../components/CustomText';
import { FONTS, SIZES } from '../../constants/theme';
import { loadSubscriptionForEdit, saveSubscriptionEdits } from '../../redux/actions/subscriptions-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { styles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'EditSubscription'>;

export default function EditSubscriptionScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const current = useAppSelector(state =>
    state.subscriptions.current?.id === route.params.id ? state.subscriptions.current : null,
  );
  const loading = useAppSelector(state => state.subscriptions.loading.edit);
  const load_error = useAppSelector(state => state.subscriptions.error.edit);
  const save_error = useAppSelector(state => state.subscriptions.error.update);
  const saving = useAppSelector(state => state.subscriptions.loading.update);
  const [draft, setDraft] = useState<SubscriptionDraft | null>(null);
  const [draft_id, setDraftId] = useState('');

  const load = useCallback(() => {
    dispatch(loadSubscriptionForEdit(route.params.id));
  }, [dispatch, route.params.id]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  useEffect(() => {
    if (!current || draft_id === current.id) return;
    setDraft({
      name: current.name,
      price: String(current.price),
      currency: current.currency,
      cycle: current.cycle,
      startDate: current.startDate,
      nextRenewal: current.nextRenewal,
      note: current.note || '',
    });
    setDraftId(current.id);
  }, [current, draft_id]);

  function onSave() {
    if (!draft) return;
    dispatch(
      saveSubscriptionEdits(
        route.params.id,
        {
          name: draft.name,
          price: draft.price.trim() ? Number(draft.price) : Number.NaN,
          currency: draft.currency,
          cycle: draft.cycle,
          startDate: draft.startDate,
          nextRenewal: draft.nextRenewal,
          note: draft.note,
        },
        () => navigation.goBack(),
      ),
    );
  }

  return (
    <Container is_auth>
      <View style={styles.main_view}>
      <Header title="Edit subscription" onBack={() => navigation.goBack()} />
      {loading || (!draft && !load_error) ? (
        <StateView status="loading" message="Loading this subscription." />
      ) : null}
      {!loading && load_error && !draft ? (
        <StateView status="failed" message={load_error} onRetry={load} />
      ) : null}
      {!loading && draft ? (
        <ScrollView keyboardShouldPersistTaps="handled">
          <SubscriptionFields value={draft} onChange={setDraft} />
          {save_error ? (
            <CustomText text={save_error} weight={FONTS.regular} size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.body_line} mb={SIZES.padding2} />
          ) : null}
          <CustomButton text="Save" onPress={onSave} disabled={saving} />
        </ScrollView>
      ) : null}
      </View>
    </Container>
  );
}
