import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { navigate, resetRoot } from '../../navigation/service';
import { logout } from '../../redux/actions/auth-action';
import { deleteAccount, loadProfileOverview } from '../../redux/actions/profile-action';
import { selectUser, setNotice, setProfileError } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const UNAVAILABLE = 'This page is currently unavailable. Please try again later.';
const UNAVAILABLE_GMAIL = 'Gmail connection is unavailable right now. Your saved subscriptions are unchanged.';

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
      dispatch(loadProfileOverview());
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
  const openChangePassword = () => navigate('ChangePassword');
  const showProvider = () => notice(`You sign in with ${provider_name}. Manage your password through your ${provider_name} account.`);
  const showSupport = () => notice('Support is currently unavailable. Please try again later.');
  const showUnavailable = () => notice(UNAVAILABLE);

  const confirmLogout = async () => {
    await dispatch(logout());
    setDialog(null);
    resetRoot([{ name: 'AuthStack' }]);
  };

  const confirmDelete = async () => {
    if (delete_text.trim() !== 'DELETE') return;
    if (!(await dispatch(deleteAccount()))) return;
    setDialog(null);
    resetRoot([{ name: 'AuthStack' }]);
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
    openChangePassword,
    showProvider,
    showSupport,
    showUnavailable,
    confirmLogout,
    confirmDelete,
  };
}

export type ProfileController = ReturnType<typeof useProfile>;
