import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SupportMessage, SupportState } from '../../types';

const initial_state: SupportState = { messages: null, loading: false, sending: false, send_error: '' };

const supportSlice = createSlice({
  name: 'support',
  initialState: initial_state,
  reducers: {
    setSupportMessages(state, action: PayloadAction<SupportMessage[]>) {
      state.messages = action.payload;
    },
    setSupportLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSupportSending(state, action: PayloadAction<boolean>) {
      state.sending = action.payload;
    },
    setSupportSendError(state, action: PayloadAction<string>) {
      state.send_error = action.payload;
    },
    // Opening a message with a new reply marks it read here at once; the server is told in the background.
    markSupportMessageRead(state, action: PayloadAction<string>) {
      const message = state.messages?.find(item => item.id === action.payload);
      if (message) message.unread = false;
    },
    resetSupport() {
      return initial_state;
    },
  },
});

export const { setSupportMessages, setSupportLoading, setSupportSending, setSupportSendError, markSupportMessageRead, resetSupport } = supportSlice.actions;

export default supportSlice.reducer;
