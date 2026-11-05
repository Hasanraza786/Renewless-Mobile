import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CalendarMonth, CalendarState } from '../../types';

const initial_state: CalendarState = { months: {}, loading: false, error: '' };

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initial_state,
  reducers: {
    // Keyed by month, so a late response for another month never replaces the one on screen.
    setCalendarMonth(state, action: PayloadAction<CalendarMonth>) {
      state.months[action.payload.month] = action.payload;
    },
    setCalendarLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCalendarError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetCalendar() {
      return initial_state;
    },
  },
});

export const { setCalendarMonth, setCalendarLoading, setCalendarError, resetCalendar } = calendarSlice.actions;

export default calendarSlice.reducer;
