import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { logoutUser } from '../../redux/actions/auth-action';
import { MAX_INBOXES, connectGmailInbox } from '../../redux/actions/gmail-action';
import { deleteAccount, getProfileOverview } from '../../redux/actions/profile-action';
import { selectUser, setNotice, setProfileError } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { trackEvent } from '../../utils/analytics';
import { money } from '../../utils/money';
import { PRIVACY_URL, TERMS_URL, openLegal } from '../../config/legal';
import type { ProfileInbox } from '../../types';

export const PROVIDER_LABEL = { email: 'Email', google: 'Google', apple: 'Apple' } as const;

export const initials = (name: string) =>
  name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase() || 'R';

export default function useProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { overview, delete_step, error } = useAppSelector(state => state.profile);
  const logging_out = useAppSelector(state => state.auth.loading.logout);
  const [dialog, setDialog] = useState<'logout' | 'delete' | 'inbox_limit' | null>(null);
  const [delete_text, setDeleteText] = useState('');
  // Email accounts confirm deletion with their password; Google/Apple verify in the provider sheet.
  const [delete_password, setDeletePassword] = useState('');

  // Inboxes and payment totals refresh on every visit.
  useFocusEffect(
    useCallback(() => {
      dispatch(getProfileOverview());
    }, [dispatch]),
  );

  const totals = overview?.payment_totals ?? [];
  const inbox = overview?.inboxes[0] ?? null;
  // Never synced yet is not Synced.
  const inbox_status = !inbox ? '' : inbox.status === 'reconnect' ? 'Reconnect needed' : inbox.status === 'paused' ? 'Updates paused' : inbox.lastSync ? 'Synced' : 'Not synced yet';
  // Hidden until the overview loads, so the No inbox state never flashes for a connected account.
  const inboxes_ready = !!overview;
  const payment_text = totals.length ? `${totals.map(item => money(item.currency, item.amount)).join(' · ')} confirmed` : 'Confirmed payment history';
  const deleting = !!delete_step;
  const delete_label = delete_step === 'verifying' ? 'Verifying…' : delete_step === 'deleting' ? 'Deleting…' : 'Delete account';
  const needs_password = user?.provider === 'email';
  const delete_ready = delete_text.trim() === 'DELETE' && (!needs_password || !!delete_password);
  // A wrong password says so; other failures keep the general message.
  const delete_error = !error ? '' : needs_password ? error : 'We couldn’t delete your account. Please try again.';
  const provider_name = user?.provider === 'apple' ? 'Apple' : 'Google';

  const notice = (text: string) => dispatch(setNotice(text));

  const closeDialog = () => {
    setDialog(null);
    setDeleteText('');
    setDeletePassword('');
    dispatch(setProfileError(''));
  };

  const openEdit = () => navigate('EditProfile');
  // The list leaves out disconnected inboxes, so the server's GMAIL_INBOX_LIMIT also opens the dialog.
  const onInboxConnected = (connected: ProfileInbox) => navigate('GmailScan', { inbox_id: connected.id });
  const openInboxLimit = () => setDialog('inbox_limit');
  const openConnect = () => {
    trackEvent('gmail_connect_tapped', { from: 'profile' });
    if ((overview?.inboxes.length ?? 0) >= MAX_INBOXES) openInboxLimit();
    else dispatch(connectGmailInbox(onInboxConnected, openInboxLimit));
  };
  const openInbox = () => inbox && navigate('ConnectedInbox', { id: inbox.id });
  const openHistory = () => navigate('History');
  const openPayments = () => navigate('Payments');
  const openReminders = () => navigate('ReminderSettings');
  const openSettings = () => navigate('Settings');
  const openChangePassword = () => navigate('ChangePassword');
  const showProvider = () => notice(`You sign in with ${provider_name}. Manage your password through your ${provider_name} account.`);
  const showSupport = () => notice('Support is currently unavailable. Please try again later.');
  // Settings › How we use your data and Privacy Policy open the privacy page; Terms of Service the terms page.
  const openPrivacy = () => openLegal(PRIVACY_URL);
  const openTerms = () => openLegal(TERMS_URL);

  // Logout and deletion end the session, which returns to Login.
  const confirmLogout = () => {
    setDialog(null);
    dispatch(logoutUser());
  };

  const confirmDelete = () => {
    if (!delete_ready || !user) return;
    dispatch(deleteAccount(user.provider, delete_password));
  };

  return {
    user,
    inbox,
    inbox_status,
    inboxes_ready,
    payment_text,
    dialog,
    setDialog,
    closeDialog,
    delete_text,
    setDeleteText,
    delete_password,
    setDeletePassword,
    needs_password,
    delete_ready,
    deleting,
    delete_label,
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
    openPrivacy,
    openTerms,
    confirmLogout,
    confirmDelete,
  };
}

export type ProfileController = ReturnType<typeof useProfile>;
