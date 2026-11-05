import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import SubscriptionFields from '../../components/SubscriptionFields';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import useSubscriptionForm, { type SubscriptionFormRoute } from './index.function';
import { styles } from './styles';

// Add form and Edit share this screen; the action stays pinned above the keyboard and safe area.
export default function AddSubscriptionScreen({ route }: { route: SubscriptionFormRoute }) {
  const form = useSubscriptionForm(route);

  return (
    <Container is_auth style={styles.main_view}>
      <Header title={form.title} onBack={goBack} />
      {form.status !== 'ready' || !form.draft ? (
        <StateView status={form.status === 'failed' ? 'failed' : 'loading'} message={form.status === 'failed' ? form.load_error : 'Loading subscription.'} onRetry={form.retry} />
      ) : (
        <KeyboardAvoidingView behavior="padding" style={common_styles.flex_1}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentContainerStyle={styles.content}>
            <SubscriptionFields
              draft={form.draft}
              errors={form.errors}
              onChange={form.update}
              onPickService={form.pickService}
              origin={form.origin}
              show_price_change={form.show_price_change}
              today={form.today}
              editable={!form.saving}
            />
            {form.request_error ? <CustomText mt={SIZES.padding2} text={form.request_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} accessibility_role="alert" /> : null}
          </ScrollView>
          <View style={styles.footer}>
            <CustomButton variant="primary" text={form.action} busy={form.saving} onPress={form.onSubmit} />
            <CustomText mt={SIZES.padding3} text="You can edit these details anytime." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} align="center" />
          </View>
        </KeyboardAvoidingView>
      )}
    </Container>
  );
}
