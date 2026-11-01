import type { ReactNode } from 'react';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { back_icon, logo_mark } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import { FONTS, SIZES, colors } from '../../constants/theme';
import type { AuthStackParamList, OnboardingStep } from '../../types';
import { ConnectInboxBody, ConnectInboxFooter } from './components/ConnectInbox';
import { InboxPermissionBody, InboxPermissionFooter } from './components/InboxPermission';
import { WelcomeBody, WelcomeFooter } from './components/Welcome';
import useOnboarding, { type OnboardingController } from './index.function';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;
type Panel = { Body: (props: { onboarding: OnboardingController }) => ReactNode; Footer: Panel['Body'] };

const PANELS: Record<OnboardingStep, Panel> = {
  welcome: { Body: WelcomeBody, Footer: WelcomeFooter },
  connectInbox: { Body: ConnectInboxBody, Footer: ConnectInboxFooter },
  inboxPermission: { Body: InboxPermissionBody, Footer: InboxPermissionFooter },
};

const STAGE_COUNT = 5;

export default function Onboarding(props: Props) {
  const onboarding = useOnboarding(props);
  const { Body, Footer } = PANELS[onboarding.step];

  return (
    <Container is_auth>
      <View style={styles.main_view}>
        <View style={styles.header}>
          <View style={styles.bar}>
            {onboarding.onBack ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Back" disabled={onboarding.animating} onPress={onboarding.onBack} style={styles.back}>
                <Icons name={back_icon} icon_height={SIZES.padding + SIZES.padding3 / 8} stroke={colors.text} />
              </Pressable>
            ) : (
              <View style={styles.back_spacer} />
            )}
            <CustomText text="RENEWLESS" weight={FONTS.regular} color={colors.text_secondary} size={SIZES.sm} line_height={SIZES.padding - SIZES.padding3 / 4} style={styles.wordmark} />
            <Icons name={logo_mark} icon_height={SIZES.padding2 * 2} icon_width={SIZES.padding2 * 2} />
          </View>
          <View accessibilityRole="progressbar" accessibilityLabel={`Step ${onboarding.stage} of ${STAGE_COUNT}`} style={styles.steps}>
            {Array.from({ length: STAGE_COUNT }, (_, index) => (
              <View key={index} style={[styles.step, index < onboarding.stage && styles.step_done]} />
            ))}
          </View>
        </View>
        <Animated.View
          pointerEvents={onboarding.animating ? 'none' : 'auto'}
          onLayout={event => onboarding.setPanelWidth(event.nativeEvent.layout.width)}
          style={[styles.panel, onboarding.panel_style]}>
          <ScrollView key={onboarding.step} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            <Body onboarding={onboarding} />
          </ScrollView>
        </Animated.View>
        <Animated.View pointerEvents={onboarding.animating ? 'none' : 'auto'} style={[styles.footer, onboarding.footer_style]}>
          <Footer onboarding={onboarding} />
        </Animated.View>
      </View>
    </Container>
  );
}
