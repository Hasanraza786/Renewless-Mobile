import { getGmailScan, listGmailInboxes, saveGmailResults, startGmailScan } from '../../api_services/gmail';
import type { GmailScanStatus, GmailSelection, ProfileInbox } from '../../types';
import { errorMessage } from '../../utils/errors';
import type { AppThunk } from '../runRequest';
import { setNotice } from '../slices/profile-slice';
import { loadDashboard } from './dashboard-action';
import { loadList } from './list-action';
import { loadProfileOverview } from './profile-action';

// The scan draft lives in the Gmail screen; these thunks only call the service and report outcomes.
export function fetchGmailInboxes(): AppThunk<ProfileInbox[] | null> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return null;
    try {
      return await listGmailInboxes(token);
    } catch {
      return null;
    }
  };
}

export function beginGmailScan(inbox_id: string): AppThunk<string | null> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return null;
    try {
      return (await startGmailScan(token, inbox_id)).job_id;
    } catch {
      return null;
    }
  };
}

export function readGmailScan(job_id: string): AppThunk<GmailScanStatus> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return { status: 'failed', stage: 0, candidates: [], error: 'Sign in again to continue.' };
    try {
      return await getGmailScan(token, job_id);
    } catch (caught) {
      return { status: 'failed', stage: 0, candidates: [], error: errorMessage(caught) };
    }
  };
}

// Resolves the saved candidate IDs, or an error message the review shows while keeping the draft.
export function saveGmailSelections(job_id: string, selections: GmailSelection[]): AppThunk<{ saved: string[] } | { error: string }> {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return { error: 'Sign in again to continue.' };
    try {
      const result = await saveGmailResults(token, job_id, selections);
      dispatch(loadDashboard());
      dispatch(loadList());
      dispatch(loadProfileOverview());
      dispatch(setNotice('Selected subscriptions and updates saved.'));
      return result;
    } catch (caught) {
      return { error: errorMessage(caught) };
    }
  };
}
