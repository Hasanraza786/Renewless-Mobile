import { Pressable, View } from 'react-native';
import { chevron_right_icon } from '../../../assets/icons';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { MoneyTotal } from '../../../types';
import type { HomeController } from '../index.function';
import { styles } from '../styles';
import { money } from '../../../utils/money';

const monthLabel = (month: string) => {
  const [year, value] = month.split('-').map(Number);
  return new Date(year, value - 1, 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};

// Each currency on its own line; currencies are never combined.
const totalsText = (totals: MoneyTotal[], none: string) => (totals.length ? totals.map(item => money(item.currency, item.amount)).join('\n') : none);

function Column({ label, value, meta, onPress, accessibility_label, divided }: { label: string; value: string; meta: string; onPress: () => void; accessibility_label: string; divided?: boolean }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={accessibility_label} onPress={onPress} style={[styles.month_column, divided && styles.month_column_divided]}>
      <CustomText mt={SIZES.padding / 5} text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomText mt={SIZES.padding3} text={value} size={SIZES.h3} />
      <RowView gap={SIZES.padding / 5} mt={SIZES.padding3}>
        <CustomText text={meta} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        <Icons name={chevron_right_icon} icon_height={SIZES.sm} icon_width={SIZES.sm} stroke={COLORS.primary} />
      </RowView>
    </Pressable>
  );
}

export default function MonthCard({ home }: { home: HomeController }) {
  const { month, upcoming } = home.data!;
  // Usage bills are left out of the totals; say so once the account has one.
  const usage_note = [...upcoming, ...month.events].some(event => event.kind === 'usage_bill') ? ' Usage bills aren’t included.' : '';
  return (
    <View style={styles.month_card}>
      <RowView justify_content="space-between">
        <CustomText text="This month" size={SIZES.lg} />
        <CustomText text={monthLabel(month.month)} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </RowView>
      <RowView align_items="stretch" gap={SIZES.padding2} style={styles.month_grid}>
        <Column
          label="Paid this month"
          value={totalsText(month.paid, 'No receipts yet')}
          meta={month.receipt_count ? `${month.receipt_count} inbox receipt${month.receipt_count === 1 ? '' : 's'}` : 'Not yet confirmed'}
          onPress={home.openPayments}
          accessibility_label="View confirmed payments this month"
        />
        <Column
          divided
          label="Upcoming this month"
          value={totalsText(month.upcoming, 'None scheduled')}
          meta={`${month.charge_count} expected charge${month.charge_count === 1 ? '' : 's'}`}
          onPress={home.openThisMonth}
          accessibility_label="View upcoming charges this month"
        />
      </RowView>
      <CustomText mt={SIZES.padding} text={`Upcoming charges are estimates. Paid amounts come from your inbox receipts.${usage_note}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
    </View>
  );
}
