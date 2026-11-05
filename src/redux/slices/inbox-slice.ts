import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InboxDetail, InboxState, SubscriptionRecord } from '../../types';

type Key = keyof InboxState['loading'];

const initial_state: InboxState = {
  inbox: null,
  imported: null,
  syncing: false,
  sync_error: '',
  loading: { inbox: false, imported: false, reconnect: false, disconnect: false },
  error: { inbox: '', imported: '', reconnect: '', disconnect: '' },
};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState: initial_state,
  reducers: {
    setInbox(state, action: PayloadAction<InboxDetail | null>) {
      state.inbox = action.payload;
    },
    setImported(state, action: PayloadAction<SubscriptionRecord[] | null>) {
      state.imported = action.payload;
    },
    setSyncing(state, action: PayloadAction<boolean>) {
      state.syncing = action.payload;
    },
    setSyncError(state, action: PayloadAction<string>) {
      state.sync_error = action.payload;
    },
    setInboxLoading(state, action: PayloadAction<{ key: Key; value: boolean }>) {
      state.loading[action.payload.key] = action.payload.value;
    },
    setInboxError(state, action: PayloadAction<{ key: Key; value: string }>) {
      state.error[action.payload.key] = action.payload.value;
    },
    resetInbox() {
      return initial_state;
    },
  },
});

export const { setInbox, setImported, setSyncing, setSyncError, setInboxLoading, setInboxError, resetInbox } = inboxSlice.actions;

export default inboxSlice.reducer;
