import { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calendar_icon, clock_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import AppSheet from '../AppSheet';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { styles } from './styles';
import RowView from '../RowView';

type Props = {
  label: string;
  // Local calendar date as YYYY-MM-DD; null when not set.
  value: string | null;
  minimum?: string;
  maximum?: string;
  onChange: (value: string) => void;
  // 'form' matches the account form fields (Edit profile); default is the sheet field.
  variant?: 'form';
  error?: string;
  // 'time' picks a local HH:MM (form variant only); the value and onChange use HH:MM.
  mode?: 'date' | 'time';
};

const toDate = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
};
const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

// Date input: sheets expand the native inline calendar below the field; the form variant opens a wheel sheet.
export default function DateField({ label, value, minimum, maximum, onChange, variant, error, mode = 'date' }: Props) {
  const [open, setOpen] = useState(false);
  // The form variant picks in a sheet and commits on Done; closing the sheet discards the draft.
  const [draft, setDraft] = useState<Date | null>(null);
  const time = mode === 'time';
  const toPicker = (iso: string) => (time ? new Date(`2000-01-01T${iso}:00`) : toDate(iso));
  const fromPicker = (date: Date) => (time ? `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}` : toIso(date));
  const shown = value ? (time ? toPicker(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : toDate(value).toLocaleDateString('en-GB')) : time ? '--:-- --' : 'dd/mm/yyyy';

  return (
    <View>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding * 0.3} />
      <RowView justify_content="space-between"
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${value ? shown : 'not set'}`}
        accessibilityState={{ expanded: open || !!draft }}
        onPress={() => (variant === 'form' ? setDraft(value ? toPicker(value) : maximum ? toDate(maximum) : new Date()) : setOpen(current => !current))}
        style={[styles.field, variant === 'form' && styles.field_form, !!error && styles.field_error, (open || !!draft) && styles.field_open]}>
        <CustomText text={shown} weight={FONTS.regular} color={value ? COLORS.text_primary : COLORS.text_secondary} size={SIZES.sm} />
        <Icons name={time ? clock_icon : calendar_icon} />
      </RowView>
      {error ? <CustomText mt={SIZES.padding * 0.35} text={error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} /> : null}
      {variant === 'form' ? (
        <AppSheet visible={!!draft} title={label.split(/ · | {2}/)[0]} onClose={() => setDraft(null)}>
          {draft ? (
            <View style={time ? undefined : styles.wheel}>
              <DateTimePicker
                mode={mode}
                display="spinner"
                themeVariant="dark"
                value={draft}
                minimumDate={minimum ? toDate(minimum) : undefined}
                maximumDate={maximum ? toDate(maximum) : undefined}
                onValueChange={(_, date) => setDraft(date)}
              />
            </View>
          ) : null}
          <CustomButton variant="primary" text="Done" onPress={() => { if (draft) onChange(fromPicker(draft)); setDraft(null); }} />
        </AppSheet>
      ) : open ? (
        <DateTimePicker
          mode="date"
          display="inline"
          themeVariant="dark"
          accentColor={COLORS.primary}
          value={value ? toDate(value) : new Date()}
          minimumDate={minimum ? toDate(minimum) : undefined}
          maximumDate={maximum ? toDate(maximum) : undefined}
          onValueChange={(_, date) => onChange(toIso(date))}
        />
      ) : null}
    </View>
  );
}
