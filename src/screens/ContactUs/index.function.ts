import { useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { goBack } from '../../navigation/service';
import { sendSupportMessage } from '../../redux/actions/support-action';
import { setSupportSendError } from '../../redux/slices/support-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, SupportTopic } from '../../types';
import { SUPPORT_MESSAGE_MAX, SUPPORT_MESSAGE_MIN, SUPPORT_TOPIC_LABELS } from '../../utils/support';

export const TOPIC_OPTIONS = Object.values(SUPPORT_TOPIC_LABELS);
const topicOf = (label: string) => (Object.keys(SUPPORT_TOPIC_LABELS) as SupportTopic[]).find(key => SUPPORT_TOPIC_LABELS[key] === label) ?? 'other';

// Topic starts on Something else (or the topic of the message Send another message came from).
export default function useContactUs(route: RouteProp<AppStackParamList, 'ContactUs'>) {
  const dispatch = useAppDispatch();
  const email = useAppSelector(state => state.constant.user?.email ?? '');
  const sending = useAppSelector(state => state.support.sending);
  const request_error = useAppSelector(state => state.support.send_error);
  const [form_data, setFormData] = useState({ topic: SUPPORT_TOPIC_LABELS[route.params?.topic ?? 'other'], message: '' });
  const [message_error, setMessageError] = useState('');

  // A failed send from an earlier visit never shows on a fresh form.
  useEffect(() => {
    dispatch(setSupportSendError(''));
  }, [dispatch]);

  const counter = `${form_data.message.length} / ${SUPPORT_MESSAGE_MAX}`;
  const setTopic = (topic: string) => setFormData(current => ({ ...current, topic }));
  const setMessage = (message: string) => {
    setFormData(current => ({ ...current, message }));
    if (message_error && message.trim().length >= SUPPORT_MESSAGE_MIN) setMessageError('');
  };

  const onSubmit = () => {
    if (sending) return;
    const message = form_data.message.trim();
    const error = !message ? 'Write your message.' : message.length < SUPPORT_MESSAGE_MIN ? `Write at least ${SUPPORT_MESSAGE_MIN} characters.` : '';
    setMessageError(error);
    if (error) return;
    dispatch(sendSupportMessage({ topic: topicOf(form_data.topic), message }, goBack));
  };

  return { email, sending, request_error, form_data, message_error, counter, setTopic, setMessage, onSubmit };
}
