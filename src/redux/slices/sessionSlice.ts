import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile, SessionState } from '../../types';

const initialState: SessionState = {
  token: null,
  user: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<{ token: string; user: Profile }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setUser(state, action: PayloadAction<Profile>) {
      state.user = action.payload;
    },
    clearSession(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setSession, setUser, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
