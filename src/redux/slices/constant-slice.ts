import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ConstantState, Profile } from '../../types';

const initial_state: ConstantState = {
  token: null,
  user: null,
  splash_seen: false,
  widget_prompt_seen: false,
  ai_consent: false,
};

const constantSlice = createSlice({
  name: 'constant',
  initialState: initial_state,
  reducers: {
    setSession(state, action: PayloadAction<{ token: string; user: Profile }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // App start: the token read back from the Keychain (null when signed out).
    restoreToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (!action.payload) state.user = null;
    },
    setUser(state, action: PayloadAction<Profile>) {
      state.user = action.payload;
    },
    clearSession(state) {
      state.token = null;
      state.user = null;
      state.ai_consent = false;
    },
    setSplashSeen(state) {
      state.splash_seen = true;
    },
    setWidgetPromptSeen(state) {
      state.widget_prompt_seen = true;
    },
    setAiConsent(state, action: PayloadAction<boolean>) {
      state.ai_consent = action.payload;
    },
  },
});

export const { setSession, restoreToken, setUser, clearSession, setSplashSeen, setWidgetPromptSeen, setAiConsent } = constantSlice.actions;

export default constantSlice.reducer;
