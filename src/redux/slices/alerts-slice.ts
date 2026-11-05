import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AlertsState, ReminderSettings, SentAlert } from '../../types';

type Key = keyof AlertsState['loading'];

const initial_state: AlertsState = {
  alerts: null,
  settings: null,
  loading: { alerts: false, settings: false, save: false },
  error: { alerts: '', settings: '', save: '' },
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: initial_state,
  reducers: {
    setAlerts(state, action: PayloadAction<SentAlert[]>) {
      state.alerts = action.payload;
    },
    setReminderSettings(state, action: PayloadAction<ReminderSettings>) {
      state.settings = action.payload;
    },
    setAlertsLoading(state, action: PayloadAction<{ key: Key; value: boolean }>) {
      state.loading[action.payload.key] = action.payload.value;
    },
    setAlertsError(state, action: PayloadAction<{ key: Key; value: string }>) {
      state.error[action.payload.key] = action.payload.value;
    },
    resetAlerts() {
      return initial_state;
    },
  },
});

export const { setAlerts, setReminderSettings, setAlertsLoading, setAlertsError, resetAlerts } = alertsSlice.actions;

export default alertsSlice.reducer;
