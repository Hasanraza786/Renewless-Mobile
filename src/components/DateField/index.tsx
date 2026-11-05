import { useState } from 'react';
import { Pressable, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calendar_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { styles } from './styles';

type Props = {
  label: string;
  // Local calendar date as YYYY-MM-DD; null when not set.
  value: string | null;
  minimum?: string;
  maximum?: string;
  onChange: (value: string) => void;
};

const toDate = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
};
const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

// Date input that expands the native inline calendar below the field.
export default function DateField({ label, value, minimum, maximum, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const shown = value ? toDate(value).toLocaleDateString('en-GB') : 'dd/mm/yyyy';

  return (
    <View>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding * 0.3} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${value ? shown : 'not set'}`}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen(current => !current)}
        style={[styles.field, open && styles.field_open]}>
        <CustomText text={shown} weight={FONTS.regular} color={value ? COLORS.text_primary : COLORS.text_secondary} size={SIZES.sm} />
        <Icons name={calendar_icon} />
      </Pressable>
      {open ? (
        <DateTimePicker
          mode="date"
          display="inline"
          themeVariant="dark"
          accentColor={COLORS.primary}
          value={value ? toDate(value) : new Date()}
          minimumDate={minimum ? toDate(minimum) : undefined}
          maximumDate={maximum ? toDate(maximum) : undefined}
          onChange={(_, date) => date && onChange(toIso(date))}
        />
      ) : null}
    </View>
  );
}
