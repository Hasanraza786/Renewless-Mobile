import PlatformLogo from '../../components/PlatformLogo';
import { Fragment } from 'react';
import { View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import type { HomeSpending, HomeTrial } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { dateLabel } from '../../utils/scan';
import CustomText from '../CustomText';
import { styles } from './styles';
import RowView from '../RowView';
import { money } from '../../utils/money';

type Row = { key: string; name: string; platform_id?: string; amount: string; percent: number; meta: string; onPress: () => void };

function SpendRow({ row, currency }: { row: Row; currency: string }) {
  return (
    <RowView gap={SIZES.padding / 2} accessibilityRole="button" accessibilityLabel={`${row.name}, ${currency} ${row.amount} a month, ${row.percent}%`} onPress={row.onPress} style={styles.spend_row}>
      <View style={[styles.spend_avatar, !row.platform_id && styles.others_avatar]}>
        {row.platform_id ? <PlatformLogo platform_id={row.platform_id} name={row.name} /> : <CustomText text="•••" weight={FONTS.regular} size={SIZES.sm} />}
      </View>
      <View style={common_styles.flex_1}>
        <CustomText text={row.name} size={SIZES.lg} />
        <View style={styles.spend_track}>
          <View style={[styles.spend_fill, { width: `${row.percent}%` }]} />
        </View>
        <CustomText mt={SIZES.padding / 5} text={row.meta} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>
      <View style={styles.spend_value}>
        <CustomText text={money(currency, row.amount)} weight={FONTS.regular} size={SIZES.sm} align="right" />
        <CustomText mt={SIZES.padding / 5} text={`${row.percent}% ›`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="right" />
      </View>
    </RowView>
  );
}

type Props = {
  spending: HomeSpending[];
  // Home shows the top three plus Others; Spending breakdown shows every paid platform.
  all?: boolean;
  onPlatform: (platform_id: string, name: string) => void;
  onOthers?: () => void;
};

// Platform monthly-spend rows per currency, each currency with its own estimated total.
export function SpendRows({ spending, all, onPlatform, onOthers }: Props) {
  return (
    <Fragment>
      {spending.map(group => {
        const rows: Row[] = (all ? group.all_platforms : group.platforms).map(item => ({
          key: item.platform_id,
          name: item.name,
          platform_id: item.platform_id,
          amount: item.amount,
          percent: item.percent,
          meta: `${item.subscription_count} subscription${item.subscription_count === 1 ? '' : 's'}`,
          onPress: () => onPlatform(item.platform_id, item.name),
        }));
        if (!all && group.others && onOthers) rows.push({ key: 'others', name: 'Others', amount: group.others.amount, percent: group.others.percent, meta: `${group.others.platform_count} platforms`, onPress: onOthers });
        return (
          <Fragment key={group.currency}>
            <CustomText mt={SIZES.padding2} text={`${money(group.currency, group.total)} estimated/month`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            {rows.map(row => (
              <SpendRow key={row.key} row={row} currency={group.currency} />
            ))}
          </Fragment>
        );
      })}
    </Fragment>
  );
}

// Free trials sit apart from paid spend, with the price after the trial.
export function TrialRows({ trials, onPress }: { trials: HomeTrial[]; onPress: (subscription_id: string) => void }) {
  if (!trials.length) return null;
  return (
    <View style={styles.trials}>
      <CustomText mt={SIZES.padding * 0.9} text={`Free trials · ${trials.length}`} size={SIZES.lg} />
      <CustomText mt={SIZES.padding2} text="Not included in current monthly spend." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      {trials.map(item => (
        <RowView gap={SIZES.padding * 0.45} key={item.subscription_id} accessibilityRole="button" accessibilityLabel={`View ${item.name} trial`} onPress={() => onPress(item.subscription_id)} style={styles.trial_row}>
          <View style={styles.trial_avatar}>
            <PlatformLogo platform_id={item.platform_id} size={SIZES.padding * 1.05} />
          </View>
          <View style={common_styles.flex_1}>
            <CustomText text={item.name} size={SIZES.sm} />
            <CustomText mt={SIZES.padding / 4} text={`Trial ends ${dateLabel(item.end_date)}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding / 4} text={`Then ${money(item.currency, item.then_amount)} · ${item.cycle}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </View>
          <CustomText text="›" weight={FONTS.regular} size={SIZES.md} />
        </RowView>
      ))}
    </View>
  );
}
