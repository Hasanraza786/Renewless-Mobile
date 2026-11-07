import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ConstantState, Profile } from '../../types';

const initial_state: ConstantState = {
  token: null,
  user: null,
  splash_seen: false,
  widget_prompt_seen: false,
};

const constantSlice = createSlice({
  name: 'constant',
  initialState: initial_state,
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
    setSplashSeen(state) {
      state.splash_seen = true;
    },
    setWidgetPromptSeen(state) {
      state.widget_prompt_seen = true;
    },
  },
});

export const { setSession, setUser, clearSession, setSplashSeen, setWidgetPromptSeen } = constantSlice.actions;

export default constantSlice.reducer;
