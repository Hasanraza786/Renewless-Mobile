import { Fragment, useState } from 'react';
import { Pressable, View } from 'react-native';
import CustomText from '../../../components/CustomText';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { HomeController } from '../index.function';
import { styles } from '../styles';

const shortMonth = (month: string) => {
  const [year, value] = month.split('-').map(Number);
  return new Date(year, value - 1, 1).toLocaleDateString('en-GB', { month: 'short' });
};

function Chart({ currency, months }: { currency: string; months: { month: string; amount: string }[] }) {
  const [selected, setSelected] = useState(0);
  const max = Math.max(...months.map(item => Number(item.amount)), 1);
  const current = months[selected];
  return (
    <Fragment>
      <CustomText mt={SIZES.padding * 0.3} text={currency} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <RowView align_items="stretch" gap={SIZES.padding * 0.45} style={styles.bars}>
        {months.map((item, index) => {
          const active = index === selected;
          const tone = active ? COLORS.primary : COLORS.text_secondary;
          return (
            <Pressable
              key={item.month}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${shortMonth(item.month)}: ${currency} ${item.amount} expected`}
              onPress={() => setSelected(index)}
              style={styles.bar_column}>
              <CustomText text={item.amount} weight={FONTS.regular} color={tone} size={SIZES.sm} align="center" />
              <View style={styles.bar_space}>
                <View style={[styles.bar, { height: `${(Number(item.amount) / max) * 100}%` }, active && styles.bar_active]} />
              </View>
              <CustomText text={shortMonth(item.month)} weight={FONTS.regular} color={tone} size={SIZES.sm} align="center" />
            </Pressable>
          );
        })}
      </RowView>
      <View style={styles.chart_selection}>
        <CustomText text={`${shortMonth(current.month)} · ${currency} ${current.amount} expected`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>
    </Fragment>
  );
}

export default function Forecast({ home }: { home: HomeController }) {
  return (
    <View style={styles.panel}>
      <CustomText text="Coming up · 6 months" size={SIZES.lg} />
      <CustomText mt={SIZES.padding * 0.3} text="Expected full-month charges" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      {home.data!.forecast.map(item => (
        <Chart key={item.currency} currency={item.currency} months={item.months} />
      ))}
    </View>
  );
}
