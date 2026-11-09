import * as gmailService from '../../api_services/gmail';
import type { GmailScanStatus, GmailSelection, ProfileInbox } from '../../types';
import { errorMessage } from '../../utils/errors';
import type { AppThunk } from '../runRequest';
import { setNotice } from '../slices/profile-slice';
import { getDashboard } from './dashboard-action';
import { getSubscriptions } from './list-action';
import { getProfileOverview } from './profile-action';
import { successHaptic } from '../../utils/haptics';

// The scan draft lives in the Gmail screen; these thunks only call the service and report outcomes.
export function getGmailInboxes(): AppThunk<ProfileInbox[] | null> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return null;
    try {
      return await gmailService.listGmailInboxes(token);
    } catch {
      return null;
    }
  };
}

export function startGmailScan(inbox_id: string): AppThunk<string | null> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return null;
    try {
      return (await gmailService.startGmailScan(token, inbox_id)).job_id;
    } catch {
      return null;
    }
  };
}

export function getGmailScan(job_id: string): AppThunk<GmailScanStatus> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return { status: 'failed', stage: 0, candidates: [], error: 'Sign in again to continue.' };
    try {
      return await gmailService.getGmailScan(token, job_id);
    } catch (caught) {
      return { status: 'failed', stage: 0, candidates: [], error: errorMessage(caught) };
    }
  };
}

// Resolves the saved candidate IDs, or an error message the review shows while keeping the draft.
export function saveGmailResults(job_id: string, selections: GmailSelection[]): AppThunk<{ saved: string[] } | { error: string }> {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return { error: 'Sign in again to continue.' };
    try {
      const result = await gmailService.saveGmailResults(token, job_id, selections);
      dispatch(getDashboard());
      dispatch(getSubscriptions());
      dispatch(getProfileOverview());
      successHaptic();
      dispatch(setNotice('Selected subscriptions and updates saved.'));
      return result;
    } catch (caught) {
      return { error: errorMessage(caught) };
    }
  };
}
