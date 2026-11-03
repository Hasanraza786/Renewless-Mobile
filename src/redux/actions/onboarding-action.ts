import { connectGoogle, getScanStatus, importCandidates, startScan } from '../../api_services/onboarding';
import type { OnboardingStep } from '../../types';
import { runRequest, type AppThunk } from '../runRequest';
import { setSession } from '../slices/constant-slice';
import {
  addSaved,
  setConnectLoading,
  setConnectMessage,
  setInboxEmail,
  setSaveError,
  setSaveLoading,
  setScanFailed,
  setScanJob,
  setScanStatus,
} from '../slices/onboarding-slice';
import { setProfileUser } from '../slices/profile-slice';

const SIGN_IN_FAILED = 'We couldn’t sign you in. Try again or add subscriptions manually.';
const SIGN_IN_CANCELLED = 'Sign-in was cancelled. You can try again or add subscriptions manually.';
const GMAIL_DENIED = 'You’re signed in. Allow Gmail access to scan, or add subscriptions manually.';
const SAVE_FAILED = 'Couldn’t save your subscriptions. Please try again.';

export function startOnboardingScan(): AppThunk {
  return async dispatch => {
    try {
      const { job_id } = await startScan();
      dispatch(setScanJob(job_id));
    } catch {
      dispatch(setScanFailed('network'));
    }
  };
}

// One Google connection signs the user in and grants read-only Gmail; each result is checked on its own.
// Returns the panel to open, or null to stay on Connect with feedback.
export function connectOnboardingGoogle(): AppThunk<OnboardingStep | null> {
  return async (dispatch, getState) => {
    const result = await dispatch(
      runRequest({
        request: connectGoogle,
        loading: setConnectLoading,
        error: message => setConnectMessage(message && SIGN_IN_FAILED),
        endOnUnauthorized: false,
      }),
    );
    if (!result) return null;
    if (result.status === 'cancelled') {
      dispatch(setConnectMessage(SIGN_IN_CANCELLED));
      return null;
    }
    // An existing app session is never replaced by another inbox's identity.
    if (!getState().constant.token) {
      dispatch(setSession(result.session));
      dispatch(setProfileUser(result.session.user));
    }
    if (!result.gmail_granted) {
      dispatch(setConnectMessage(GMAIL_DENIED));
      return null;
    }
    const { inbox_email, scan_job_id, scan_status, candidates } = getState().onboarding;
    // Reconnecting the same inbox resumes its scan instead of starting a duplicate one.
    if (scan_job_id && inbox_email === result.inbox_email && (scan_status === 'running' || scan_status === 'completed')) {
      return scan_status === 'completed' && candidates.length ? 'yourSubscriptions' : 'discovering';
    }
    dispatch(setInboxEmail(result.inbox_email));
    await dispatch(startOnboardingScan());
    return 'discovering';
  };
}

export function pollOnboardingScan(): AppThunk {
  return async (dispatch, getState) => {
    const job_id = getState().onboarding.scan_job_id;
    if (!job_id) return;
    try {
      dispatch(setScanStatus(await getScanStatus(job_id)));
    } catch {
      dispatch(setScanFailed('network'));
    }
  };
}

// Imports only the selected, reviewed candidates; Ready is shown only after the import succeeds.
export function saveOnboardingFinds(): AppThunk<boolean> {
  return async (dispatch, getState) => {
    const { scan_job_id, candidates, selected_ids } = getState().onboarding;
    const saved = await dispatch(
      runRequest({
        request: () => importCandidates(scan_job_id, candidates.filter(item => selected_ids.includes(item.id))),
        loading: setSaveLoading,
        error: message => setSaveError(message && SAVE_FAILED),
        success: addSaved,
        endOnUnauthorized: false,
      }),
    );
    return !!saved;
  };
}
