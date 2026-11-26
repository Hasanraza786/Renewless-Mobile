import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InboxProvider, OnboardingState, ScanCandidate, ScanFailure, ScanStatus } from '../../types';

const initial_state: OnboardingState = {
  connect_loading: false,
  connect_message: '',
  inbox_email: '',
  inbox_provider: 'gmail',
  connector_id: '',
  scan_job_id: '',
  scan_stages: 0,
  scan_meter: null,
  scan_status: 'idle',
  scan_failure: '',
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
    setConnectLoading(state, action: PayloadAction<boolean>) {
      state.connect_loading = action.payload;
    },
    setConnectMessage(state, action: PayloadAction<string>) {
      state.connect_message = action.payload;
    },
    setInboxConnector(state, action: PayloadAction<{ id: string; email: string; provider: InboxProvider }>) {
      state.connector_id = action.payload.id;
      state.inbox_email = action.payload.email;
      state.inbox_provider = action.payload.provider;
    },
    // A new scan discards the previous job's results and drafts; already saved records stay saved.
    setScanJob(state, action: PayloadAction<string>) {
      state.scan_job_id = action.payload;
      state.scan_stages = 0;
      state.scan_meter = null;
      state.scan_status = 'running';
      state.scan_failure = '';
      state.candidates = [];
      state.selected_ids = [];
      state.save_error = '';
    },
    setScanStatus(state, action: PayloadAction<ScanStatus>) {
      if (action.payload.job_id !== state.scan_job_id) return;
      const { job_id, phase, progress, live, messages, deep } = action.payload;
      state.scan_meter = { job_id, phase, progress, live, messages, deep };
      state.scan_stages = action.payload.completed_stages;
      state.scan_status = action.payload.status;
      state.scan_failure = action.payload.failure ?? '';
      if (action.payload.status === 'completed' && state.candidates.length === 0) {
        state.candidates = action.payload.candidates;
        state.selected_ids = action.payload.candidates.filter(item => item.selected).map(item => item.id);
      }
    },
    // Try again: Discovering must not see the old failure while the new start request is still out.
    restartScan(state) {
      state.scan_status = 'running';
      state.scan_failure = '';
    },
    setScanFailed(state, action: PayloadAction<ScanFailure>) {
      state.scan_status = 'failed';
      state.scan_failure = action.payload;
    },
    toggleCandidate(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.selected_ids = state.selected_ids.includes(id)
        ? state.selected_ids.filter(selected => selected !== id)
        : state.candidates.filter(item => item.id === id || state.selected_ids.includes(item.id)).map(item => item.id);
    },
    // Review edits stay in the draft until Save.
    updateCandidate(state, action: PayloadAction<ScanCandidate>) {
      state.candidates = state.candidates.map(item => (item.id === action.payload.id ? action.payload : item));
    },
    // Imported candidate IDs; saved records accumulate across scans and a repeat keeps the first record.
    addSaved(state, action: PayloadAction<string[]>) {
      const known = new Set(state.saved.map(item => item.id));
      state.saved.push(...state.candidates.filter(item => action.payload.includes(item.id) && !known.has(item.id)));
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
  setConnectLoading,
  setConnectMessage,
  setInboxConnector,
  setScanJob,
  setScanStatus,
  setScanFailed,
  restartScan,
  toggleCandidate,
  updateCandidate,
  addSaved,
  setSaveLoading,
  setSaveError,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
