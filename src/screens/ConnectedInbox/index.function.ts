import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { goBack, navigate } from '../../navigation/service';
import { disconnectInbox, getInbox, reconnectInbox, syncInbox } from '../../redux/actions/inbox-action';
import { setInboxError, setSyncError } from '../../redux/slices/inbox-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';

export type ConnectedInboxRoute = NativeStackScreenProps<AppStackParamList, 'ConnectedInbox'>['route'];

const STATUS = {
  synced: 'Synced',
  pending: 'Not synced yet',
  syncing: 'Syncing…',
  reconnect: 'Reconnect needed',
  error: 'Sync failed',
  paused: 'Updates paused',
} as const;

// "26 Oct · 9:00 AM" from the last successful sync, or Not synced yet.
const syncLabel = (iso: string | null) => {
  if (!iso) return 'Not synced yet';
  const date = new Date(iso);
  return `${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};

// One owned Gmail connector: real sync state from the server, Sync now / Reconnect, and disconnect.
export default function useConnectedInbox(route: ConnectedInboxRoute) {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const { inbox, syncing, sync_error, loading, error } = useAppSelector(state => state.inbox);
  const [confirm_open, setConfirmOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(setSyncError(''));
      dispatch(getInbox(id));
    }, [dispatch, id]),
  );

  const view = inbox?.id === id ? inbox : null;
  const status = view ? 'ready' : error.inbox && !loading.inbox ? 'failed' : 'loading';
  const reconnect_needed = view?.status === 'reconnect';
  // A failed attempt never shows a new successful time; the pill follows the latest attempt.
  const state: keyof typeof STATUS = syncing ? 'syncing' : reconnect_needed ? 'reconnect' : sync_error ? 'error' : view?.status === 'paused' ? 'paused' : view?.lastSync ? 'synced' : 'pending';
  // Sync runs once a week per inbox; until it opens again the button says when.
  const next_sync = view?.nextSync && new Date(view.nextSync) > new Date() ? new Date(view.nextSync).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';
  const sync_locked = !reconnect_needed && !syncing && !!next_sync;
  const main_label = reconnect_needed ? 'Reconnect Gmail' : syncing ? 'Syncing…' : sync_locked ? `Sync opens ${next_sync}` : 'Sync now';
  const sync_hint = reconnect_needed ? 'Gmail needs your permission again. Your saved subscriptions are still available.' : sync_locked ? 'You can check this inbox once a week. Renewals you track are still checked.' : 'Check this inbox for new receipts and subscription updates.';
  const status_label = STATUS[state];
  const last_sync = syncLabel(view?.lastSync ?? null);

  const retry = () => dispatch(getInbox(id));
  const openImported = () => navigate('InboxSubscriptions', { id });
  const runMain = () => (reconnect_needed ? dispatch(reconnectInbox(id)) : dispatch(syncInbox(id)));
  const openConfirm = () => {
    dispatch(setInboxError({ key: 'disconnect', value: '' }));
    setConfirmOpen(true);
  };
  const closeConfirm = () => setConfirmOpen(false);
  const onDisconnected = () => {
    setConfirmOpen(false);
    goBack();
  };
  const confirmDisconnect = () => dispatch(disconnectInbox(id, onDisconnected));

  return {
    view,
    status,
    error: error.inbox,
    state,
    status_label,
    last_sync,
    reconnect_needed,
    sync_locked,
    main_label,
    sync_hint,
    syncing,
    sync_error,
    reconnecting: loading.reconnect,
    reconnect_error: error.reconnect,
    disconnecting: loading.disconnect,
    disconnect_error: error.disconnect,
    confirm_open,
    retry,
    openImported,
    runMain,
    openConfirm,
    closeConfirm,
    confirmDisconnect,
  };
}

export type ConnectedInboxController = ReturnType<typeof useConnectedInbox>;
