import { fromScanCandidate, toInbox, toProfile, toScanCandidate, toScanStatus } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import type { ScanCandidate } from '../../types';
import { gmailSignIn, type GmailGrant } from '../../utils/social-sign-in';
import { requestHandler, type AppThunk } from '../request-handler';
import {
  addSaved,
  setConnectLoading,
  setConnectMessage,
  setInboxConnector,
  setSaveError,
  setSaveLoading,
  setScanFailed,
  setScanJob,
  setScanStatus,
  updateCandidate,
} from '../slices/onboarding-slice';
import { setNotice, setProfileUser } from '../slices/profile-slice';
import { scannedBeforeNotice } from './gmail-action';
import { beginSession } from './auth-action';

const SIGN_IN_FAILED = 'We couldn’t sign you in. Try again or add subscriptions manually.';
const SIGN_IN_CANCELLED = 'Sign-in was cancelled. You can try again or add subscriptions manually.';
const GMAIL_DENIED = 'You’re signed in. Allow Gmail access to scan, or add subscriptions manually.';
const SAVE_FAILED = 'Couldn’t save your subscriptions. Please try again.';

// The first scan of an inbox reads a year of receipts. An inbox this account synced this week answers SYNC_LIMIT:
// that is not a failure, so onSyncLimit ends onboarding with the server's message.
export function startOnboardingScan(connector_id: string, onSyncLimit: () => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.startScan,
        param_data: { id: connector_id, kind: 'initial' as const },
        onDone: ({ jobId }) => dispatch(setScanJob(jobId)),
        onError: error => {
          if (error.code !== 'SYNC_LIMIT') {
            dispatch(setScanFailed(error.code === 'GMAIL_AUTH_EXPIRED' ? 'access' : 'network'));
            return;
          }
          dispatch(setNotice(error.message));
          onSyncLimit();
        },
      }),
    );
  };
}

// One Google connection signs the user in (when signed out) and grants read-only Gmail; each is checked on its own.
// onDiscovering opens the scan panel; staying on Connect shows the message instead. An inbox scanned before
// (by a deleted account, or synced this week) connects without a scan: onScannedBefore ends onboarding with a notice.
export function connectOnboardingGoogle(onDiscovering: () => void, onScannedBefore: () => void): AppThunk {
  return async dispatch => {
    dispatch(setConnectMessage(''));
    let grant: GmailGrant | null;
    try {
      grant = await gmailSignIn();
    } catch {
      dispatch(setConnectMessage(SIGN_IN_FAILED));
      return;
    }
    if (!grant) {
      dispatch(setConnectMessage(SIGN_IN_CANCELLED));
      return;
    }
    await dispatch(
      requestHandler({
        apiService: apiServices.googleConnect,
        param_data: grant,
        setLoading: setConnectLoading,
        endOnUnauthorized: false,
        onDone: async result => {
          // An existing app session is never replaced by another inbox's identity.
          if (result.token) await dispatch(beginSession({ token: result.token, user: result.user }));
          else dispatch(setProfileUser(toProfile(result.user)));
          if (!result.gmailGranted || !result.connector) {
            dispatch(setConnectMessage(GMAIL_DENIED));
            return;
          }
          if (result.scannedBefore) {
            dispatch(setNotice(scannedBeforeNotice(toInbox(result.connector))));
            onScannedBefore();
            return;
          }
          dispatch(setInboxConnector({ id: result.connector.id, email: result.connector.email }));
          let ended = false;
          await dispatch(
            startOnboardingScan(result.connector.id, () => {
              ended = true;
              onScannedBefore();
            }),
          );
          if (!ended) onDiscovering();
        },
        onError: error => dispatch(setConnectMessage(error.field_errors.serverAuthCode ? GMAIL_DENIED : error.code === 'GMAIL_INBOX_LIMIT' ? error.message : SIGN_IN_FAILED)),
      }),
    );
  };
}

// A status check that can't reach the server doesn't end the scan: only 3 in a row do. The job keeps running on
// the server, so a retry after that checks it again instead of starting (and paying for) a new scan.
const POLL_FAILURES = 3;
let poll_failures = 0;
let lost_job = '';

export function getOnboardingScan(job_id: string): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.getScan,
        param_data: { id: job_id },
        onDone: job => {
          poll_failures = 0;
          dispatch(setScanStatus(toScanStatus(job)));
        },
        onError: () => {
          poll_failures += 1;
          if (poll_failures < POLL_FAILURES) return;
          poll_failures = 0;
          lost_job = job_id;
          dispatch(setScanFailed('network'));
        },
      }),
    );
  };
}

// Retry on Interrupted: the job we lost contact with is checked again; a job the server itself failed starts anew.
export function retryOnboardingScan(connector_id: string, job_id: string, onSyncLimit: () => void): AppThunk {
  return async dispatch => {
    if (job_id && job_id === lost_job) {
      lost_job = '';
      dispatch(setScanJob(job_id));
      return;
    }
    await dispatch(startOnboardingScan(connector_id, onSyncLimit));
  };
}

// A review edit is saved on the scan (not yet as a subscription); onSaved closes the sheet.
// onFailed gets the server's message so the open sheet can show it (a toast would sit behind the sheet).
export function editOnboardingCandidate(job_id: string, item: ScanCandidate, onSaved: () => void, onFailed: (message: string) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.updateCandidate,
        param_data: { job_id, id: item.id, ...fromScanCandidate(item) },
        onDone: candidate => {
          const updated = toScanCandidate(candidate);
          if (updated) dispatch(updateCandidate({ ...updated, selected: item.selected }));
          onSaved();
        },
        onError: error => onFailed(error.field_errors.price ?? error.field_errors['price.amount'] ?? error.message),
      }),
    );
  };
}

// Imports only the selected, reviewed candidates; Ready opens only after the import succeeds.
export function saveOnboardingFinds(job_id: string, candidate_ids: string[], onSaved: () => void): AppThunk {
  return async dispatch => {
    // A new attempt starts clean, so a later Back to the review never shows an old failure.
    dispatch(setSaveError(''));
    await dispatch(
      requestHandler({
        apiService: apiServices.importScan,
        param_data: { job_id, candidate_ids },
        setLoading: setSaveLoading,
        onDone: () => {
          dispatch(addSaved(candidate_ids));
          onSaved();
        },
        onError: () => dispatch(setSaveError(SAVE_FAILED)),
      }),
    );
  };
}

// Onboarding ends on the dashboard; the server stops offering it again.
export function finishOnboarding(onDone: () => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.completeOnboarding,
        onDone: ({ user }) => {
          dispatch(setProfileUser(toProfile(user)));
          onDone();
        },
        // The dashboard opens either way; the flag is retried at the next finish.
        onError: onDone,
      }),
    );
  };
}
