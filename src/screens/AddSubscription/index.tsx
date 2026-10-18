import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PrimaryButton from '../../components/PrimaryButton';
import Screen from '../../components/Screen';
import ScreenHeader from '../../components/ScreenHeader';
import SubscriptionFields, {
  type SubscriptionDraft,
} from '../../components/SubscriptionFields';
import { colors } from '../../constants/colors';
import { saveSubscription } from '../../redux/actions/subscriptions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';

type Props = NativeStackScreenProps<AppStackParamList, 'AddSubscription'>;

const empty: SubscriptionDraft = {
  name: '',
  price: '',
  currency: 'USD',
  cycle: 'monthly',
  startDate: '',
  nextRenewal: '',
  note: '',
};

export default function AddSubscriptionScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.subscriptions.loading.create);
  const error = useAppSelector(state => state.subscriptions.error.create);
  const [draft, setDraft] = useState<SubscriptionDraft>(empty);

  function onSave() {
    dispatch(
      saveSubscription(
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
      <ScreenHeader title="Add subscription" onBack={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <SubscriptionFields value={draft} onChange={setDraft} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton label="Save" onPress={onSave} disabled={loading} />
        <View style={styles.cancel}>
          <Text style={styles.cancelText} onPress={() => navigation.goBack()}>
            Cancel
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.navy,
    marginBottom: 12,
  },
  cancel: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  cancelText: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '600',
  },
});
