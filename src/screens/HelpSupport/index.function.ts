import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '../../navigation/service';
import { getSupportMessages } from '../../redux/actions/support-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';

// Help & support shows the 3 newest messages; View all opens the full list.
const RECENT = 3;

export default function useHelpSupport() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.support.messages);
  const [open_questions, setOpenQuestions] = useState<string[]>([]);

  // Reload on every visit, so a reply or a message just sent shows.
  useFocusEffect(
    useCallback(() => {
      dispatch(getSupportMessages());
    }, [dispatch]),
  );

  const recent = (messages ?? []).slice(0, RECENT);
  const has_more = (messages?.length ?? 0) > RECENT;
  const toggleQuestion = (question: string) =>
    setOpenQuestions(current => (current.includes(question) ? current.filter(item => item !== question) : [...current, question]));
  const openContact = () => navigate('ContactUs');
  const openAll = () => navigate('SupportMessages');
  const openMessage = (id: string) => navigate('SupportMessage', { id });

  return { recent, has_more, open_questions, toggleQuestion, openContact, openAll, openMessage };
}
