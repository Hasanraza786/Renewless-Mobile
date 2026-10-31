import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardData, DashboardState } from '../../types';

const initial_state: DashboardState = {
  data: null,
  loading: true,
  error: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initial_state,
  reducers: {
    setDashboardData(state, action: PayloadAction<DashboardData>) {
      state.data = action.payload;
    },
    setDashboardLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDashboardError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetDashboard() {
      return { data: null, loading: true, error: '' };
    },
  },
});

export const { setDashboardData, setDashboardLoading, setDashboardError, resetDashboard } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
