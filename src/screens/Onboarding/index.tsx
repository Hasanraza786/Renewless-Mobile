import { Fragment, type ReactNode } from 'react';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { back_icon, logo_mark } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import type { AuthStackParamList, OnboardingStep } from '../../types';
import { ConnectInboxBody, ConnectInboxFooter } from './components/ConnectInbox';
import { DiscoveringBody, DiscoveringFooter } from './components/Discovering';
import { ReadyConfetti, ReadyToGoBody, ReadyToGoFooter } from './components/ReadyToGo';
import { ScanInterruptedBody, ScanInterruptedFooter, ScanNoResultsBody, ScanNoResultsFooter } from './components/ScanRecovery';
import { WelcomeBody, WelcomeFooter } from './components/Welcome';
import { YourSubscriptionsBody, YourSubscriptionsFooter } from './components/YourSubscriptions';
import useOnboarding, { type OnboardingController } from './index.function';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';
import RowView from '../../components/RowView';
import SizedBox from '../../components/SizedBox';

type Props = Pick<NativeStackScreenProps<AuthStackParamList, 'Onboarding'>, 'route'>;
type Panel = {
  Body: (props: { onboarding: OnboardingController }) => ReactNode;
  Footer: Panel['Body'];
  // Ready and recovery fit one view: content is centred and the footer has no divider.
  fitted?: boolean;
};

const PANELS: Record<OnboardingStep, Panel> = {
  welcome: { Body: WelcomeBody, Footer: WelcomeFooter },
  connectInbox: { Body: ConnectInboxBody, Footer: ConnectInboxFooter },
  discovering: { Body: DiscoveringBody, Footer: DiscoveringFooter },
  yourSubscriptions: { Body: YourSubscriptionsBody, Footer: YourSubscriptionsFooter },
  readyToGo: { Body: ReadyToGoBody, Footer: ReadyToGoFooter, fitted: true },
  scanNoResults: { Body: ScanNoResultsBody, Footer: ScanNoResultsFooter, fitted: true },
  scanInterrupted: { Body: ScanInterruptedBody, Footer: ScanInterruptedFooter, fitted: true },
};

const STAGE_COUNT = 5;

export default function Onboarding({ route }: Props) {
  const onboarding = useOnboarding(route);
  const { Body, Footer, fitted } = PANELS[onboarding.step];

  return (
    <Container is_auth>
      <View style={styles.main_view}>

        <Fragment>

          <RowView justify_content='space-between' >
            {onboarding.onBack ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={SIZES.padding3 / 4} disabled={onboarding.animating} onPress={onboarding.onBack} style={styles.back}>
                <Icons name={back_icon} />
              </Pressable>
            ) : (
              <View style={styles.back_spacer} />
            )}
            <CustomText text="RENEWLESS" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} letter_spacing={2} />
            <Icons name={logo_mark} />
          </RowView>

          <SizedBox />

          <RowView
            accessibilityRole="progressbar"
            accessibilityLabel={`Step ${onboarding.stage} of ${STAGE_COUNT}`}
            gap={SIZES.padding2 / 2}
          >
            {Array.from({ length: STAGE_COUNT }, (_, index) => (
              <View key={index} style={[styles.step, index < onboarding.stage && styles.step_done]} />
            ))}
          </RowView>
        </Fragment>

        <SizedBox />

        <Animated.View
          pointerEvents={onboarding.animating ? 'none' : 'auto'}
          onLayout={event => onboarding.setPanelWidth(event.nativeEvent.layout.width)}
          style={[common_styles.flex_1, onboarding.panel_style]}>
          <ScrollView key={onboarding.step} showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, fitted && styles.scroll_fitted]}>
            <Body onboarding={onboarding} />
          </ScrollView>
        </Animated.View>
        <Animated.View pointerEvents={onboarding.animating ? 'none' : 'auto'} style={[styles.footer, !fitted && styles.footer_divider, onboarding.footer_style]}>
          <Footer onboarding={onboarding} />
        </Animated.View>
      </View>
      {onboarding.step === 'readyToGo' && !onboarding.reduce_motion ? <ReadyConfetti /> : null}
    </Container>
  );
}
