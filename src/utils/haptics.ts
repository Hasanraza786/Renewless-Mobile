import RNHapticFeedback from 'react-native-haptic-feedback';

// Light taps for voice recording steps and a success tick after a confirmed save (design-system motion table).
export const tapHaptic = () => RNHapticFeedback.trigger('impactLight');
export const successHaptic = () => RNHapticFeedback.trigger('notificationSuccess');
