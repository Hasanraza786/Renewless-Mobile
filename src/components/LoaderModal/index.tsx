import { useRef } from 'react';
import { Modal, View } from 'react-native';
import { useAppSelector } from '../../redux/store';
import type { RootState } from '../../types';
import Mascot from '../Mascot';
import CustomText from '../CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { styles } from './styles';

// What Loop is doing while a save or sign-in request is in flight; null when nothing is.
// First loads keep their own skeleton or StateView.
const busyMessage = (state: RootState): string | null => {
  const auth = state.auth.loading;
  if (auth.login) return 'Loop is signing you in…';
  if (auth.signup) return 'Loop is creating your account…';
  if (auth.otp) return 'Loop is checking your code…';
  if (auth.forgot) return 'Loop is sending your code…';
  if (auth.reset || auth.password) return 'Loop is updating your password…';
  if (auth.logout) return 'Loop is signing you out…';
  if (state.alerts.loading.save) return 'Loop is saving your reminder settings…';
  if (state.detail.loading.mutation || state.profile.loading) return 'Loop is saving your changes…';
  return null;
};

// App-wide saving overlay with the animated Loop mascot; a Modal so it also covers open sheets and dialogs.
export default function LoaderModal() {
  const message = useAppSelector(busyMessage);
  // Keep the last message while the overlay fades out.
  const shown = useRef('');
  if (message) shown.current = message;
  return (
    <Modal transparent visible={!!message} animationType="fade" statusBarTranslucent>
      <View accessible accessibilityViewIsModal accessibilityRole="progressbar" accessibilityLabel={shown.current} style={styles.main_view}>
        <Mascot loop expression="neutral" size={SIZES.padding * 4} label={shown.current} />
        <CustomText text={shown.current} weight={FONTS.regular} color={COLORS.text_primary} size={SIZES.md} align="center" />
      </View>
    </Modal>
  );
}
