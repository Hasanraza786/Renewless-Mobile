import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DetailState, SubscriptionDetail, SubscriptionRecord } from '../../types';

type Key = keyof DetailState['loading'];

const initial_state: DetailState = {
  detail: null,
  removed: null,
  platform: [],
  loading: { detail: false, platform: false, mutation: false },
  error: { detail: '', platform: '', mutation: '' },
};

const detailSlice = createSlice({
  name: 'detail',
  initialState: initial_state,
  reducers: {
    setDetail(state, action: PayloadAction<SubscriptionDetail | null>) {
      state.detail = action.payload;
    },
    setRemoved(state, action: PayloadAction<DetailState['removed']>) {
      state.removed = action.payload;
    },
    setPlatformRecords(state, action: PayloadAction<SubscriptionRecord[]>) {
      state.platform = action.payload;
    },
    setDetailLoading(state, action: PayloadAction<{ key: Key; value: boolean }>) {
      state.loading[action.payload.key] = action.payload.value;
    },
    setDetailError(state, action: PayloadAction<{ key: Key; value: string }>) {
      state.error[action.payload.key] = action.payload.value;
    },
    resetDetail() {
      return initial_state;
    },
  },
});

export const { setDetail, setRemoved, setPlatformRecords, setDetailLoading, setDetailError, resetDetail } = detailSlice.actions;

export default detailSlice.reducer;
