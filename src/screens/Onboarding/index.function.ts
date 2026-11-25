import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, BackHandler, Easing } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import {
  answerScanNotify,
  openBackgroundResults,
  connectOnboardingGoogle,
  connectOnboardingOutlook,
  editOnboardingCandidate,
  finishOnboarding,
  getOnboardingScan,
  retryOnboardingScan,
  saveOnboardingFinds,
} from '../../redux/actions/onboarding-action';
import { setConnectMessage, setScanJob, toggleCandidate } from '../../redux/slices/onboarding-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList, InboxProvider, OnboardingStep, ScanCandidate } from '../../types';
import { navigate, resetRoot } from '../../navigation/service';
import { PRIVACY_URL, TERMS_URL, openLegal } from '../../config/legal';
import { useIsTablet } from '../../utils/tablet';
import { scanProgress, type DeepView } from '../../utils/scan-progress';
import { dismissBackgroundScan, getDeepStatus } from '../../redux/actions/gmail-action';

type Route = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>['route'];

// Progress stage (1–5) and the approved logical Back target of each panel.
export const ONBOARDING_STEPS: Record<OnboardingStep, { stage: number; back?: OnboardingStep }> = {
  welcome: { stage: 1 },
  connectInbox: { stage: 2, back: 'welcome' },
  discovering: { stage: 3, back: 'connectInbox' },
  firstResults: { stage: 3, back: 'connectInbox' },
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
// First results: the older-mail percent is read less often (it moves over minutes).
export const DEEP_POLL_MS = 3000;
// A Gmail first scan starts its background read right after the quick check; if none appears by then, the scan
// is treated as one phase (the old Your subscriptions flow).
export const DEEP_WAIT_MS = 8000;

export default function useOnboarding(route: Route) {
  const is_tablet = useIsTablet();
  const dispatch = useAppDispatch();
  const onboarding_state = useAppSelector(state => state.onboarding);
  const user_name = useAppSelector(state => state.profile.user?.name ?? '');
  const signed_in = useAppSelector(state => !!state.constant.token);

  const [editing_id, setEditingId] = useState('');
  // The last save error of the open review sheet.
  const [edit_error, setEditError] = useState('');
  const [step, setStep] = useState<OnboardingStep>(route.params?.step ?? 'welcome');
  // Which provider button started the running connect (its label says Connecting…).
  const [connect_provider, setConnectProvider] = useState<InboxProvider>('gmail');
  const [animating, setAnimating] = useState(false);
  const [panel_width, setPanelWidth] = useState(0);
  const [reduce_motion, setReduceMotion] = useState(false);
  // Discovering · notify me sheet, and the answer being sent.
  const [notify_open, setNotifyOpen] = useState(false);
  const [notify_busy, setNotifyBusy] = useState(false);
  const [deep_wait_over, setDeepWaitOver] = useState(false);
  const panel_x = useRef(new Animated.Value(0)).current;
  const panel_opacity = useRef(new Animated.Value(1)).current;
  // Built once per width, not on every render, so a running slide keeps its node.
  const panel_shift = useMemo(() => Animated.multiply(panel_x, panel_width / 4), [panel_width, panel_x]);
  const { scan_status, scan_failure, candidates, scan_job_id, connector_id, selected_ids, scan_meter } = onboarding_state;
  const scan_progress = useMemo(() => scanProgress(scan_meter, onboarding_state.scan_stages, scan_status === 'completed'), [onboarding_state.scan_stages, scan_meter, scan_status]);
  // A Gmail first scan: the quick check ended while its background (deep) read goes on.
  const quick_done = scan_status === 'completed' && scan_meter?.phase === 'quick';
  const deep = scan_meter?.deep ?? null;
  const deep_running = deep?.status === 'running';
  // The quick check ended but its background read has not shown up yet.
  const waiting_for_deep = quick_done && !deep && !deep_wait_over;

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

  // Poll while Discovering waits for the job (or for its background read), and slower on first results while older
  // mail is read, so its percent moves.
  const poll_ms =
    step === 'discovering' && (scan_status === 'running' || waiting_for_deep || (quick_done && deep_running && candidates.length === 0))
      ? SCAN_POLL_MS
      : 0;
  useEffect(() => {
    if (!poll_ms) return;
    const timer = setInterval(() => dispatch(getOnboardingScan(scan_job_id)), poll_ms);
    return () => clearInterval(timer);
  }, [dispatch, poll_ms, scan_job_id]);

  // First results: the background read's own status, percent and live counts, read every few seconds while it runs.
  const [deep_view, setDeepView] = useState<DeepView | null>(null);
  const deep_job = step === 'firstResults' && deep && deep_view?.status !== 'completed' && deep_view?.status !== 'failed' ? deep.job_id : '';
  useEffect(() => {
    if (!deep_job) return;
    const read = () => dispatch(getDeepStatus(deep_job, setDeepView));
    read();
    const timer = setInterval(read, DEEP_POLL_MS);
    return () => clearInterval(timer);
  }, [deep_job, dispatch]);
  const older_running = deep_view ? deep_view.status === 'running' : deep_running;

  // Rest of your year done (approved 25 Nov 2026): after a short hold on 100%, load the background read's list
  // (it holds the quick check's unsaved plans too) and open Your subscriptions with everything found. Not while the
  // notify sheet is open: the user is choosing to leave.
  const deep_done_job = step === 'firstResults' && deep_view?.status === 'completed' && deep && !notify_open && !notify_busy ? deep.job_id : '';
  useEffect(() => {
    if (!deep_done_job) return;
    const timer = setTimeout(() => dispatch(openBackgroundResults(deep_done_job)), SCAN_COMPLETE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [deep_done_job, dispatch]);
  useEffect(() => {
    if (step === 'firstResults' && scan_meter?.phase === 'deep' && scan_status === 'completed' && !notify_open && !notify_busy) goTo('yourSubscriptions');
  }, [goTo, notify_busy, notify_open, scan_meter?.phase, scan_status, step]);

  useEffect(() => {
    if (!waiting_for_deep) return;
    const timer = setTimeout(() => setDeepWaitOver(true), DEEP_WAIT_MS);
    return () => clearTimeout(timer);
  }, [waiting_for_deep]);

  // Discovering leaves on its own: results after a short hold on the completed stages, otherwise recovery. A first scan
  // whose quick check found something shows first results while older mail is read; one that found nothing keeps
  // looking (no "no results" yet) and follows the background read itself once it ends.
  useEffect(() => {
    if (step !== 'discovering') return;
    if (scan_status === 'failed') return goTo('scanInterrupted');
    if (scan_status !== 'completed' || waiting_for_deep) return;
    if (candidates.length === 0 && deep && deep_running) return;
    if (candidates.length === 0 && deep) {
      dispatch(setScanJob(deep.job_id));
      return;
    }
    if (candidates.length === 0) return goTo('scanNoResults');
    const timer = setTimeout(() => goTo(quick_done && deep_running ? 'firstResults' : 'yourSubscriptions'), SCAN_COMPLETE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [candidates.length, deep, deep_running, dispatch, goTo, quick_done, scan_status, step, waiting_for_deep]);

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
    dispatch(retryOnboardingScan(connector_id, scan_job_id, openDashboard));
    goTo('discovering');
  };

  const save = () => dispatch(saveOnboardingFinds(scan_job_id, selected_ids, () => goTo('readyToGo')));
  const reviewFound = () => goTo('yourSubscriptions');
  const openNotify = () => setNotifyOpen(true);
  const closeNotify = () => !notify_busy && setNotifyOpen(false);
  // Notify me or Not now: the plans found so far that are ticked are saved first (so Home shows them, not the empty
  // state), the answer is stored on the quick job, then Home shows STILL CHECKING. A failed save stays on the sheet.
  const answerNotify = (notify: boolean) => {
    if (notify_busy) return;
    setNotifyBusy(true);
    const finish = () => dispatch(answerScanNotify(scan_job_id, notify, () => dispatch(finishOnboarding(() => resetRoot([{ name: 'Tabs' }])))));
    if (!selected_ids.length) return finish();
    dispatch(saveOnboardingFinds(scan_job_id, selected_ids, finish, () => setNotifyBusy(false)));
  };

  const openDashboard = () => dispatch(finishOnboarding(() => resetRoot([{ name: 'Tabs' }])));
  // Continue without saving after the whole year was shown: the user has seen every find, so Home must not offer
  // them again as MORE FOUND (saving dismisses it on the server already).
  const skipSave = () => {
    if (scan_meter?.phase === 'deep') dispatch(dismissBackgroundScan(scan_job_id));
    openDashboard();
  };
  const connectGoogle = () => {
    setConnectProvider('gmail');
    dispatch(connectOnboardingGoogle(openScan, openDashboard));
  };
  // One Microsoft sign-in logs in (or opens the account) and connects the inbox, like Connect Gmail and Login.
  const connectOutlook = () => {
    setConnectProvider('outlook');
    dispatch(connectOnboardingOutlook(openScan, openDashboard));
  };
  const connectProvider = (provider: InboxProvider) => (provider === 'outlook' ? connectOutlook() : connectGoogle());
  const connect_busy = onboarding_state.connect_loading ? connect_provider : null;

  const stage = ONBOARDING_STEPS[step].stage;
  const back = back_target ? onBack : undefined;
  const first_name = user_name.split(' ')[0];
  const editing = candidates.find(item => item.id === editing_id);
  const panel_style = { opacity: panel_opacity, transform: [{ translateX: panel_shift }] };
  const footer_style = { opacity: panel_opacity };

  const toggle = (id: string) => dispatch(toggleCandidate(id));
  const closeEdit = () => {
    setEditingId('');
    setEditError('');
  };
  const saveEdit = (item: ScanCandidate) => {
    setEditError('');
    dispatch(editOnboardingCandidate(scan_job_id, item, closeEdit, setEditError));
  };
  const openLogin = () => navigate('Login');
  // Manual entry: the Add form when signed in, otherwise sign up first and continue to it.
  const openManual = () => (signed_in ? navigate('AddSubscription') : navigate('Signup', { intent: 'add_manual' }));
  const openAi = () => (signed_in ? navigate('AiChat') : navigate('Signup', { intent: 'add_ai' }));
  const openTerms = () => openLegal(TERMS_URL);
  const openPrivacy = () => openLegal(PRIVACY_URL);

  return {
    is_tablet,
    ...onboarding_state,
    step,
    stage,
    animating,
    reduce_motion,
    first_name,
    onBack: back,
    goTo,
    signed_in,
    connectProvider,
    connect_busy,
    retryScan,
    scan_progress,
    deep_view,
    older_running,
    reviewFound,
    notify_open,
    notify_busy,
    openNotify,
    closeNotify,
    answerNotify,
    toggleCandidate: toggle,
    editing,
    edit_error,
    openEdit: setEditingId,
    closeEdit,
    saveEdit,
    save,
    openLogin,
    openManual,
    openAi,
    openTerms,
    openPrivacy,
    openDashboard,
    // Zero selection: continue to the actual (possibly empty) dashboard without a fake success.
    skipSave,
    panel_style,
    footer_style,
    setPanelWidth,
  };
}

export type OnboardingController = ReturnType<typeof useOnboarding>;
