import { navigate } from '../../navigation/service';
import { setAiConsent } from '../../redux/slices/constant-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import useProfile from '../Profile/index.function';
import { trackEvent } from '../../utils/analytics';

// Settings reuses the Profile account actions and dialogs; it adds the AI consent switch and the widget shortcut.
export default function useSettings() {
  const profile = useProfile();
  const dispatch = useAppDispatch();
  const ai_consent = useAppSelector(state => state.constant.ai_consent);

  const ai_note = ai_consent ? 'You can turn this off at any time.' : 'AI chat will ask before you use it again.';
  const toggleAi = () => {
    trackEvent('ai_consent_changed', { enabled: String(!ai_consent) });
    dispatch(setAiConsent(!ai_consent));
  };
  const openWidget = () => navigate('Home', { add_widget: Date.now() });
  const openDelete = () => profile.setDialog('delete');

  return { profile, ai_consent, ai_note, toggleAi, openWidget, openDelete };
}
