import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile, ProfileState, RootState } from '../../types';

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileUser(state, action: PayloadAction<Profile | null>) {
      state.user = action.payload;
    },
    setProfileLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setProfileError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetProfile() {
      return { user: null, loading: false, error: '' };
    },
  },
});

export const { setProfileUser, setProfileLoading, setProfileError, resetProfile } =
  profileSlice.actions;

export function selectUser(state: RootState) {
  return state.profile.user ?? state.session.user;
}

export default profileSlice.reducer;
