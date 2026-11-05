import { Fragment } from 'react';
import { Pressable, View } from 'react-native';
import { platform_logos } from '../../../assets/icons';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import { dateLabel } from '../../../utils/scan';
import type { HomeController } from '../index.function';
import { styles } from '../styles';

type Row = { key: string; name: string; logo?: string; amount: string; percent: number; meta: string; onPress: () => void };

function SpendRow({ row, currency }: { row: Row; currency: string }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${row.name}, ${currency} ${row.amount} a month, ${row.percent}%`} onPress={row.onPress} style={styles.spend_row}>
      {row.logo ? (
        <View style={styles.spend_avatar}>
          <Icons name={row.logo} />
        </View>
      ) : (
        <View style={[styles.spend_avatar, styles.others_avatar]}>
          <CustomText text="•••" weight={FONTS.regular} size={SIZES.sm} />
        </View>
      )}
      <View style={common_styles.flex_1}>
        <CustomText text={row.name} size={SIZES.lg} />
        <View style={styles.spend_track}>
          <View style={[styles.spend_fill, { width: `${row.percent}%` }]} />
        </View>
        <CustomText mt={SIZES.padding / 5} text={row.meta} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>
      <View style={styles.spend_value}>
        <CustomText text={`${currency} ${row.amount}`} weight={FONTS.regular} size={SIZES.sm} align="right" />
        <CustomText mt={SIZES.padding / 5} text={`${row.percent}% ›`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="right" />
      </View>
    </Pressable>
  );
}

export default function TopSpending({ home }: { home: HomeController }) {
  const { spending, trials } = home.data!;
  return (
    <View style={styles.panel}>
      <RowView justify_content="space-between">
        <CustomText text="Top spending" size={SIZES.lg} />
        <Pressable accessibilityRole="button" accessibilityLabel="View all spending" onPress={home.openSpending} style={styles.view_all}>
          <CustomText text="View all ›" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </Pressable>
      </RowView>
      <CustomText mt={SIZES.padding2} text="Estimated monthly spend" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      {spending.map(group => {
        const rows: Row[] = group.platforms.map(item => ({
          key: item.platform_id,
          name: item.name,
          logo: platform_logos[item.platform_id],
          amount: item.amount,
          percent: item.percent,
          meta: `${item.subscription_count} subscription${item.subscription_count === 1 ? '' : 's'}`,
          onPress: home.openPlatform,
        }));
        if (group.others) rows.push({ key: 'others', name: 'Others', amount: group.others.amount, percent: group.others.percent, meta: `${group.others.platform_count} platforms`, onPress: home.openSpending });
        return (
          <Fragment key={group.currency}>
            <CustomText mt={SIZES.padding2} text={`${group.currency} ${group.total} estimated/month`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            {rows.map(row => (
              <SpendRow key={row.key} row={row} currency={group.currency} />
            ))}
          </Fragment>
        );
      })}
      {trials.length ? (
        <View style={styles.trials}>
          <CustomText mt={SIZES.padding * 0.9} text={`Free trials · ${trials.length}`} size={SIZES.lg} />
          <CustomText mt={SIZES.padding2} text="Not included in current monthly spend." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {trials.map(item => (
            <Pressable key={item.subscription_id} accessibilityRole="button" accessibilityLabel={`View ${item.name} trial`} onPress={home.openDetail} style={styles.trial_row}>
              <View style={styles.trial_avatar}>
                {platform_logos[item.platform_id] ? <Icons name={platform_logos[item.platform_id]} icon_height={SIZES.padding * 1.05} icon_width={SIZES.padding * 1.05} /> : null}
              </View>
              <View style={common_styles.flex_1}>
                <CustomText text={item.name} size={SIZES.sm} />
                <CustomText mt={SIZES.padding / 4} text={`Trial ends ${dateLabel(item.end_date)}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                <CustomText mt={SIZES.padding / 4} text={`Then ${item.currency} ${item.then_amount} · ${item.cycle}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              </View>
              <CustomText text="›" weight={FONTS.regular} size={SIZES.md} />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
