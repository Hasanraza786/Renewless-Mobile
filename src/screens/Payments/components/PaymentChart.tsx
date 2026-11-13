import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from '../../../components/CustomText';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import { MONTH_NAMES } from '../../../utils/payments';
import { formatAmount, money } from '../../../utils/money';

type Props = {
  currency: string;
  year: string;
  // Twelve monthly confirmed totals for this currency.
  months: number[];
  inspect: string;
  page_start: number;
  onInspect: (month: string) => void;
  onPage: (start: number) => void;
};

const TRACK = SIZES.padding * 3;

// One currency's confirmed monthly graph, six months a page. Inspecting a month never filters the list.
export default function PaymentChart({ currency, year, months, inspect, page_start, onInspect, onPage }: Props) {
  const max = Math.max(...months, 1);
  const inspected = Number(inspect) - 1;
  const page = Array.from({ length: 6 }, (_, index) => page_start + index);
  const arrow = (label: string, glyph: string, start: number, disabled: boolean) => (
    <RowView
      justify_content="center"
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      // Always a Pressable, so the disabled arrow keeps its label and button role.
      disabled={disabled}
      onPress={() => onPage(start)}
      style={[styles.arrow, !disabled && styles.arrow_enabled]}>
      <CustomText text={glyph} weight={FONTS.regular} color={disabled ? COLORS.text_faint : COLORS.text_primary} size={SIZES.h3} line_height={null} />
    </RowView>
  );

  return (
    <View style={styles.chart} accessibilityLabel={`Monthly confirmed payments, ${currency}`}>
      <RowView justify_content="space-between">
        <CustomText text={`${MONTH_NAMES[page[0]].slice(0, 3)}–${MONTH_NAMES[page[5]].slice(0, 3)} ${year}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        <RowView gap={SIZES.padding * 0.15}>
          {arrow('Previous six months', '‹', 0, page_start === 0)}
          {arrow('Next six months', '›', 6, page_start === 6)}
        </RowView>
      </RowView>
      <View accessibilityLiveRegion="polite" style={styles.reading}>
        <CustomText
        text={
          <>
            {`${MONTH_NAMES[inspected]} · `}
            <CustomText text={money(currency, months[inspected])} weight={FONTS.medium} size={SIZES.sm} line_height={null} />
            {' confirmed'}
          </>
        }
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
        />
      </View>
      <RowView gap={SIZES.padding / 5} style={styles.bars}>
        {page.map(index => {
          const amount = months[index];
          const active = index === inspected;
          const height = amount ? Math.max(SIZES.padding / 4, (amount / max) * TRACK) : SIZES.padding / 10;
          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${MONTH_NAMES[index]} ${year}, ${currency} ${formatAmount(currency, amount)} confirmed. Inspect amount`}
              onPress={() => onInspect(String(index + 1).padStart(2, '0'))}
              style={({ pressed }) => [common_styles.flex_1, styles.column, active && styles.column_active, pressed && common_styles.pressed]}>
              <View style={[styles.track, active && styles.track_active]}>
                <View style={[styles.fill, { height }, active && styles.fill_active]} />
              </View>
              <CustomText text={MONTH_NAMES[index].slice(0, 3)} weight={FONTS.regular} color={active ? COLORS.primary : COLORS.text_secondary} size={SIZES.sm} />
            </Pressable>
          );
        })}
      </RowView>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    borderTopColor: COLORS.line_faint,
    borderTopWidth: 1,
    marginTop: SIZES.padding2,
    paddingTop: SIZES.padding3,
  },
  arrow: {
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 2.2,
    width: SIZES.padding * 2.2,
  },
  arrow_enabled: {
    backgroundColor: COLORS.line_hint,
  },
  reading: {
    marginTop: SIZES.padding * 0.15,
  },
  bars: {
    marginTop: SIZES.padding3,
  },
  column: {
    alignItems: 'center',
    borderColor: COLORS.transparent,
    borderRadius: SIZES.padding * 0.45,
    borderWidth: 1,
    gap: SIZES.padding * 0.35,
    paddingBottom: SIZES.padding / 4,
    paddingHorizontal: SIZES.padding * 0.15,
    paddingTop: SIZES.padding * 0.3,
  },
  column_active: {
    backgroundColor: COLORS.accent_glow,
    borderColor: COLORS.accent_ring,
  },
  track: {
    alignItems: 'center',
    borderBottomColor: COLORS.text_secondary,
    borderBottomWidth: 1,
    height: TRACK,
    justifyContent: 'flex-end',
    width: SIZES.padding * 2,
  },
  track_active: {
    borderBottomColor: COLORS.primary,
  },
  fill: {
    backgroundColor: COLORS.accent_muted,
    borderBottomLeftRadius: SIZES.padding / 20,
    borderBottomRightRadius: SIZES.padding / 20,
    borderTopLeftRadius: SIZES.padding / 5,
    borderTopRightRadius: SIZES.padding / 5,
    width: SIZES.padding,
  },
  fill_active: {
    backgroundColor: COLORS.primary,
  },
});
