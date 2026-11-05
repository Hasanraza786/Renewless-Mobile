import { disconnectInbox, getInbox, listInboxSubscriptions, reconnectInbox, syncInbox } from '../../api_services/inbox';
import { runRequest, type AppThunk } from '../runRequest';
import { setImported, setInbox, setInboxError, setInboxLoading, setSyncError, setSyncing } from '../slices/inbox-slice';
import { setNotice } from '../slices/profile-slice';
import { loadDashboard } from './dashboard-action';
import { loadList } from './list-action';
import { loadProfileOverview } from './profile-action';

const flag = (key: 'inbox' | 'imported' | 'reconnect' | 'disconnect') => ({
  loading: (value: boolean) => setInboxLoading({ key, value }),
  error: (value: string) => setInboxError({ key, value }),
});

export function loadInbox(id: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    if (getState().inbox.inbox?.id !== id) dispatch(setInbox(null));
    await dispatch(runRequest({ request: () => getInbox(token, id), ...flag('inbox'), success: setInbox }));
  };
}

export function loadImported(id: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    dispatch(setImported(null));
    await dispatch(runRequest({ request: () => listInboxSubscriptions(token, id), ...flag('imported'), success: setImported }));
  };
}

// One job at a time: a second tap while syncing is ignored. Failure keeps saved data and shows its own copy.
export function syncNow(id: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token || getState().inbox.syncing) return;
    const result = await dispatch(runRequest({ request: () => syncInbox(token, id), loading: setSyncing, error: setSyncError, success: setInbox }));
    if (result) {
      dispatch(loadDashboard());
      dispatch(loadList());
      dispatch(loadProfileOverview());
    }
  };
}

export function reconnect(id: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    const result = await dispatch(runRequest({ request: () => reconnectInbox(token, id), ...flag('reconnect'), success: setInbox }));
    if (result) dispatch(loadProfileOverview());
  };
}

// Resolves true once the server disconnected the inbox; saved subscriptions stay.
export function disconnect(id: string): AppThunk<boolean> {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return false;
    const result = await dispatch(runRequest({ request: () => disconnectInbox(token, id), ...flag('disconnect') }));
    if (!result) return false;
    dispatch(setInbox(null));
    dispatch(loadProfileOverview());
    dispatch(setNotice('Inbox disconnected. Your saved subscriptions stay.'));
    return true;
  };
}
