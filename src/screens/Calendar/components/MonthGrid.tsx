import { memo, useMemo } from 'react';
import { PanResponder, Pressable, StyleSheet, View } from 'react-native';
import { Calendar, type DateData } from 'react-native-calendars';
import CustomText from '../../../components/CustomText';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { HomeEvent } from '../../../types';
import { dayMarker, WEEKDAYS } from '../../../utils/calendar';
import { common_styles } from '../../../utils/common_styles';
import { dateLabel } from '../../../utils/scan';

type Props = {
  month: string;
  today: string;
  events: HomeEvent[];
  onPressDate: (date: string) => void;
  // Horizontal swipes move months alongside the explicit arrows: -1 previous, 1 next.
  onSwipe: (direction: -1 | 1) => void;
};

// Distance-based, so a slow drag counts too; vertical drags stay with the scroll view.
const SWIPE_DISTANCE = SIZES.padding * 2.5;

// 8pt between day cells (widened from 5pt, user scoped unlock 7 November 2026).
const GAP = SIZES.padding3;

function WeekdayHeader() {
  return (
    <RowView gap={GAP} style={styles.weekdays}>
      {WEEKDAYS.map(day => (
        <CustomText key={day} text={day} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" style={styles.cell_width} />
      ))}
    </RowView>
  );
}

// react-native-calendars owns the month layout and swipe; each date renders the approved cell.
function MonthGrid({ month, today, events, onPressDate, onSwipe }: Props) {
  const pan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > SIZES.padding && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 2,
        onPanResponderRelease: (_, gesture) => {
          if (Math.abs(gesture.dx) >= SWIPE_DISTANCE) onSwipe(gesture.dx < 0 ? 1 : -1);
        },
      }),
    [onSwipe],
  );

  const renderDay = ({ date }: { date?: DateData }) => {
    if (!date) return <View style={styles.cell} />;
    const on_date = events.filter(event => event.date === date.dateString);
    const marker = dayMarker(on_date, date.dateString, today);
    const is_today = date.dateString === today;
    // Spoken like the cell: trials say trial, other events say due.
    const trials = on_date.filter(event => event.kind === 'trial_end').length;
    const due = on_date.length - trials;
    const spoken = [due ? `${due} due` : '', trials ? `${trials} trial${trials === 1 ? '' : 's'} ending` : ''].filter(Boolean).join(', ') || 'nothing due';
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${dateLabel(date.dateString)}, ${spoken}${is_today ? ', today' : ''}`}
        onPress={() => onPressDate(date.dateString)}
        style={({ pressed }) => [styles.cell, styles.day, !!marker && styles.day_event, is_today && styles.day_today, pressed && common_styles.pressed]}>
        <CustomText text={String(date.day)} weight={FONTS.regular} size={SIZES.sm} />
        <CustomText
          text={marker ? marker.label : '—'}
          weight={FONTS.regular}
          color={marker ? marker.color : COLORS.text_ghost}
          size={SIZES.xs}
          line_height={null}
          number_of_lines={1}
          fit_width
        />
      </Pressable>
    );
  };

  return (
    <View {...pan.panHandlers}>
      <Calendar key={month} current={`${month}-01`} firstDay={0} hideExtraDays customHeader={WeekdayHeader} dayComponent={renderDay} theme={THEME} />
    </View>
  );
}

export default memo(MonthGrid);

const styles = StyleSheet.create({
  weekdays: {
    marginBottom: SIZES.padding3,
  },
  cell_width: {
    flex: 1,
  },
  // 46pt so the event label clears the bottom edge (was 42pt, 7 November 2026).
  cell: {
    flex: 1,
    height: SIZES.padding * 2.3,
  },
  day: {
    backgroundColor: COLORS.surface_sunken,
    borderColor: COLORS.line_hint,
    borderRadius: SIZES.padding / 2,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding2 / 2,
    paddingVertical: SIZES.padding3 / 2,
    height: SIZES.padding * 2.5
  },
  day_event: {
    backgroundColor: COLORS.surface_accent,
    borderColor: COLORS.accent_card,
  },
  day_today: {
    backgroundColor: COLORS.accent_soft,
    borderColor: COLORS.primary,
  },
});

// Strip the library's own padding and margins; rows sit GAP apart like the prototype grid.
const THEME = {
  calendarBackground: COLORS.transparent,
  'stylesheet.calendar.main': {
    container: { paddingLeft: 0, paddingRight: 0 },
    monthView: { gap: GAP },
    week: { flexDirection: 'row', gap: GAP, justifyContent: 'space-between', marginVertical: 0 },
    dayContainer: { flex: 1 },
    emptyDayContainer: { flex: 1 },
  },
} as const;
