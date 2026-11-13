import { useEffect, useRef, type ComponentRef } from 'react';
import { KeyboardAvoidingView, ScrollView, View, type TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import SubscriptionFields from '../../components/SubscriptionFields';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import type { DraftField } from '../../utils/subscription-form';
import useSubscriptionForm, { type SubscriptionFormRoute } from './index.function';
import { useKeyboardScroll } from '../../utils/keyboard-scroll';
import { styles } from './styles';

// Add form and Edit share this screen; the action stays pinned above the keyboard and safe area.
export default function AddSubscriptionScreen({ route }: { route: SubscriptionFormRoute }) {
  const form = useSubscriptionForm(route);
  // The keyboard offset is measured from the safe area, below the status bar.
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardScroll();
  const field_y = useRef<Partial<Record<DraftField, number>>>({});
  const inputs = useRef<Partial<Record<DraftField, ComponentRef<typeof TextInput> | null>>>({});

  // A failed submit brings its first invalid field into view and focuses it when it is typed into.
  const focus_request = form.focus_request;
  useEffect(() => {
    if (!focus_request) return;
    keyboard.scroll_ref.current?.scrollTo({ y: Math.max(0, (field_y.current[focus_request.field] ?? 0) - SIZES.padding), animated: true });
    inputs.current[focus_request.field]?.focus();
  }, [focus_request, keyboard.scroll_ref]);

  return (
    <Container is_auth style={styles.main_view}>
      <Header title={form.title} onBack={goBack} />
      {form.status !== 'ready' || !form.draft ? (
        <StateView status={form.status === 'failed' ? 'failed' : 'loading'} message={form.status === 'failed' ? form.load_error : 'Loop is opening your subscription…'} onRetry={form.retry} />
      ) : (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={insets.top} style={common_styles.flex_1}>
          <ScrollView ref={keyboard.scroll_ref} onScroll={keyboard.onScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentContainerStyle={styles.content}>
            <SubscriptionFields
              draft={form.draft}
              errors={form.errors}
              onChange={form.update}
              onPickService={form.pickService}
              origin={form.origin}
              show_price_change={form.show_price_change}
              today={form.today}
              editable={!form.saving}
              onFieldLayout={(field, y) => {
                field_y.current[field] = y;
              }}
              inputRef={(field, input) => {
                inputs.current[field] = input;
              }}
            />
          </ScrollView>
          <View style={styles.footer}>
            {/* The save error sits right above the pinned button, where it is seen. */}
            {form.request_error ? <CustomText mb={SIZES.padding3} text={form.request_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} align="center" accessibility_role="alert" /> : null}
            <CustomButton variant="primary" text={form.action} busy={form.saving} onPress={form.onSubmit} />
            <CustomText mt={SIZES.padding3} text="You can edit these details anytime." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} align="center" />
          </View>
        </KeyboardAvoidingView>
      )}
    </Container>
  );
}
