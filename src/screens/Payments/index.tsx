import { ScrollView, View } from 'react-native';
import { chevron_right_icon, platform_logos } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import InputField from '../../components/InputField';
import Mascot from '../../components/Mascot';
import RowView from '../../components/RowView';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import { MONTH_NAMES } from '../../utils/payments';
import { dateLabel } from '../../utils/scan';
import PaymentChart from './components/PaymentChart';
import PaymentDialog from './components/PaymentDialog';
import usePayments, { sourceLabel, type PaymentsController, type PaymentsRoute } from './index.function';
import { styles } from './styles';
import { money, spokenMoney } from '../../utils/money';

const ALL_MONTHS = 'All months';
const MONTH_OPTIONS = [ALL_MONTHS, ...MONTH_NAMES];

type EmptyKind = 'none' | 'period' | 'search';

const EMPTY_COPY: Record<EmptyKind, { title: string; action: string }> = {
  none: { title: 'No confirmed payments yet', action: 'View subscriptions' },
  period: { title: 'No payments this month', action: 'Show all months' },
  search: { title: 'No payments found', action: 'Clear search' },
};

function Empty({ kind, payments }: { kind: EmptyKind; payments: PaymentsController }) {
  const copy = {
    none: 'Payments appear here when Gmail sync finds a matching successful-payment receipt.',
    period: `No confirmed payments for ${payments.period_label}.`,
    search: 'Try a different subscription name.',
  }[kind];
  const action = { none: payments.openList, period: () => payments.chooseMonth('all'), search: () => payments.setQuery('') }[kind];
  const small = kind === 'period';
  return (
    <View style={[styles.empty, small && styles.empty_period]}>
      <View style={[styles.mascot_ring, small && styles.mascot_ring_small]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Mascot expression={kind === 'search' ? 'sad' : 'neutral'} size={SIZES.padding * (small ? 5.05 : 5.65)} label="Loop" />
      </View>
      <CustomText mt={SIZES.padding} text={EMPTY_COPY[kind].title} size={SIZES.lg} align="center" accessibility_role="header" />
      <CustomText mt={SIZES.padding / 2} text={copy} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" style={styles.empty_copy} />
      <RowView accessibilityRole="button" onPress={action} style={styles.empty_action}>
        <CustomText text={`${EMPTY_COPY[kind].action} ›`} weight={FONTS.regular} size={SIZES.sm} />
      </RowView>
    </View>
  );
}

// Account Payments tab and Detail's scoped payments: confirmed Gmail receipts only, never scheduled charges.
export default function PaymentsScreen({ route }: { route: PaymentsRoute }) {
  const payments = usePayments(route);
  const intro = `${payments.scoped ? `${payments.scoped.name} · ` : ''}Based on receipts found in Gmail.`;

  return (
    <Container tab_bar style={styles.main_view}>
      <Header title="Payments" onBack={payments.scoped ? goBack : undefined} />
      {payments.status !== 'ready' ? (
        <StateView status={payments.status === 'failed' ? 'failed' : 'loading'} message={payments.status === 'failed' ? payments.error : 'Loop is checking your payments…'} onRetry={payments.retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="scrollableAxes" contentContainerStyle={styles.content}>
          <CustomText text={intro} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} style={styles.intro} />
          {!payments.has_payments ? (
            <Empty kind="none" payments={payments} />
          ) : (
            <>
              <RowView gap={SIZES.padding / 2} align_items="flex-start" style={styles.controls}>
                <View style={styles.year}>
                  <Dropdown label="Year" value={payments.year} options={payments.years} onChange={payments.chooseYear} />
                </View>
                <View style={styles.month}>
                  <Dropdown
                    label="Month"
                    value={payments.month === 'all' ? ALL_MONTHS : MONTH_NAMES[Number(payments.month) - 1]}
                    options={MONTH_OPTIONS}
                    onChange={value => payments.chooseMonth(value === ALL_MONTHS ? 'all' : String(MONTH_NAMES.indexOf(value) + 1).padStart(2, '0'))}
                  />
                </View>
              </RowView>
              <View style={styles.summary}>
                <RowView justify_content="space-between" gap={SIZES.padding2}>
                  <CustomText text="Confirmed payments" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                  <CustomText text={payments.period_label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                </RowView>
                {payments.charts.map(chart => (
                  <CustomText
                    key={chart.currency}
                    mt={SIZES.padding / 4}
                    text={money(chart.currency, chart.amount)}
                    weight={FONTS.medium}
                    size={SIZES.h3}
                  />
                ))}
                <CustomText mt={SIZES.padding * 0.3} text={`${payments.period_count} payment${payments.period_count === 1 ? '' : 's'} · Scheduled charges aren’t included`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                {payments.charts.map(chart => (
                  <PaymentChart
                    key={chart.currency}
                    currency={chart.currency}
                    year={payments.year}
                    months={chart.months}
                    inspect={payments.inspect}
                    page_start={payments.page_start}
                    onInspect={payments.inspectMonth}
                    onPage={payments.showPage}
                  />
                ))}
              </View>
              <View style={styles.search}>
                <InputField variant="sheet" label="Search" value={payments.query} onChangeText={payments.setQuery} placeholder="Search payments" returnKeyType="search" />
              </View>
              {payments.matched.length ? (
                <>
                  <RowView justify_content="space-between" style={styles.count}>
                    <CustomText text={`${payments.matched.length} payment${payments.matched.length === 1 ? '' : 's'}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                    <CustomText text="Newest first" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                  </RowView>
                  <View style={styles.rows}>
                    {payments.matched.map((payment, index) => {
                      const logo = platform_logos[payment.platform_id];
                      const amount = money(payment.currency, Number(payment.amount).toFixed(2));
                      return (
                        <RowView
                          key={payment.id}
                          gap={SIZES.padding / 2}
                          accessibilityRole="button"
                          accessibilityLabel={`View ${payment.name} payment on ${dateLabel(payment.paid_on)}, ${spokenMoney(amount)}, confirmed`}
                          onPress={() => payments.setSelected(payment)}
                          style={[styles.row, index < payments.matched.length - 1 && styles.divider]}>
                          <View style={styles.avatar}>{logo ? <Icons name={logo} /> : <CustomText text={payment.name.charAt(0)} size={SIZES.sm} />}</View>
                          <View style={common_styles.flex_1}>
                            <CustomText text={payment.name} weight={FONTS.medium} size={SIZES.lg} />
                            <CustomText mt={SIZES.padding / 4} text={dateLabel(payment.paid_on)} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                            <CustomText mt={SIZES.padding / 4} text={sourceLabel(payment.source)} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                          </View>
                          <View style={styles.amount}>
                            <CustomText text={amount} weight={FONTS.regular} size={SIZES.sm} />
                            <CustomText mt={SIZES.padding / 4} text="Confirmed" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
                          </View>
                          <Icons name={chevron_right_icon} />
                        </RowView>
                      );
                    })}
                  </View>
                </>
              ) : (
                <Empty kind={payments.query.trim() ? 'search' : 'period'} payments={payments} />
              )}
            </>
          )}
        </ScrollView>
      )}
      {payments.selected ? <PaymentDialog payment={payments.selected} onClose={() => payments.setSelected(null)} onViewSubscription={payments.viewSubscription} /> : null}
    </Container>
  );
}
