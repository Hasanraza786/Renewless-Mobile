import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { logoutUser } from '../../redux/actions/auth-action';
import { deleteAccount, getProfileOverview } from '../../redux/actions/profile-action';
import { selectUser, setNotice, setProfileError } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

// Settings › How we use your data, Privacy Policy and Terms: the pages don't exist yet, so retrying can't help.
const UNAVAILABLE = 'This page isn’t available yet.';
const UNAVAILABLE_GMAIL = 'Gmail connection is unavailable right now. Your saved subscriptions are unchanged.';

export const PROVIDER_LABEL = { email: 'Email', google: 'Google', apple: 'Apple' } as const;

export const initials = (name: string) =>
  name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase() || 'R';

export default function useProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { overview, loading, error } = useAppSelector(state => state.profile);
  const logging_out = useAppSelector(state => state.auth.loading.logout);
  const [dialog, setDialog] = useState<'logout' | 'delete' | null>(null);
  const [delete_text, setDeleteText] = useState('');

  // Inboxes and payment totals refresh on every visit.
  useFocusEffect(
    useCallback(() => {
      dispatch(getProfileOverview());
    }, [dispatch]),
  );

  const totals = overview?.payment_totals ?? [];
  const inbox = overview?.inboxes[0] ?? null;
  // Hidden until the overview loads, so the No inbox state never flashes for a connected account.
  const inboxes_ready = !!overview;
  const payment_text = totals.length ? `${totals.map(item => `${item.currency} ${item.amount}`).join(' · ')} confirmed` : 'Confirmed payment history';
  const deleting = loading;
  const delete_error = error ? 'We couldn’t delete your account. Please try again.' : '';
  const provider_name = user?.provider === 'apple' ? 'Apple' : 'Google';

  const notice = (text: string) => dispatch(setNotice(text));

  const closeDialog = () => {
    setDialog(null);
    setDeleteText('');
    dispatch(setProfileError(''));
  };

  const openEdit = () => navigate('EditProfile');
  // Connecting a new inbox needs Google consent, which is not integrated yet.
  const openConnect = () => notice(UNAVAILABLE_GMAIL);
  const openInbox = () => inbox && navigate('ConnectedInbox', { id: inbox.id });
  const openHistory = () => navigate('History');
  const openPayments = () => navigate('Payments');
  const openReminders = () => navigate('ReminderSettings');
  const openSettings = () => navigate('Settings');
  const openChangePassword = () => navigate('ChangePassword');
  const showProvider = () => notice(`You sign in with ${provider_name}. Manage your password through your ${provider_name} account.`);
  const showSupport = () => notice('Support is currently unavailable. Please try again later.');
  const showUnavailable = () => notice(UNAVAILABLE);

  // Logout and deletion end the session, which returns to Login.
  const confirmLogout = () => {
    setDialog(null);
    dispatch(logoutUser());
  };

  // shortcut: the approved dialog collects "DELETE", but the backend asks for the account password; this sends the typed text until the dialog is updated.
  const confirmDelete = () => {
    if (delete_text.trim() !== 'DELETE') return;
    dispatch(deleteAccount(delete_text.trim()));
  };

  return {
    user,
    inbox,
    inboxes_ready,
    payment_text,
    dialog,
    setDialog,
    closeDialog,
    delete_text,
    setDeleteText,
    deleting,
    delete_error,
    logging_out,
    openEdit,
    openConnect,
    openInbox,
    openHistory,
    openPayments,
    openReminders,
    openSettings,
    openChangePassword,
    showProvider,
    showSupport,
    showUnavailable,
    confirmLogout,
    confirmDelete,
  };
}

export type ProfileController = ReturnType<typeof useProfile>;
