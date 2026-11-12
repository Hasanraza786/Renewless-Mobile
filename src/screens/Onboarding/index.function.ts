import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, BackHandler, Easing } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import {
  connectOnboardingGoogle,
  editOnboardingCandidate,
  finishOnboarding,
  getOnboardingScan,
  saveOnboardingFinds,
  startOnboardingScan,
} from '../../redux/actions/onboarding-action';
import { setConnectMessage, toggleCandidate } from '../../redux/slices/onboarding-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList, OnboardingStep, ScanCandidate } from '../../types';
import { navigate, resetRoot } from '../../navigation/service';
import { PRIVACY_URL, TERMS_URL, openLegal } from '../../config/legal';

type Route = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>['route'];

// Progress stage (1–5) and the approved logical Back target of each panel.
export const ONBOARDING_STEPS: Record<OnboardingStep, { stage: number; back?: OnboardingStep }> = {
  welcome: { stage: 1 },
  connectInbox: { stage: 2, back: 'welcome' },
  discovering: { stage: 3, back: 'connectInbox' },
  yourSubscriptions: { stage: 4, back: 'connectInbox' },
  readyToGo: { stage: 5, back: 'yourSubscriptions' },
  scanNoResults: { stage: 3, back: 'connectInbox' },
  scanInterrupted: { stage: 3, back: 'connectInbox' },
};

export const PANEL_MOTION = { out_duration: 180, in_duration: 240 } as const;
// How often the client asks the scan job for its status; progress itself comes from the service.
export const SCAN_POLL_MS = 1000;
// Brief pause on the completed stages before results open on their own.
export const SCAN_COMPLETE_HOLD_MS = 650;

