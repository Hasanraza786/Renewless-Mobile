import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PrimaryButton from '../../components/PrimaryButton';
import Screen from '../../components/Screen';
import ScreenHeader from '../../components/ScreenHeader';
import StateView from '../../components/StateView';
import SubscriptionFields, {
  type SubscriptionDraft,
} from '../../components/SubscriptionFields';
import { colors } from '../../constants/colors';
import { loadSubscriptionForEdit, saveSubscriptionEdits } from '../../redux/actions/subscriptions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';

type Props = NativeStackScreenProps<AppStackParamList, 'EditSubscription'>;

export default function EditSubscriptionScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const current = useAppSelector(state =>
    state.subscriptions.current?.id === route.params.id ? state.subscriptions.current : null,
  );
  const loading = useAppSelector(state => state.subscriptions.loading.edit);
  const loadError = useAppSelector(state => state.subscriptions.error.edit);
  const saveError = useAppSelector(state => state.subscriptions.error.update);
  const saving = useAppSelector(state => state.subscriptions.loading.update);
  const [draft, setDraft] = useState<SubscriptionDraft | null>(null);
  const [draftId, setDraftId] = useState('');

  const load = useCallback(() => {
    dispatch(loadSubscriptionForEdit(route.params.id));
  }, [dispatch, route.params.id]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  useEffect(() => {
    if (!current || draftId === current.id) return;
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
  }, [current, draftId]);

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
    <Screen isAuth>
      <ScreenHeader title="Edit subscription" onBack={() => navigation.goBack()} />
      {loading || (!draft && !loadError) ? (
        <StateView status="loading" message="Loading this subscription." />
      ) : null}
      {!loading && loadError && !draft ? (
        <StateView status="failed" message={loadError} onRetry={load} />
      ) : null}
      {!loading && draft ? (
        <ScrollView keyboardShouldPersistTaps="handled">
          <SubscriptionFields value={draft} onChange={setDraft} />
          {saveError ? <Text style={styles.error}>{saveError}</Text> : null}
          <PrimaryButton label="Save" onPress={onSave} disabled={saving} />
        </ScrollView>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.navy,
    marginBottom: 12,
  },
});
