import {
  Pressable,
  View,
} from 'react-native';
import type { Cycle } from '../../types';
import CustomText from '../CustomText';
import RowView from '../RowView';
import InputField from '../InputField';
import { FONTS, SIZES, colors } from '../../constants/theme';
import { styles } from './styles';

const CYCLES: Cycle[] = ['weekly', 'monthly', 'yearly', 'custom'];

export type SubscriptionDraft = {
  name: string;
  price: string;
  currency: string;
  cycle: Cycle;
  startDate: string;
  nextRenewal: string;
  note: string;
};

type Props = {
  value: SubscriptionDraft;
  onChange: (value: SubscriptionDraft) => void;
};

export default function SubscriptionFields({ value, onChange }: Props) {
  function set<K extends keyof SubscriptionDraft>(key: K, next: SubscriptionDraft[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <View>
      <InputField label="Company" value={value.name} onChangeText={name => set('name', name)} />
      <InputField
        label="Price"
        value={value.price}
        onChangeText={price => set('price', price)}
        keyboardType="decimal-pad"
      />
      <InputField
        label="Currency"
        value={value.currency}
        onChangeText={currency => set('currency', currency.toUpperCase())}
        autoCapitalize="characters"
        maxLength={3}
      />
      <CustomText text="Billing cycle" weight={FONTS.regular} size={SIZES.field_label} line_height={SIZES.field_label_line} mb={SIZES.padding3} />
      <RowView align_items="stretch" gap={SIZES.padding3} style={{ flexWrap: 'wrap', marginBottom: SIZES.padding3 * 2 }}>
        {CYCLES.map(cycle => {
          const selected = value.cycle === cycle;
          return (
            <Pressable
              key={cycle}
              onPress={() => set('cycle', cycle)}
              style={[styles.chip, selected && styles.chip_on]}>
              <CustomText
                text={cycle}
                size={SIZES.button}
                line_height={SIZES.button_line}
                weight={selected ? FONTS.regular : FONTS.medium}
                color={selected ? colors.on_accent : colors.text}
                transform="capitalize"
              />
            </Pressable>
          );
        })}
      </RowView>
      <InputField
        label="Start date"
        value={value.startDate}
        onChangeText={start_date => set('startDate', start_date)}
        placeholder="YYYY-MM-DD"
      />
      <InputField
        label="Next renewal date"
        value={value.nextRenewal}
        onChangeText={next_renewal => set('nextRenewal', next_renewal)}
        placeholder="YYYY-MM-DD"
      />
      <InputField
        label="Note (optional)"
        value={value.note}
        onChangeText={note => set('note', note)}
        multiline
      />
    </View>
  );
}
