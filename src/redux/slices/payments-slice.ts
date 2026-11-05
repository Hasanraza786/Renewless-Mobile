import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaymentRecord, PaymentsState } from '../../types';

const initial_state: PaymentsState = { scopes: {}, today: '', loading: false, error: '' };

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: initial_state,
  reducers: {
    setPayments(state, action: PayloadAction<{ scope: string; payments: PaymentRecord[]; today: string }>) {
      state.scopes[action.payload.scope] = action.payload.payments;
      state.today = action.payload.today;
    },
    setPaymentsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPaymentsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetPayments() {
      return initial_state;
    },
  },
});

export const { setPayments, setPaymentsLoading, setPaymentsError, resetPayments } = paymentsSlice.actions;

export default paymentsSlice.reducer;
