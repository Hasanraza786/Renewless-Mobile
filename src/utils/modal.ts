import { Platform } from 'react-native';

// iOS can't present a screen, sheet, dialog or native picker while a Modal is still fading out: the new one silently
// fails and an invisible Modal is left blocking every touch. Run fn once the fade has ended (Android has no such limit).
// shortcut: waits a fixed time for Modals that unmount instead of hiding (no onDismiss); use onDismiss where a Modal hides.
const FADE_MS = 400;
export const afterModalClose = (fn: () => void) => {
  if (Platform.OS === 'ios') setTimeout(fn, FADE_MS);
  else fn();
};
