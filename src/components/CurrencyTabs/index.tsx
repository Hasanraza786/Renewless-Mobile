import type { ReactNode } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { CURRENCY_NAMES } from '../../utils/money';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { styles } from './styles';

type Props = {
  // Most subscriptions first; with one currency nothing renders.
  currencies: string[];
  selected: string;
  onSelect: (currency: string) => void;
  // Shown between the tabs and the note, e.g. the onboarding cost card's amount.
  children?: ReactNode;
};

// Several currencies (approved 24 Nov 2026): one currency's totals at a time, never added together.
// The parent spaces it (12pt above the totals it controls).
export default function CurrencyTabs({ currencies, selected, onSelect, children }: Props) {
  if (currencies.length < 2) return null;
  const choose = (currency: string) => {
    onSelect(currency);
    AccessibilityInfo.announceForAccessibility(`Showing totals in ${CURRENCY_NAMES[currency] ?? currency}`);
  };
  return (
    <View>
      <RowView gap={SIZES.padding * 0.3} accessibilityRole="radiogroup" accessibilityLabel="Currency" style={styles.tabs}>
        {currencies.map(currency => {
          const active = currency === selected;
          return (
            <RowView
              key={currency}
              justify_content="center"
              accessibilityRole="radio"
              accessibilityState={{ checked: active }}
              accessibilityLabel={`Show totals in ${CURRENCY_NAMES[currency] ?? currency}`}
              onPress={() => choose(currency)}
              style={[styles.tab, active && styles.tab_active]}>
              <CustomText text={currency} weight={FONTS.regular} color={active ? COLORS.primary : COLORS.text_primary} size={SIZES.sm} />
            </RowView>
          );
        })}
      </RowView>
      {children}
      <CustomText
        mt={SIZES.padding / 5}
        text={`${currencies.indexOf(selected) + 1} of ${currencies.length} currencies · we don’t add currencies together`}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.xs}
      />
    </View>
  );
}
