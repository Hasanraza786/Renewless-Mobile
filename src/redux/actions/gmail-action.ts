import { fromGmailSelection, toGmailScan, toInbox } from '../../api_services/adapters';
import type { ApiError } from '../../api_services/http-provider';
import apiServices from '../../api_services/request-handler';
import type { GmailCandidate, GmailScanStatus, GmailSelection, ProfileInbox } from '../../types';
import { successHaptic } from '../../utils/haptics';
import { gmailSignIn } from '../../utils/social-sign-in';
import { requestHandler, type AppThunk } from '../request-handler';
import { setNotice } from '../slices/profile-slice';
import { getDashboard } from './dashboard-action';
import { getSubscriptions } from './list-action';
import { getProfileOverview } from './profile-action';

// Free limit per account; the server also counts disconnected inboxes (GMAIL_INBOX_LIMIT).
export const MAX_INBOXES = 2;
export const INBOX_LIMIT_NOTICE = 'You’ve used your 2 Gmail inboxes. You can reconnect an inbox you used before.';

const CONNECT_FAILED = 'We couldn’t connect this inbox. Please try again.';
const GMAIL_DENIED = 'Allow Gmail access to connect this inbox.';

const day = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '');

// A deleted account already read this inbox, so no first scan runs: say what that means for the user.
export function scannedBeforeNotice(inbox: ProfileInbox) {
  const from = day(inbox.lastSync);
  const opens = day(inbox.nextSync);
  return `This inbox was scanned before, so it isn’t scanned again. Add your subscriptions again.${opens ? ` Sync opens on ${opens}` : ''}${opens && from ? ` and reads mail from ${from}.` : opens ? '.' : ''}`;
}

// A failed load is not "no inbox": it shows the error and onFailed leaves, so Google never opens by mistake.
export function getGmailInboxes(onLoaded: (inboxes: ProfileInbox[]) => void, onFailed: () => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.getConnectors,
        onDone: ({ connectors }) => onLoaded(connectors.map(toInbox)),
        onError: error => {
          dispatch(setNotice(error.message));
          onFailed();
        },
      }),
    );
  };
}

// Home's empty card: the connected inbox when none can sync yet (each syncs once a week), else null, and how many inboxes
// are connected. It runs in the background, so a failure just leaves the usual Connect Gmail card.
export function getSyncLockedInbox(onLoaded: (inbox: ProfileInbox | null, inbox_count: number) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.getConnectors,
        onDone: ({ connectors }) => {
          const now = new Date();
          const inboxes = connectors.map(toInbox).filter(inbox => inbox.status === 'synced');
          const locked = inboxes.length > 0 && inboxes.every(inbox => !!inbox.nextSync && new Date(inbox.nextSync) > now);
          onLoaded(locked ? inboxes[0] : null, inboxes.length);
        },
      }),
    );
  };
}

// The first scan of an inbox reads a year; later ones read new mail (the server allows one a week).
export function startGmailScan(inbox: ProfileInbox, onStarted: (job_id: string) => void, onFailed: (error: ApiError) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.startScan,
        param_data: { id: inbox.id, kind: inbox.lastSync ? ('incremental' as const) : ('initial' as const) },
        onDone: ({ jobId }) => onStarted(jobId),
        onError: onFailed,
      }),
    );
  };
}

export function getGmailScan(job_id: string, onStatus: (status: GmailScanStatus) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.getScan,
        param_data: { id: job_id },
        onDone: job => onStatus(toGmailScan(job)),
        onError: error => onStatus({ status: 'failed', stage: 0, candidates: [], error: error.message }),
      }),
    );
  };
}

// Reviewed edits are saved on the scan first, then the selected rows are imported in one request.
async function saveReview({ job_id, chosen, selections }: { job_id: string; chosen: GmailCandidate[]; selections: GmailSelection[] }) {
  for (const item of chosen) {
    const selection = selections.find(entry => entry.id === item.id);
    if (selection) await apiServices.updateCandidate({ job_id, id: item.id, ...fromGmailSelection(item, selection) });
  }
  return apiServices.importScan({ job_id, candidate_ids: chosen.map(item => item.id) });
}

export function saveGmailResults(job_id: string, chosen: GmailCandidate[], selections: GmailSelection[], onSaved: () => void, onFailed: (message: string) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: saveReview,
        param_data: { job_id, chosen, selections },
        onDone: () => {
          dispatch(getDashboard());
          dispatch(getSubscriptions());
          dispatch(getProfileOverview());
          successHaptic();
          dispatch(setNotice('Selected subscriptions and updates saved.'));
          onSaved();
        },
        onError: error => onFailed(error.message),
      }),
    );
  };
}

// Signed in: Google with read-only Gmail adds an inbox, or reconnects one used before (same address).
// onLimit opens the inbox-limit dialog; other outcomes show a notice, then onNotConnected (also on cancel and
// for an inbox scanned before, which connects without a scan).
export function connectGmailInbox(onConnected: (inbox: ProfileInbox) => void, onLimit: () => void, onNotConnected: () => void = () => {}): AppThunk {
  return async dispatch => {
    const grant = await gmailSignIn().catch(() => undefined);
    if (grant === undefined) dispatch(setNotice(CONNECT_FAILED));
    if (!grant) {
      onNotConnected();
      return;
    }
    await dispatch(
      requestHandler({
        apiService: apiServices.googleConnect,
        param_data: grant,
        onDone: result => {
          if (!result.gmailGranted || !result.connector) {
            dispatch(setNotice(GMAIL_DENIED));
            onNotConnected();
            return;
          }
          dispatch(getProfileOverview());
          const inbox = toInbox(result.connector);
          if (result.scannedBefore) {
            dispatch(setNotice(scannedBeforeNotice(inbox)));
            onNotConnected();
            return;
          }
          onConnected(inbox);
        },
        onError: error => {
          if (error.code === 'GMAIL_INBOX_LIMIT') return onLimit();
          dispatch(setNotice(error.field_errors.serverAuthCode ? GMAIL_DENIED : CONNECT_FAILED));
          onNotConnected();
        },
      }),
    );
  };
}
