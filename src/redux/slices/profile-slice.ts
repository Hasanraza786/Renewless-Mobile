import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile, ProfileOverview, ProfileState, RootState } from '../../types';

const initial_state: ProfileState = {
  user: null,
  loading: false,
  error: '',
  overview: null,
  overview_loading: false,
  overview_error: '',
  notice: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initial_state,
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
    setOverview(state, action: PayloadAction<ProfileOverview>) {
      state.overview = action.payload;
    },
    setOverviewLoading(state, action: PayloadAction<boolean>) {
      state.overview_loading = action.payload;
    },
    setOverviewError(state, action: PayloadAction<string>) {
      state.overview_error = action.payload;
    },
    setNotice(state, action: PayloadAction<string | null>) {
      state.notice = action.payload;
    },
    resetProfile() {
      return initial_state;
    },
  },
});

export const { setProfileUser, setProfileLoading, setProfileError, setOverview, setOverviewLoading, setOverviewError, setNotice, resetProfile } = profileSlice.actions;

export function selectUser(state: RootState) {
  return state.profile.user ?? state.constant.user;
}

export default profileSlice.reducer;
