import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthRequest, AuthState } from '../../types';

const requests: AuthRequest[] = [
  'login',
  'signup',
  'forgot',
  'otp',
  'resend',
  'reset',
  'password',
  'logout',
];

function freshAuth(): AuthState {
  return {
    loading: Object.fromEntries(requests.map(key => [key, false])) as AuthState['loading'],
    error: Object.fromEntries(requests.map(key => [key, ''])) as AuthState['error'],
  };
}

const initial_state: AuthState = freshAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState: initial_state,
  reducers: {
    setAuthLoading(state, action: PayloadAction<{ key: AuthRequest; value: boolean }>) {
      state.loading[action.payload.key] = action.payload.value;
    },
    setAuthError(state, action: PayloadAction<{ key: AuthRequest; value: string }>) {
      state.error[action.payload.key] = action.payload.value;
    },
    resetAuth() {
      return freshAuth();
    },
  },
});

export const { setAuthLoading, setAuthError, resetAuth } = authSlice.actions;

export const authLoading = (key: AuthRequest) => (value: boolean) =>
  setAuthLoading({ key, value });

export const authError = (key: AuthRequest) => (value: string) =>
  setAuthError({ key, value });

export default authSlice.reducer;