export default function useOnboarding(route: Route) {
  const dispatch = useAppDispatch();
  const onboarding_state = useAppSelector(state => state.onboarding);
  const user_name = useAppSelector(state => state.profile.user?.name ?? '');
  const signed_in = useAppSelector(state => !!state.constant.token);

  const [editing_id, setEditingId] = useState('');
  const [step, setStep] = useState<OnboardingStep>(route.params?.step ?? 'welcome');
  const [animating, setAnimating] = useState(false);
  const [panel_width, setPanelWidth] = useState(0);
  const [reduce_motion, setReduceMotion] = useState(false);
  const panel_x = useRef(new Animated.Value(0)).current;
  const panel_opacity = useRef(new Animated.Value(1)).current;
  // Built once per width, not on every render, so a running slide keeps its node.
  const panel_shift = useMemo(() => Animated.multiply(panel_x, panel_width / 4), [panel_width, panel_x]);
  const { scan_status, scan_failure, candidates, scan_job_id, connector_id, selected_ids } = onboarding_state;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion, () => {});
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (route.params?.step) setStep(route.params.step);
  }, [route.params?.step]);

  // Direction of the panel waiting to slide in once the new step has rendered.
  const entering = useRef<number | null>(null);

  // The outgoing panel leaves first; the incoming one enters only after it is gone.
  const goTo = useCallback((next: OnboardingStep, direction: 1 | -1 = 1) => {
    if (animating || next === step) return;
    setAnimating(true);
    const travel = reduce_motion ? 0 : direction;
    Animated.parallel([
      Animated.timing(panel_x, { toValue: -travel, duration: PANEL_MOTION.out_duration, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(panel_opacity, { toValue: 0, duration: PANEL_MOTION.out_duration, easing: Easing.in(Easing.quad), useNativeDriver: true }),
    ]).start(() => {
      entering.current = travel;
      setStep(next);
    });
  }, [animating, panel_opacity, panel_x, reduce_motion, step]);

  // Slide the new panel in after it has rendered, so the old one never reappears while the JS thread catches up.
  useEffect(() => {
    if (entering.current === null) return;
    panel_x.setValue(entering.current);
    entering.current = null;
    Animated.parallel([
      Animated.timing(panel_x, { toValue: 0, duration: PANEL_MOTION.in_duration, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(panel_opacity, { toValue: 1, duration: PANEL_MOTION.in_duration, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start(() => setAnimating(false));
  }, [panel_opacity, panel_x, step]);

  // Poll only while Discovering is visible and the job is still running.
  useEffect(() => {
    if (step !== 'discovering' || scan_status !== 'running') return;
    const timer = setInterval(() => dispatch(getOnboardingScan(scan_job_id)), SCAN_POLL_MS);
    return () => clearInterval(timer);
  }, [dispatch, scan_job_id, scan_status, step]);

  // Discovering leaves on its own: results after a short hold on the completed stages, otherwise recovery.
  useEffect(() => {
    if (step !== 'discovering') return;
    if (scan_status === 'failed') goTo('scanInterrupted');
    else if (scan_status === 'completed' && candidates.length === 0) goTo('scanNoResults');
    else if (scan_status === 'completed') {
      const timer = setTimeout(() => goTo('yourSubscriptions'), SCAN_COMPLETE_HOLD_MS);
      return () => clearTimeout(timer);
    }
  }, [candidates.length, goTo, scan_status, step]);

  // A Connect message (cancelled, denied) belongs to that attempt: leaving the panel clears it.
  useEffect(() => {
    if (step !== 'connectInbox') dispatch(setConnectMessage(''));
  }, [dispatch, step]);

  const back_target = ONBOARDING_STEPS[step].back;
  const onBack = useCallback(() => {
    if (back_target) goTo(back_target, -1);
  }, [back_target, goTo]);

  // Only while Onboarding is the visible screen: Sign up, Login or Add opened on top handle their own Back.
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        if (!back_target) return false;
        onBack();
        return true;
      });
      return () => subscription.remove();
    }, [back_target, onBack]),
  );

  const openScan = () => goTo('discovering');

  // A network failure retries with the existing Gmail grant; lost access goes back to Connect.
  const retryScan = () => {
    if (scan_failure === 'access' || !connector_id) return goTo('connectInbox', -1);
    dispatch(startOnboardingScan(connector_id, openDashboard));
    goTo('discovering');
  };

  const save = () => dispatch(saveOnboardingFinds(scan_job_id, selected_ids, () => goTo('readyToGo')));

  const openDashboard = () => dispatch(finishOnboarding(() => resetRoot([{ name: 'Tabs' }])));
  const connectGoogle = () => dispatch(connectOnboardingGoogle(openScan, openDashboard));

  const stage = ONBOARDING_STEPS[step].stage;
  const back = back_target ? onBack : undefined;
  const first_name = user_name.split(' ')[0];
  const editing = candidates.find(item => item.id === editing_id);
  const panel_style = { opacity: panel_opacity, transform: [{ translateX: panel_shift }] };
  const footer_style = { opacity: panel_opacity };

  const toggle = (id: string) => dispatch(toggleCandidate(id));
  const closeEdit = () => setEditingId('');
  const saveEdit = (item: ScanCandidate) => dispatch(editOnboardingCandidate(scan_job_id, item, closeEdit));
  const openLogin = () => navigate('Login');
  // Manual entry: the Add form when signed in, otherwise sign up first and continue to it.
  const openManual = () => (signed_in ? navigate('AddSubscription') : navigate('Signup', { intent: 'add_manual' }));
  const openTerms = () => openLegal(TERMS_URL);
  const openPrivacy = () => openLegal(PRIVACY_URL);

  return {
    ...onboarding_state,
    step,
    stage,
    animating,
    reduce_motion,
    first_name,
    onBack: back,
    goTo,
    signed_in,
    connectGoogle,
    retryScan,
    toggleCandidate: toggle,
    editing,
    openEdit: setEditingId,
    closeEdit,
    saveEdit,
    save,
    openLogin,
    openManual,
    openTerms,
    openPrivacy,
    openDashboard,
    // Zero selection: continue to the actual (possibly empty) dashboard without a fake success.
    skipSave: openDashboard,
    panel_style,
    footer_style,
    setPanelWidth,
  };
}

export type OnboardingController = ReturnType<typeof useOnboarding>;
