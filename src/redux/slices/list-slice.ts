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
    // A saved change puts its records in place from the server's answer, so List and History show it the moment the
    // user returns, without reading every page again. A list never loaded is read in full on its first visit.
    upsertListRecords(state, action: PayloadAction<SubscriptionRecord[]>) {
      if (!state.records) return;
      for (const record of action.payload) {
        const index = state.records.findIndex(item => item.id === record.id);
        if (index >= 0) state.records[index] = record;
        else state.records.push(record);
      }
    },
    removeListRecord(state, action: PayloadAction<string>) {
      if (state.records) state.records = state.records.filter(item => item.id !== action.payload);
    },
    resetList() {
      return initial_state;
    },
  },
});

export const { setListRecords, setListLoading, setListError, upsertListRecords, removeListRecord, resetList } = listSlice.actions;

export default listSlice.reducer;
