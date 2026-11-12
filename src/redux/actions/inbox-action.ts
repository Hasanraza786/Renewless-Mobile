import { toInbox } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import { requestHandler, type AppThunk } from '../request-handler';
import { setImported, setInbox, setInboxError, setInboxLoading, setSyncError, setSyncing } from '../slices/inbox-slice';
import { setNotice } from '../slices/profile-slice';
import { getAllSubscriptions } from './list-action';
import { getProfileOverview } from './profile-action';
import { connectGmailInbox } from './gmail-action';
import { trackEvent } from '../../utils/analytics';


const flag = (key: 'inbox' | 'imported' | 'reconnect' | 'disconnect') => ({
  setLoading: (value: boolean) => setInboxLoading({ key, value }),
  setError: (value: string) => setInboxError({ key, value }),
});

// The connector plus how many subscriptions it originally imported.
async function getInboxData({ id }: { id: string }) {
  const [connector, imported] = await Promise.all([apiServices.getConnector({ id }), getAllSubscriptions({ connectorId: id })]);
  return { ...toInbox(connector), imported_count: imported.length };
}

export function getInbox(id: string): AppThunk {
  return async (dispatch, getState) => {
    if (getState().inbox.inbox?.id !== id) dispatch(setInbox(null));
    await dispatch(requestHandler({ apiService: getInboxData, param_data: { id }, ...flag('inbox'), onDone: inbox => dispatch(setInbox(inbox)) }));
  };
}

export function getImportedSubscriptions(id: string): AppThunk {
  return async dispatch => {
    dispatch(setImported(null));
    await dispatch(requestHandler({ apiService: getAllSubscriptions, param_data: { connectorId: id }, ...flag('imported'), onDone: records => dispatch(setImported(records)) }));
  };
}

const SYNC_POLL_MS = 2000;
const SYNC_FAILED = 'Couldn’t check this inbox. Try again in a moment.';

// Sync now: an incremental scan of this inbox; the screen shows Syncing until the job finishes.
export function syncInbox(id: string): AppThunk {
  return async dispatch => {
    dispatch(setSyncError(''));
    dispatch(setSyncing(true));
    const finish = (error: string) => {
      dispatch(setSyncing(false));
      dispatch(setSyncError(error));
      dispatch(getInbox(id));
    };
    const poll = (job_id: string) =>
      dispatch(
        requestHandler({
          apiService: apiServices.getScan,
          param_data: { id: job_id },
          onDone: job => {
            if (job.status === 'queued' || job.status === 'running') {
              setTimeout(() => poll(job_id), SYNC_POLL_MS);
              return;
            }
            // An expired grant marks the inbox for reconnect, which the reloaded inbox shows.
            finish(job.status === 'failed' && job.error?.code !== 'GMAIL_AUTH_EXPIRED' ? SYNC_FAILED : '');
          },
          onError: error => finish(error.message),
        }),
      );
    await dispatch(
      requestHandler({
        apiService: apiServices.startScan,
        param_data: { id, kind: 'incremental' as const },
        onDone: ({ jobId }) => poll(jobId),
        onError: error => finish(error.code === 'GMAIL_AUTH_EXPIRED' ? '' : error.message),
      }),
    );
  };
}

// Reconnect signs in to the same Google account again with Gmail access; the server keeps the inbox's history.
export function reconnectInbox(id: string): AppThunk {
  return async dispatch => {
    dispatch(setInboxLoading({ key: 'reconnect', value: true }));
    const done = () => {
      dispatch(setInboxLoading({ key: 'reconnect', value: false }));
      dispatch(getInbox(id));
    };
    // A reconnect is never over the limit (used inboxes can always come back); the notice covers a stray one.
    const onLimit = () => {
      dispatch(setNotice('You’ve used your 2 Gmail inboxes. You can reconnect an inbox you used before.'));
      done();
    };
    await dispatch(connectGmailInbox(done, onLimit, done));
  };
}

// Disconnect keeps every saved subscription; the screen closes once the server confirms.
export function disconnectInbox(id: string, onDisconnected: () => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.disconnectConnector,
        param_data: { id },
        ...flag('disconnect'),
        onDone: () => {
          trackEvent('inbox_disconnected');
          dispatch(setInbox(null));
          dispatch(getProfileOverview());
          dispatch(setNotice('Inbox disconnected. Your saved subscriptions stay.'));
          onDisconnected();
        },
      }),
    );
  };
}
