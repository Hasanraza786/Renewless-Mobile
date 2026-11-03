import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Alert, Animated, BackHandler, Easing } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  loadGoogleAccount,
  pollOnboardingScan,
  saveOnboardingFinds,
  startOnboardingScan,
} from '../../redux/actions/onboarding-action';
import { toggleCandidate } from '../../redux/slices/onboarding-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AccountProvider, AuthStackParamList, OnboardingStep } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

// Progress stage (1–5) and the approved logical Back target of each panel.
export const ONBOARDING_STEPS: Record<OnboardingStep, { stage: number; back?: OnboardingStep }> = {
  welcome: { stage: 1 },
  connectInbox: { stage: 2, back: 'welcome' },
  inboxPermission: { stage: 2, back: 'connectInbox' },
  discovering: { stage: 3, back: 'connectInbox' },
  yourSubscriptions: { stage: 4, back: 'connectInbox' },
  saveYourFinds: { stage: 4, back: 'yourSubscriptions' },
  readyToGo: { stage: 5, back: 'saveYourFinds' },
  scanNoResults: { stage: 3, back: 'connectInbox' },
  scanInterrupted: { stage: 3, back: 'connectInbox' },
};

export const PANEL_MOTION = { out_duration: 180, in_duration: 240 } as const;
// How often the client asks the scan job for its status; progress itself comes from the service.
export const SCAN_POLL_MS = 1000;

export default function useOnboarding({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const onboarding_state = useAppSelector(state => state.onboarding);
  const user_name = useAppSelector(state => state.profile.user?.name ?? '');
  const [step, setStep] = useState<OnboardingStep>(route.params?.step ?? 'welcome');
  const [animating, setAnimating] = useState(false);
  const [panel_width, setPanelWidth] = useState(0);
  const [reduce_motion, setReduceMotion] = useState(false);
  const panel_x = useRef(new Animated.Value(0)).current;
  const panel_opacity = useRef(new Animated.Value(1)).current;
  const { google_email, scan_status, candidates } = onboarding_state;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion, () => {});
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

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
    const travel = reduce_motion ? 0 : direction;
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
  }, [animating, panel_opacity, panel_x, reduce_motion, step]);

  // Poll only while Discovering is visible and the job is still running.
  useEffect(() => {
    if (step !== 'discovering' || scan_status !== 'running') return;
    const timer = setInterval(() => dispatch(pollOnboardingScan()), SCAN_POLL_MS);
    return () => clearInterval(timer);
  }, [dispatch, scan_status, step]);

  // Zero candidates and failures leave Discovering on their own; found results wait for the user.
  useEffect(() => {
    if (step !== 'discovering') return;
    if (scan_status === 'failed') goTo('scanInterrupted');
    else if (scan_status === 'completed' && candidates.length === 0) goTo('scanNoResults');
  }, [candidates.length, goTo, scan_status, step]);

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

  const startScan = () => {
    dispatch(startOnboardingScan());
    goTo('discovering');
  };

  const saveWith = async (provider: AccountProvider) => {
    if (await dispatch(saveOnboardingFinds(provider))) goTo('readyToGo');
  };

  return {
    ...onboarding_state,
    step,
    stage: ONBOARDING_STEPS[step].stage,
    animating,
    reduce_motion,
    first_name: user_name.split(' ')[0],
    onBack: back_target ? onBack : undefined,
    goTo,
    startScan,
    toggleCandidate: (id: string) => dispatch(toggleCandidate(id)),
    saveWith,
    openLogin: () => navigation.navigate('Login'),
    // shortcut: email sign-up is the legacy Signup route; returning to Ready after it needs the auth section (F1).
    openSignup: () => navigation.navigate('Signup'),
    openLegal: () => Alert.alert('Not available yet', 'Terms and Privacy will be available before release.'),
    openDashboard: () => navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Tabs' }] }),
    panel_style: {
      opacity: panel_opacity,
      transform: [{ translateX: Animated.multiply(panel_x, panel_width / 4) }],
    },
    footer_style: { opacity: panel_opacity },
    setPanelWidth,
  };
}

export type OnboardingController = ReturnType<typeof useOnboarding>;
