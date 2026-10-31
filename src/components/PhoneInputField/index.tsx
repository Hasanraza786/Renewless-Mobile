import { useEffect, useState } from 'react';
import {
  TextInput,
  View,
} from 'react-native';
import CountryPicker, {
  FlagType,
  getAllCountries,
  type Country,
  type CountryCode,
} from 'react-native-country-picker-modal';
import RowView from '../RowView';
import CustomText from '../CustomText';
import { FONTS, SIZES, colors } from '../../constants/theme';
import { styles } from './styles';

type Props = {
  phone: string;
  dial_code: string;
  onChangePhone: (phone: string) => void;
  onChangeDialCode: (dial_code: string) => void;
};

export default function PhoneInputField({
  phone,
  dial_code,
  onChangePhone,
  onChangeDialCode,
}: Props) {
  const [country_code, setCountryCode] = useState<CountryCode>('US');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    let active = true;
    getAllCountries(FlagType.EMOJI)
      .then(countries => {
        if (!active) return;
        const match =
          countries.find(
            country =>
              country.callingCode?.[0] === dial_code &&
              (dial_code !== '1' || country.cca2 === 'US'),
          ) || countries.find(country => country.callingCode?.[0] === dial_code);
        if (match) setCountryCode(match.cca2);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [dial_code]);

  function onSelect(country: Country) {
    setCountryCode(country.cca2);
    onChangeDialCode(country.callingCode?.[0] || '1');
  }

  return (
    <View style={styles.wrap}>
      <CustomText
        text={
          <>
            Phone number <CustomText text="*" weight={FONTS.regular} color={colors.accent} size={SIZES.padding2} />
          </>
        }
        weight={FONTS.regular}
        size={SIZES.padding2}
        mb={SIZES.padding3}
      />
      <RowView gap={0} style={[styles.row, focused && styles.row_focused]}>
        <CountryPicker
          countryCode={country_code}
          withFilter
          withFlag
          withCallingCode
          withCallingCodeButton
          withAlphaFilter
          withCloseButton
          onSelect={onSelect}
        />
        <CustomText text="▾" weight={FONTS.regular} color={colors.text_secondary} size={SIZES.padding2} mr={SIZES.padding3} />
        <TextInput
          value={phone}
          onChangeText={value => onChangePhone(value.replace(/\D/g, ''))}
          keyboardType="number-pad"
          placeholder="201 555 0123"
          placeholderTextColor={colors.text_secondary}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
        />
      </RowView>
    </View>
  );
}
