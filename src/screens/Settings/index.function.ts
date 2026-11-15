import { navigate } from '../../navigation/service';
import { changeAiConsent } from '../../redux/actions/ai-action';
import { changeProductUpdates } from '../../redux/actions/profile-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import useProfile from '../Profile/index.function';
import { trackEvent } from '../../utils/analytics';

// Settings reuses the Profile account actions and dialogs; it adds the Product updates and AI consent switches and the widget shortcut.
export default function useSettings() {
  const profile = useProfile();
  const dispatch = useAppDispatch();
  const ai_consent = useAppSelector(state => state.constant.ai_consent);

  const ai_note = ai_consent ? 'You can turn this off at any time.' : 'AI chat will ask before you use it again.';
  const toggleAi = () => {
    trackEvent('ai_consent_changed', { enabled: String(!ai_consent) });
    dispatch(changeAiConsent(!ai_consent));
  };
  const product_updates = Boolean(profile.user?.productUpdates);
  const toggleProductUpdates = () => dispatch(changeProductUpdates(!product_updates));
  const openWidget = () => navigate('Home', { add_widget: Date.now() });
  const openDelete = () => profile.setDialog('delete');

  return { profile, product_updates, toggleProductUpdates, ai_consent, ai_note, toggleAi, openWidget, openDelete };
}
