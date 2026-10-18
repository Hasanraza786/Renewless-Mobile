import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CountryPicker, {
  FlagType,
  getAllCountries,
  type Country,
  type CountryCode,
} from 'react-native-country-picker-modal';
import { colors } from '../../constants/colors';

type Props = {
  phone: string;
  dialCode: string;
  onChangePhone: (phone: string) => void;
  onChangeDialCode: (dialCode: string) => void;
};

export default function PhoneInputField({
  phone,
  dialCode,
  onChangePhone,
  onChangeDialCode,
}: Props) {
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    let active = true;
    getAllCountries(FlagType.EMOJI)
      .then(countries => {
        if (!active) return;
        const match =
          countries.find(
            country =>
              country.callingCode?.[0] === dialCode &&
              (dialCode !== '1' || country.cca2 === 'US'),
          ) || countries.find(country => country.callingCode?.[0] === dialCode);
        if (match) setCountryCode(match.cca2);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [dialCode]);

  function onSelect(country: Country) {
    setCountryCode(country.cca2);
    onChangeDialCode(country.callingCode?.[0] || '1');
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>
        Phone number <Text style={styles.required}>*</Text>
      </Text>
      <View style={[styles.row, focused && styles.rowFocused]}>
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCallingCode
          withCallingCodeButton
          withAlphaFilter
          withCloseButton
          onSelect={onSelect}
        />
        <Text style={styles.chevron}>▾</Text>
        <TextInput
          value={phone}
          onChangeText={value => onChangePhone(value.replace(/\D/g, ''))}
          keyboardType="number-pad"
          placeholder="201 555 0123"
          placeholderTextColor={colors.muted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
  },
  label: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  required: {
    color: colors.mint,
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    height: 52,
    paddingHorizontal: 10,
  },
  rowFocused: {
    borderColor: colors.mint,
  },
  chevron: {
    color: colors.muted,
    fontSize: 14,
    marginRight: 8,
  },
  input: {
    color: colors.navy,
    flex: 1,
    fontSize: 16,
    height: 52,
    paddingVertical: 0,
  },
});
