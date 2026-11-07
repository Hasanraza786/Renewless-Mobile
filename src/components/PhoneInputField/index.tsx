import { useState } from 'react';
import { TextInput, View, useWindowDimensions } from 'react-native';
import { benefit_check_icon, chevron_down_icon } from '../../assets/icons';
import { COUNTRIES, countryFlag } from '../../config/countries';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import AppSheet from '../AppSheet';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';
import { styles } from './styles';

type Props = {
  label: string;
  // ISO code of the selected country, e.g. 'PK'.
  country: string;
  national: string;
  onChangeCountry: (country: string) => void;
  onChangeNational: (national: string) => void;
  editable?: boolean;
};

// Account form phone field: country button (flag, +code) opens a searchable Select country sheet.
export default function PhoneInputField({ label, country, national, onChangeCountry, onChangeNational, editable = true }: Props) {
  const [focused, setFocused] = useState(false);
  const [picking, setPicking] = useState(false);
  const [query, setQuery] = useState('');
  // The list keeps the sheet at a steady height while the search narrows it.
  const list_height = useWindowDimensions().height * 0.6;
  const selected = COUNTRIES.find(item => item.code === country) ?? COUNTRIES[0];
  const search = query.trim().toLowerCase().replace(/^\+/, '');
  const matches = COUNTRIES.filter(item => !search || item.name.toLowerCase().includes(search) || item.dial.startsWith(search));

  const close = () => {
    setPicking(false);
    setQuery('');
  };
  const pick = (code: string) => {
    onChangeCountry(code);
    close();
  };

  return (
    <View>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding * 0.3} />
      <RowView gap={0} align_items="stretch" style={[styles.field, focused && styles.field_focused]}>
        <RowView
          gap={SIZES.padding * 0.3}
          accessibilityRole="button"
          accessibilityLabel={`Country code, ${selected.name} +${selected.dial}`}
          disabled={!editable}
          onPress={() => setPicking(true)}
          style={styles.country}>
          <CustomText text={countryFlag(selected.code)} size={SIZES.lg} line_height={null} />
          <CustomText text={`+${selected.dial}`} weight={FONTS.regular} size={SIZES.sm} />
          <Icons name={chevron_down_icon} />
        </RowView>
        <TextInput
          value={national}
          onChangeText={onChangeNational}
          editable={editable}
          placeholder="Phone number"
          placeholderTextColor={COLORS.text_secondary}
          accessibilityLabel={label}
          keyboardType="phone-pad"
          autoComplete="tel-national"
          textContentType="telephoneNumber"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[common_styles.flex_1, styles.input]}
        />
      </RowView>
      <AppSheet visible={picking} title="Select country" subtitle="Used for your phone number’s country code." onClose={close}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search country or code"
          placeholderTextColor={COLORS.text_secondary}
          accessibilityLabel="Search country or code"
          autoCorrect={false}
          clearButtonMode="while-editing"
          style={styles.search}
        />
        <View style={{ minHeight: list_height }}>
          {matches.length ? (
            matches.map(item => (
              <RowView
                key={item.code}
                gap={SIZES.padding * 0.6}
                accessibilityRole="button"
                accessibilityState={{ selected: item.code === selected.code }}
                accessibilityLabel={`${item.name}, +${item.dial}`}
                onPress={() => pick(item.code)}
                style={styles.row}>
                <CustomText text={countryFlag(item.code)} size={SIZES.h4} line_height={null} />
                <CustomText text={item.name} weight={FONTS.regular} color={item.code === selected.code ? COLORS.primary : COLORS.text_primary} size={SIZES.sm} style={common_styles.flex_1} />
                <CustomText text={`+${item.dial}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                {item.code === selected.code ? <Icons name={benefit_check_icon} /> : null}
              </RowView>
            ))
          ) : (
            <CustomText mt={SIZES.padding * 1.2} text="No countries match your search." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
          )}
        </View>
      </AppSheet>
    </View>
  );
}
