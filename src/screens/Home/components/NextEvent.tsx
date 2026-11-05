import { Pressable, View } from 'react-native';
import { platform_logos } from '../../../assets/icons';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import SubscriptionCard from '../../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { HomeEvent } from '../../../types';
import { common_styles } from '../../../utils/common_styles';
import { eventCardProps } from '../../../utils/events';
import { dateLabel } from '../../../utils/scan';
import type { HomeController } from '../index.function';
import { styles } from '../styles';

type Props = { home: HomeController };

// Up to two same-date tabs above the card; See all (N) only when three or more share the nearest date.
function Toolbar({ events, selected, home }: { events: HomeEvent[]; selected: HomeEvent; home: HomeController }) {
  const tabs = events.slice(0, 2);
  return (
    <RowView justify_content="space-between" style={styles.toolbar}>
      <RowView style={common_styles.flex_1}>
        {tabs.map(item => {
          const active = item.id === selected.id;
          const same_platform = tabs.filter(other => other.name === item.name).length > 1 && item.plan;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item.plan ? `${item.name} · ${item.plan}` : item.name}
              onPress={() => home.selectEvent(item.id)}
              style={[styles.event_tab, active && styles.event_tab_active]}>
              {platform_logos[item.platform_id] ? <Icons name={platform_logos[item.platform_id]} icon_height={SIZES.padding * 0.8} icon_width={SIZES.padding * 0.8} /> : null}
              <CustomText text={same_platform ? item.plan! : item.name} weight={FONTS.regular} color={active ? COLORS.primary : COLORS.text_primary} size={SIZES.sm} number_of_lines={1} />
            </Pressable>
          );
        })}
      </RowView>
      {events.length > 2 ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`View all ${home.data!.upcoming_count} upcoming subscriptions`} onPress={home.openUpcoming} style={styles.see_all}>
          <CustomText text={`See all (${home.data!.upcoming_count}) ›`} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </Pressable>
      ) : null}
    </RowView>
  );
}

export default function NextEvent({ home }: Props) {
  const { data, selected } = home;
  if (!data) return null;

  if (!selected) {
    return (
      <View style={styles.event_card}>
        <CustomText text="UPCOMING" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} letter_spacing={0.5} />
        <CustomText mt={SIZES.padding2} text="No renewals or trials ending in the next 7 days." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>
    );
  }

  return (
    <View>
      {data.nearest_events.length > 1 ? <Toolbar events={data.nearest_events} selected={selected} home={home} /> : null}
      <View style={styles.event_card}>
        <RowView style={styles.top_row} justify_content="space-between">
          <CustomText text={selected.kind === 'trial_end' ? 'TRIAL ENDING' : 'NEXT RENEWAL'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} letter_spacing={0.7} />
          <CustomText text={dateLabel(selected.date)} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </RowView>
        <SubscriptionCard {...eventCardProps(selected, data.today)} chevron onPress={() => home.openDetail(selected.subscription_id)} />
      </View>
    </View>
  );
}
