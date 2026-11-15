import { useEffect } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { getSupportMessages, markSupportRead } from '../../redux/actions/support-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';

// Opened from a row; the list may still be loading (e.g. after an app restart on this screen).
export default function useSupportMessage(route: RouteProp<AppStackParamList, 'SupportMessage'>) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.support.messages);
  const loading = useAppSelector(state => state.support.loading);
  const message = messages?.find(item => item.id === route.params.id) ?? null;
  const unread = message?.unread ?? false;

  useEffect(() => {
    if (!messages) dispatch(getSupportMessages());
  }, [dispatch, messages]);

  useEffect(() => {
    if (unread) dispatch(markSupportRead(route.params.id));
  }, [dispatch, unread, route.params.id]);

  const missing = !message && messages !== null && !loading;
  const sendAnother = () => navigate('ContactUs', { topic: message?.topic ?? 'other' });

  return { message, missing, sendAnother };
}
