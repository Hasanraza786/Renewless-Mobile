import { useRef, type ComponentRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { chevron_down_icon } from '../../assets/icons';
import AddSheet from '../../components/AddSheet';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import InfoTooltip from '../../components/InfoTooltip';
import RowView from '../../components/RowView';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { monthTitle } from '../../utils/calendar';
import { common_styles } from '../../utils/common_styles';
import { eventCardProps } from '../../utils/events';
import { dateLabel } from '../../utils/scan';
import MonthGrid from './components/MonthGrid';
import MonthPicker from './components/MonthPicker';
import useCalendar from './index.function';
import { styles } from './styles';

const LEGEND = [
  { label: 'Due today', color: COLORS.due_today },
  { label: 'Upcoming', color: COLORS.renewing_soon },
  { label: 'Trial ending', color: COLORS.trial },
];

// Mint wash fading into the card surface, top-left to bottom-right.
function SummaryWash() {
  return (
    <Svg style={StyleSheet.absoluteFill} preserveAspectRatio="none">
      <Defs>
        <LinearGradient id="calendar_wash" x1="0" y1="0" x2="1" y2="0.7">
          {/* SVG stops ignore hex alpha; the prototype wash is mint at 7% opacity. */}
          <Stop offset="0" stopColor={COLORS.primary} stopOpacity={0.07} />
          <Stop offset="1" stopColor={COLORS.card} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#calendar_wash)" />
    </Svg>
  );
}

// Calendar tab: month controls, expected charges, the date grid, legend and the nearest event. No inline day list.
export default function CalendarScreen() {
  const calendar = useCalendar();
  const heading_ref = useRef<ComponentRef<typeof View>>(null);
  const nearest = calendar.nearest;

  const openPicker = () => heading_ref.current?.measureInWindow((x, y, _width, height) => calendar.openPicker({ x, y, height }));

  return (
    <Container tab_bar style={styles.main_view}>
      <Header title="Calendar" onAdd={calendar.openAdd} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentInsetAdjustmentBehavior="scrollableAxes" contentContainerStyle={styles.content}>
        <RowView gap={SIZES.padding * 0.35} style={styles.nav}>
          <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Previous month" onPress={calendar.showPrevious} style={styles.nav_button}>
            <CustomText text="‹" weight={FONTS.regular} size={SIZES.h3} line_height={null} />
          </RowView>
          <View ref={heading_ref} collapsable={false} style={common_styles.flex_1}>
            <RowView justify_content="space-between" accessibilityRole="button" accessibilityLabel={`Choose month and year, ${monthTitle(calendar.month)}`} onPress={openPicker} style={styles.heading}>
              <CustomText text={monthTitle(calendar.month)} weight={FONTS.medium} size={SIZES.sm} />
              <Icons name={chevron_down_icon} />
            </RowView>
          </View>
          <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Next month" onPress={calendar.showNext} style={styles.nav_button}>
            <CustomText text="›" weight={FONTS.regular} size={SIZES.h3} line_height={null} />
          </RowView>
          <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Today" onPress={calendar.showToday} style={[styles.nav_button, styles.today_button]}>
            <CustomText text="Today" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
          </RowView>
        </RowView>

        {calendar.status !== 'ready' ? (
          <StateView status={calendar.status === 'failed' ? 'failed' : 'loading'} message={calendar.status === 'failed' ? calendar.error : 'Loading calendar.'} onRetry={calendar.retry} />
        ) : (
          <>
            <RowView gap={SIZES.padding2} style={styles.summary}>
              <SummaryWash />
              <View style={common_styles.flex_1}>
                <InfoTooltip
                  label="Expected this month"
                  paragraphs={[
                    'Expected charges scheduled for the selected month, including projected renewals. This is not a total of payments already made.',
                    'Amounts in different currencies are shown separately. Records without renewal dates are excluded; estimated dates and future charges may change.',
                  ]}
                />
                <CustomText mt={SIZES.padding / 4} text={calendar.expected_text} weight={FONTS.medium} size={SIZES.h3} letter_spacing={-0.6} />
              </View>
              <View style={styles.count}>
                <CustomText text={String(calendar.event_count)} weight={FONTS.medium} color={COLORS.primary} size={SIZES.h3} letter_spacing={-0.6} />
                <CustomText mt={SIZES.padding / 5} text={calendar.event_count === 1 ? 'event' : 'events'} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              </View>
            </RowView>

            <View style={styles.board} accessibilityLabel={`${monthTitle(calendar.month)} renewal calendar`}>
              <MonthGrid month={calendar.month} today={calendar.today} events={calendar.events} onPressDate={calendar.pressDate} onSwipe={calendar.swipeMonth} />
            </View>

            <RowView gap={SIZES.padding * 0.45} style={styles.legend}>
              {LEGEND.map(item => (
                <RowView key={item.label} gap={SIZES.padding / 4}>
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  <CustomText text={item.label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                </RowView>
              ))}
              <RowView gap={SIZES.padding / 4}>
                <View style={styles.today_mark} />
                <CustomText text="Today" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              </RowView>
            </RowView>

            <View style={styles.next}>
              <RowView justify_content="space-between">
                <CustomText text={nearest ? nearest.heading : 'All clear'} size={SIZES.lg} accessibility_role="header" />
                {nearest ? <CustomText text={dateLabel(nearest.event.date)} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} /> : null}
              </RowView>
              {nearest ? (
                <View style={styles.next_card}>
                  <SubscriptionCard {...eventCardProps(nearest.event, calendar.today)} onPress={() => calendar.openDetail(nearest.event.subscription_id)} />
                </View>
              ) : (
                <CustomText mt={SIZES.padding / 2} text="No upcoming renewals in this month." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} style={styles.all_clear} />
              )}
            </View>
          </>
        )}
      </ScrollView>
      <AddSheet visible={calendar.add_open} onClose={calendar.closeAdd} />
      {calendar.picker_anchor ? <MonthPicker month={calendar.month} anchor={calendar.picker_anchor} onClose={calendar.closePicker} onShow={calendar.showMonth} /> : null}
    </Container>
  );
}
