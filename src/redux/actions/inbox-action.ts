import { toInbox } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import { requestHandler, type AppThunk } from '../request-handler';
import { setImported, setInbox, setInboxError, setInboxLoading, setSyncError } from '../slices/inbox-slice';
import { setNotice } from '../slices/profile-slice';
import { getAllSubscriptions } from './list-action';
import { getProfileOverview } from './profile-action';

// Gmail sync and reconnect need Google sign-in, which is not integrated yet.
const GMAIL_UNAVAILABLE = 'Gmail sync isn’t available yet. Your saved subscriptions are unchanged.';

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

export function syncInbox(_id: string): AppThunk {
  return async dispatch => {
    dispatch(setSyncError(GMAIL_UNAVAILABLE));
  };
}

export function reconnectInbox(_id: string): AppThunk {
  return async dispatch => {
    dispatch(setInboxError({ key: 'reconnect', value: GMAIL_UNAVAILABLE }));
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
          dispatch(setInbox(null));
          dispatch(getProfileOverview());
          dispatch(setNotice('Inbox disconnected. Your saved subscriptions stay.'));
          onDisconnected();
        },
      }),
    );
  };
}
