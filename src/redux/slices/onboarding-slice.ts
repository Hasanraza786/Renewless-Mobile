import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OnboardingState } from '../../types';

const initial_state: OnboardingState = {
  google_email: '',
  google_loading: false,
  google_error: '',
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: initial_state,
  reducers: {
    setGoogleEmail(state, action: PayloadAction<string>) {
      state.google_email = action.payload;
    },
    setGoogleLoading(state, action: PayloadAction<boolean>) {
      state.google_loading = action.payload;
    },
    setGoogleError(state, action: PayloadAction<string>) {
      state.google_error = action.payload;
    },
  },
});

export const { setGoogleEmail, setGoogleLoading, setGoogleError } = onboardingSlice.actions;

export default onboardingSlice.reducer;
