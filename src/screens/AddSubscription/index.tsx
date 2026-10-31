import { useState } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SubscriptionFields, {
  type SubscriptionDraft,
} from '../../components/SubscriptionFields';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { saveSubscription } from '../../redux/actions/subscriptions-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { styles } from './styles';

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
    <Container is_auth>
      <View style={styles.main_view}>
      <Header title="Add subscription" onBack={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <SubscriptionFields value={draft} onChange={setDraft} />
        {error ? <CustomText text={error} weight={FONTS.regular} size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.body_line} mb={SIZES.padding2} /> : null}
        <CustomButton text="Save" onPress={onSave} disabled={loading} />
        <View style={styles.cancel}>
          <CustomText
            text="Cancel"
            color={COLORS.text_secondary}
            size={(SIZES.padding2 + SIZES.padding3 / 4)}
            line_height={SIZES.button_line}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
      </View>
    </Container>
  );
}
