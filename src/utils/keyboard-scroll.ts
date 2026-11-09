import { useEffect, useRef, type ComponentRef } from 'react';
import { Keyboard, ScrollView, TextInput, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { SIZES } from '../constants/theme';

// A form whose ScrollView sits above a pinned footer in a KeyboardAvoidingView: once the keyboard
// is up, scroll the focused field and the error line under it above the footer.
export function useKeyboardScroll() {
  const scroll_ref = useRef<ComponentRef<typeof ScrollView>>(null);
  const offset = useRef(0);

  useEffect(() => {
    const reveal = () => {
      const input = TextInput.State.currentlyFocusedInput();
      const scroll = scroll_ref.current?.getNativeScrollRef();
      if (!input || !scroll) return;
      scroll.measureInWindow((_x, top, _width, height) =>
        input.measureInWindow((_ix, y, _iwidth, input_height) => {
          const overflow = y + input_height + SIZES.padding * 1.5 - (top + height);
          if (overflow > 0) scroll_ref.current?.scrollTo({ y: offset.current + overflow, animated: true });
        }),
      );
    };
    const subscription = Keyboard.addListener('keyboardDidShow', reveal);
    return () => subscription.remove();
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    offset.current = event.nativeEvent.contentOffset.y;
  };

  return { scroll_ref, onScroll };
}
