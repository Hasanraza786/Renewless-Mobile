import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OnboardingState, ScanCandidate, ScanStatus } from '../../types';

const initial_state: OnboardingState = {
  google_email: '',
  google_loading: false,
  google_error: '',
  scan_job_id: '',
  scan_stages: 0,
  scan_status: 'idle',
  scan_error: '',
  candidates: [],
  selected_ids: [],
  saved: [],
  save_loading: false,
  save_error: '',
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
    // A new scan discards the previous job's results and selection.
    setScanJob(state, action: PayloadAction<string>) {
      state.scan_job_id = action.payload;
      state.scan_stages = 0;
      state.scan_status = 'running';
      state.scan_error = '';
      state.candidates = [];
      state.selected_ids = [];
      state.saved = [];
    },
    setScanStatus(state, action: PayloadAction<ScanStatus>) {
      if (action.payload.job_id !== state.scan_job_id) return;
      state.scan_stages = action.payload.completed_stages;
      state.scan_status = action.payload.status;
      if (action.payload.status === 'completed' && state.candidates.length === 0) {
        state.candidates = action.payload.candidates;
        state.selected_ids = action.payload.candidates.map(item => item.id);
      }
    },
    setScanFailed(state, action: PayloadAction<string>) {
      state.scan_status = 'failed';
      state.scan_error = action.payload;
    },
    toggleCandidate(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.selected_ids = state.selected_ids.includes(id)
        ? state.selected_ids.filter(selected => selected !== id)
        : state.candidates.filter(item => item.id === id || state.selected_ids.includes(item.id)).map(item => item.id);
    },
    setSaved(state, action: PayloadAction<ScanCandidate[]>) {
      state.saved = action.payload;
    },
    setSaveLoading(state, action: PayloadAction<boolean>) {
      state.save_loading = action.payload;
    },
    setSaveError(state, action: PayloadAction<string>) {
      state.save_error = action.payload;
    },
  },
});

export const {
  setGoogleEmail,
  setGoogleLoading,
  setGoogleError,
  setScanJob,
  setScanStatus,
  setScanFailed,
  toggleCandidate,
  setSaved,
  setSaveLoading,
  setSaveError,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
