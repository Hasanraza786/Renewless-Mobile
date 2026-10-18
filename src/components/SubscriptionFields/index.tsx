import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import type { Cycle } from '../../types';
import TextField from '../TextField';

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
      <TextField label="Company" value={value.name} onChangeText={name => set('name', name)} />
      <TextField
        label="Price"
        value={value.price}
        onChangeText={price => set('price', price)}
        keyboardType="decimal-pad"
      />
      <TextField
        label="Currency"
        value={value.currency}
        onChangeText={currency => set('currency', currency.toUpperCase())}
        autoCapitalize="characters"
        maxLength={3}
      />
      <Text style={styles.label}>Billing cycle</Text>
      <View style={styles.cycles}>
        {CYCLES.map(cycle => {
          const selected = value.cycle === cycle;
          return (
            <Pressable
              key={cycle}
              onPress={() => set('cycle', cycle)}
              style={[styles.chip, selected && styles.chipOn]}>
              <Text style={[styles.chipText, selected && styles.chipTextOn]}>{cycle}</Text>
            </Pressable>
          );
        })}
      </View>
      <TextField
        label="Start date"
        value={value.startDate}
        onChangeText={startDate => set('startDate', startDate)}
        placeholder="YYYY-MM-DD"
      />
      <TextField
        label="Next renewal date"
        value={value.nextRenewal}
        onChangeText={nextRenewal => set('nextRenewal', nextRenewal)}
        placeholder="YYYY-MM-DD"
      />
      <TextField
        label="Note (optional)"
        value={value.note}
        onChangeText={note => set('note', note)}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  cycles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipOn: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  chipText: {
    color: colors.navy,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  chipTextOn: {
    color: colors.white,
  },
});
