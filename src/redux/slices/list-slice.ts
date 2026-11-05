import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ListState, SubscriptionRecord } from '../../types';

const initial_state: ListState = { records: null, today: '', loading: false, error: '' };

const listSlice = createSlice({
  name: 'list',
  initialState: initial_state,
  reducers: {
    setListRecords(state, action: PayloadAction<{ records: SubscriptionRecord[]; today: string }>) {
      state.records = action.payload.records;
      state.today = action.payload.today;
    },
    setListLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setListError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetList() {
      return initial_state;
    },
  },
});

export const { setListRecords, setListLoading, setListError, resetList } = listSlice.actions;

export default listSlice.reducer;
