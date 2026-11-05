import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Dropdown from '../../../components/Dropdown';
import InputField from '../../../components/InputField';
import SizedBox from '../../../components/SizedBox';
import { COLORS, SIZES } from '../../../constants/theme';
import { MONTH_NAMES } from '../../../utils/payments';

type Props = {
  month: string;
  // Window position of the month heading; the picker opens just below it.
  anchor: { x: number; y: number; height: number };
  onClose: () => void;
  onShow: (month: string) => void;
};

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

// Themed month/year picker; nothing changes until Show month.
export default function MonthPicker({ month, anchor, onClose, onShow }: Props) {
  const [month_name, setMonthName] = useState(MONTH_NAMES[Number(month.slice(5, 7)) - 1]);
  const [year, setYear] = useState(month.slice(0, 4));
  const [error, setError] = useState('');

  const updateYear = (value: string) => {
    setYear(value.replace(/\D/g, '').slice(0, 4));
    setError('');
  };

  const submit = () => {
    const value = Number(year);
    if (!/^\d{4}$/.test(year) || value < MIN_YEAR || value > MAX_YEAR) {
      setError(`Enter a year from ${MIN_YEAR} to ${MAX_YEAR}.`);
      return;
    }
    onShow(`${year}-${String(MONTH_NAMES.indexOf(month_name) + 1).padStart(2, '0')}`);
  };

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <Pressable accessibilityLabel="Close month picker" onPress={onClose} style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView behavior="padding" pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <View accessibilityViewIsModal style={[styles.card, { left: anchor.x, top: anchor.y + anchor.height }]}>
          <Dropdown label="Month" value={month_name} options={MONTH_NAMES} onChange={setMonthName} />
          <SizedBox height={SIZES.padding2} />
          <InputField variant="sheet" label="Year" value={year} onChangeText={updateYear} keyboardType="number-pad" maxLength={4} error={error || undefined} returnKeyType="done" onSubmitEditing={submit} />
          <SizedBox height={SIZES.padding2} />
          <CustomButton variant="primary" text="Show month" onPress={submit} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.tooltip,
    borderColor: COLORS.accent_ring,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    padding: SIZES.padding * 0.8,
    position: 'absolute',
    width: SIZES.padding * 11.25,
  },
});
