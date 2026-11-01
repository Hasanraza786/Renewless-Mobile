import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, BackHandler, Easing } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadGoogleAccount } from '../../redux/actions/onboarding-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList, OnboardingStep } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

// Progress stage (1–5) and the approved logical Back target of each panel.
export const ONBOARDING_STEPS: Record<OnboardingStep, { stage: number; back?: OnboardingStep }> = {
  welcome: { stage: 1 },
  connectInbox: { stage: 2, back: 'welcome' },
  inboxPermission: { stage: 2, back: 'connectInbox' },
};

export const PANEL_MOTION = { out_duration: 180, in_duration: 240 } as const;

export default function useOnboarding({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const google_email = useAppSelector(state => state.onboarding.google_email);
  const [step, setStep] = useState<OnboardingStep>(route.params?.step ?? 'welcome');
  const [animating, setAnimating] = useState(false);
  const [panel_width, setPanelWidth] = useState(0);
  const reduce_motion = useRef(false);
  const panel_x = useRef(new Animated.Value(0)).current;
  const panel_opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(enabled => { reduce_motion.current = enabled; }, () => {});
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', enabled => { reduce_motion.current = enabled; });
    return () => subscription.remove();
  }, []);

  // Legacy scan routes return here with a target panel until they move into the host.
  useEffect(() => {
    if (route.params?.step) setStep(route.params.step);
  }, [route.params?.step]);

  useEffect(() => {
    if (step === 'inboxPermission' && !google_email) dispatch(loadGoogleAccount());
  }, [dispatch, google_email, step]);

  // The outgoing panel leaves first; the incoming one enters only after it is gone.
  const goTo = useCallback((next: OnboardingStep, direction: 1 | -1 = 1) => {
    if (animating || next === step) return;
    setAnimating(true);
    const travel = reduce_motion.current ? 0 : direction;
    Animated.parallel([
      Animated.timing(panel_x, { toValue: -travel, duration: PANEL_MOTION.out_duration, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(panel_opacity, { toValue: 0, duration: PANEL_MOTION.out_duration, easing: Easing.in(Easing.quad), useNativeDriver: true }),
    ]).start(() => {
      setStep(next);
      panel_x.setValue(travel);
      Animated.parallel([
        Animated.timing(panel_x, { toValue: 0, duration: PANEL_MOTION.in_duration, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(panel_opacity, { toValue: 1, duration: PANEL_MOTION.in_duration, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start(() => setAnimating(false));
    });
  }, [animating, panel_opacity, panel_x, step]);

  const back_target = ONBOARDING_STEPS[step].back;
  const onBack = useCallback(() => {
    if (back_target) goTo(back_target, -1);
  }, [back_target, goTo]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!back_target) return false;
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [back_target, onBack]);

  return {
    step,
    stage: ONBOARDING_STEPS[step].stage,
    animating,
    google_email,
    onBack: back_target ? onBack : undefined,
    goTo,
    openLogin: () => navigation.navigate('Login'),
    openSignup: () => navigation.navigate('Signup'),
    // shortcut: Discovering is still the legacy route until the scan panels move into this host (Part B).
    startScan: () => navigation.navigate('Discovering'),
    panel_style: {
      opacity: panel_opacity,
      transform: [{ translateX: Animated.multiply(panel_x, panel_width / 4) }],
    },
    footer_style: { opacity: panel_opacity },
    setPanelWidth,
  };
}

export type OnboardingController = ReturnType<typeof useOnboarding>;
