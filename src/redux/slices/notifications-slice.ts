import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationsState, RenewalNotice } from '../../types';

const initial_state: NotificationsState = {
  items: [],
  loading: true,
  error: '',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initial_state,
  reducers: {
    setNotifications(state, action: PayloadAction<RenewalNotice[]>) {
      state.items = action.payload;
    },
    setNotificationsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setNotificationsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetNotifications() {
      return { items: [], loading: true, error: '' };
    },
  },
});

export const {
  setNotifications,
  setNotificationsLoading,
  setNotificationsError,
  resetNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
