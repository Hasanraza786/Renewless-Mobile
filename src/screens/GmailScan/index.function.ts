import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { goBack, navigate } from '../../navigation/service';
import { connectInbox, getGmailInboxes, getGmailScan, INBOX_LIMIT_NOTICE, matchGmailReceipt, saveGmailResults, startGmailScan } from '../../redux/actions/gmail-action';
import { setNotice } from '../../redux/slices/profile-slice';
import { useAppDispatch } from '../../redux/store';
import type { ApiError } from '../../api_services/http-provider';
import type { AppStackParamList, GmailCandidate, GmailSelection, InboxProvider, ProfileInbox, ScanAttention, ScanMeter } from '../../types';
import { scanProgress } from '../../utils/scan-progress';
import { afterModalClose } from '../../utils/modal';
import { money as moneyLabel } from '../../utils/money';
import { useIsTablet } from '../../utils/tablet';
import { orderByCount } from '../../utils/currency-switch';

export type GmailScanRoute = NativeStackScreenProps<AppStackParamList, 'GmailScan'>['route'];
export type GmailPhase = 'loading' | 'scanning' | 'review' | 'nothing' | 'interrupted';
export type GmailSheet = { kind: 'candidate' | 'changes' | 'match'; id: string } | { kind: 'inboxes' } | null;
// Reviewed values for a new plan (price, renewal or trial details).
export type CandidateEdit = Pick<GmailSelection, 'price' | 'next_date' | 'start_date' | 'trial'>;

const POLL_MS = 2000;
// Like onboarding's Discovering: a short hold on the completed stages, then the review opens by itself.
const ADVANCE_MS = 650;
const POLL_FAILURES = 3;
const MONTHLY: Record<string, number> = { Weekly: 52 / 12, Monthly: 1, Quarterly: 1 / 3, Yearly: 1 / 12 };

// Authenticated Gmail: scan the chosen inbox, review new plans and updates, save only what is selected.
export default function useGmailScan(route: GmailScanRoute) {
  const is_tablet = useIsTablet();
  const dispatch = useAppDispatch();
  const [inboxes, setInboxes] = useState<ProfileInbox[]>([]);
  const [inbox, setInbox] = useState<ProfileInbox | null>(null);
  const [phase, setPhase] = useState<GmailPhase>('loading');
  const [stage, setStage] = useState(0);
  const [job_id, setJobId] = useState('');
  const [candidates, setCandidates] = useState<GmailCandidate[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [edits, setEdits] = useState<Record<string, CandidateEdit>>({});
  // Several currencies: the cost card shows one currency at a time (24 Nov 2026).
  const [currency_choice, setCurrencyChoice] = useState('');
  const [replace_date, setReplaceDate] = useState(false);
  const [sheet, setSheet] = useState<GmailSheet>(null);
  const [choose_open, setChooseOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [save_error, setSaveError] = useState('');
  const [reduce_motion, setReduceMotion] = useState(false);
  // Live progress of the running scan, and the review rows with their own states (usage bills, payments to match).
  const [meter, setMeter] = useState<ScanMeter | null>(null);
  const [attention, setAttention] = useState<ScanAttention>({ usage: [], needs_match: [] });
  // CHOOSE A SUBSCRIPTION: the saved pick per receipt (a subscription ID or "separate").
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [match_busy, setMatchBusy] = useState(false);
  const [match_error, setMatchError] = useState('');
  // Each scan gets a token; progress from an older scan or after leaving is ignored.
  const scan_token = useRef(0);

  // A job we lost contact with (3 status checks in a row failed); Retry checks it again instead of a new scan.
  const lost_job = useRef('');

  // Follows one scan job until it ends. A status check that can't reach the server is retried; 3 in a row interrupt.
  const follow = useCallback(
    (job: string, token: number) => {
      let failures = 0;
      const poll = () =>
        dispatch(
          getGmailScan(job, status => {
            if (token !== scan_token.current) return;
            if (status.status === 'failed' && status.error) {
              failures += 1;
              if (failures < POLL_FAILURES) {
                setTimeout(() => token === scan_token.current && poll(), POLL_MS);
                return;
              }
              lost_job.current = job;
              return setPhase('interrupted');
            }
            failures = 0;
            setStage(status.stage);
            setMeter(status);
            if (status.status === 'failed') return setPhase('interrupted');
            if (status.status !== 'completed') {
              setTimeout(() => token === scan_token.current && poll(), POLL_MS);
              return;
            }
            setCandidates(status.candidates);
            setAttention(status.attention);
            // Server-preselected new plans start selected; updates, usage bills and saved ones do not.
            setSelected(status.candidates.filter(item => item.kind === 'new' && !item.saved && item.selected).map(item => item.id));
            const found =
              status.candidates.some(item => item.kind !== 'duplicate' && !item.saved) ||
              status.attention.usage.some(item => !item.saved) ||
              status.attention.needs_match.length > 0;
            setTimeout(() => token === scan_token.current && setPhase(found ? 'review' : 'nothing'), ADVANCE_MS);
          }),
        );
      poll();
    },
    [dispatch],
  );

  const scan = useCallback(
    (target: ProfileInbox) => {
      const token = ++scan_token.current;
      lost_job.current = '';
      setInbox(target);
      setPhase('scanning');
      setStage(0);
      setMeter(null);
      setCandidates([]);
      setAttention({ usage: [], needs_match: [] });
      setMatches({});
      setSaveError('');
      const onStarted = (job: string) => {
        if (token !== scan_token.current) return;
        setJobId(job);
        follow(job, token);
      };
      // The weekly limit is not an interruption: say when, and leave the screen.
      const onFailed = (error: ApiError) => {
        if (token !== scan_token.current) return;
        if (error.code !== 'SYNC_LIMIT') return setPhase('interrupted');
        dispatch(setNotice(error.message));
        goBack();
      };
      dispatch(startGmailScan(target, onStarted, onFailed));
    },
    [dispatch, follow],
  );

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion, () => {});
  }, []);

  const onFirstInbox = useCallback(
    (target: ProfileInbox) => {
      setInboxes([target]);
      scan(target);
    },
    [scan],
  );
  const onFirstLimit = useCallback(() => {
    dispatch(setNotice(INBOX_LIMIT_NOTICE));
    goBack();
  }, [dispatch]);

  useEffect(() => {
    // Leaving bumps the token, so a late answer neither scans nor opens Google.
    const visit = scan_token.current;
    const onFailed = () => visit === scan_token.current && goBack();
    dispatch(
      getGmailInboxes(list => {
        if (visit !== scan_token.current) return;
        setInboxes(list);
        // Home · more found opens that finished background scan's review; nothing is scanned again.
        const review_job = route.params?.job_id;
        if (review_job) {
          setInbox(list.find(item => item.id === route.params?.inbox_id) ?? list[0] ?? null);
          setJobId(review_job);
          return follow(review_job, visit);
        }
        // An Add sheet tile scans that provider's inbox, or connects one first; closing its sign-in sheet leaves the screen.
        const provider = route.params?.connect;
        const first = list.find(item => item.id === route.params?.inbox_id) ?? (provider ? list.find(item => item.provider === provider) : list[0]);
        if (first) return scan(first);
        dispatch(connectInbox(provider ?? 'gmail', onFirstInbox, onFirstLimit, goBack));
      }, onFailed),
    );
    return () => {
      scan_token.current += 1;
    };
  }, [dispatch, follow, onFirstInbox, onFirstLimit, route.params?.inbox_id, route.params?.connect, route.params?.job_id, scan]);

  const scan_done = phase === 'scanning' && stage >= 3;
  const scan_progress = scanProgress(meter, stage, scan_done);
  const actionable = candidates.filter(item => item.kind !== 'duplicate' && !item.saved);
  const new_items = candidates.filter(item => item.kind === 'new' && !item.failing);
  // PAYMENTS FAILING: plans with only failed payments, unticked; a ticked one counts like a new plan.
  const failing = candidates.filter(item => item.failing);
  const updates = candidates.filter(item => item.kind === 'update');
  const duplicates = candidates.filter(item => item.kind === 'duplicate');
  // USAGE BILLS count in the ring and the Add button, never in Estimated monthly cost.
  const usage = attention.usage;
  const needs_match = attention.needs_match;
  const usage_chosen = usage.filter(item => selected.includes(item.id) && !item.saved);
  const chosen = candidates.filter(item => selected.includes(item.id) && item.kind !== 'duplicate' && !item.saved);
  const selected_count = chosen.length + usage_chosen.length;
  const add_count = chosen.filter(item => item.kind === 'new').length + usage_chosen.length;
  const update_count = chosen.filter(item => item.kind === 'update').length;
  const view = (item: GmailCandidate): GmailCandidate => ({ ...item, ...edits[item.id] });
  const currencies = orderByCount(new_items.map(item => view(item).currency));
  const currency = currencies.includes(currency_choice) ? currency_choice : currencies[0] ?? '';
  const several_currencies = currencies.length > 1;
  const money = (() => {
    const totals = new Map<string, number>();
    // Paid plans only: free trials aren't in the total, as in onboarding.
    for (const item of chosen.filter(entry => entry.kind === 'new').map(view).filter(entry => !entry.trial)) totals.set(item.currency, (totals.get(item.currency) ?? 0) + Number(item.price) * (MONTHLY[item.cycle] ?? 1));
    if (several_currencies) return moneyLabel(currency, totals.get(currency) ?? 0);
    return [...totals].map(([code, total]) => moneyLabel(code, total)).join(' · ') || '—';
  })();
  const save_label = saving
    ? 'Saving…'
    : add_count && update_count
      ? `Add ${add_count} & save ${update_count} update${update_count === 1 ? '' : 's'}`
      : add_count
        ? `Add ${add_count} subscription${add_count === 1 ? '' : 's'}`
        : update_count
          ? `Save ${update_count} update${update_count === 1 ? '' : 's'}`
          : 'Select subscriptions';
  // Review heading: the first scan of an inbox is its first look; later ones (and Home · more found) show what's new.
  const eyebrow = inbox?.lastSync || route.params?.job_id ? 'WHAT’S NEW' : 'YOUR FIRST LOOK';
  const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;
  const attention_count = failing.length + needs_match.length;
  const found_parts = [
    plural(new_items.length, 'new subscription', 'new subscriptions'),
    ...(updates.length ? [plural(updates.length, 'change', 'changes')] : []),
    ...(attention_count ? [`${attention_count} that need a look`] : []),
    ...(usage.length ? [plural(usage.length, 'usage bill', 'usage bills')] : []),
  ];
  const found_text = found_parts.length > 1 ? `${found_parts.slice(0, -1).join(', ')} and ${found_parts[found_parts.length - 1]}` : found_parts[0];
  const intro = `We found ${found_text}. Choose what to keep.`;
  const open_count = actionable.length + usage.filter(item => !item.saved).length;
  const sheet_match = sheet?.kind === 'match' ? needs_match.find(item => item.receipt_id === sheet.id) ?? null : null;
  const sheet_candidate = sheet && sheet.kind !== 'inboxes' ? candidates.find(item => item.id === sheet.id) ?? null : null;

  const toggle = (id: string) => setSelected(current => (current.includes(id) ? current.filter(item => item !== id) : [...current, id]));
  const openMatch = (receipt_id: string) => {
    setMatchError('');
    setSheet({ kind: 'match', id: receipt_id });
  };
  const onMatched = (receipt_id: string, pick: string) => {
    setMatchBusy(false);
    setMatches(current => ({ ...current, [receipt_id]: pick }));
    setSheet(null);
  };
  const onMatchFailed = (message: string) => {
    setMatchBusy(false);
    setMatchError(message);
  };
  // The pick is recorded right away (it never counts in the ring, total or Add button).
  const saveMatch = (receipt_id: string, pick: string) => {
    const entry = needs_match.find(item => item.receipt_id === receipt_id);
    if (!entry || match_busy) return;
    if (matches[receipt_id] === pick) return setSheet(null);
    setMatchBusy(true);
    setMatchError('');
    dispatch(matchGmailReceipt(job_id, receipt_id, pick, entry.revision, () => onMatched(receipt_id, pick), onMatchFailed));
  };
  const openCandidate = (item: GmailCandidate) => setSheet({ kind: item.kind === 'update' ? 'changes' : 'candidate', id: item.id });
  const openInboxes = () => setSheet({ kind: 'inboxes' });
  const closeSheet = () => setSheet(null);
  const keepDetails = (id: string, edit: CandidateEdit) => {
    setEdits(current => ({ ...current, [id]: edit }));
    setSelected(current => (current.includes(id) ? current : [...current, id]));
    setSheet(null);
  };
  // Keep these choices selects the update with the chosen date handling.
  const keepChanges = (id: string, replace: boolean) => {
    setReplaceDate(replace);
    setSelected(current => (current.includes(id) ? current : [...current, id]));
    setSheet(null);
  };
  const chooseInbox = (target: ProfileInbox) => {
    setSheet(null);
    scan(target);
  };
  const onConnected = (target: ProfileInbox) => {
    setInboxes(current => [...current.filter(item => item.id !== target.id), target]);
    scan(target);
  };
  const onInboxLimit = () => dispatch(setNotice(INBOX_LIMIT_NOTICE));
  // Connect another inbox closes the picker and opens Choose inbox (Gmail or Outlook).
  const connectAnother = () => {
    setSheet(null);
    afterModalClose(() => setChooseOpen(true));
  };
  const closeChoose = () => setChooseOpen(false);
  const pickProvider = (provider: InboxProvider) => dispatch(connectInbox(provider, onConnected, onInboxLimit));
  const retry = () => {
    if (!inbox) return;
    if (!lost_job.current) return scan(inbox);
    const token = ++scan_token.current;
    setPhase('scanning');
    follow(lost_job.current, token);
  };
  const addManually = () => navigate('AddSubscription');
  const addWithAi = () => navigate('AiChat');

  const onSaved = () => {
    setSaving(false);
    navigate('List');
  };
  const onSaveFailed = (message: string) => {
    setSaving(false);
    setSaveError(message);
  };
  const save = () => {
    if (!selected_count || saving) return;
    setSaving(true);
    setSaveError('');
    const selections: GmailSelection[] = chosen.map(item => {
      const value = view(item);
      return { id: item.id, price: value.price, next_date: value.next_date, start_date: value.start_date, trial: value.trial, replace_date: item.kind === 'update' && replace_date };
    });
    dispatch(saveGmailResults(job_id, chosen, selections, onSaved, onSaveFailed, usage_chosen.map(item => item.id)));
  };

  return {
    is_tablet,
    inboxes,
    inbox,
    phase,
    stage,
    scan_done,
    scan_progress,
    reduce_motion,
    eyebrow,
    intro,
    open_count,
    new_items,
    updates,
    duplicates,
    failing,
    usage,
    needs_match,
    matches,
    match_busy,
    match_error,
    sheet_match,
    openMatch,
    saveMatch,
    selected,
    replace_date,
    money,
    currencies,
    currency,
    several_currencies,
    setCurrencyChoice,
    selected_count,
    save_label,
    saving,
    save_error,
    sheet,
    sheet_candidate,
    view,
    toggle,
    openCandidate,
    openInboxes,
    closeSheet,
    keepDetails,
    keepChanges,
    chooseInbox,
    connectAnother,
    choose_open,
    closeChoose,
    pickProvider,
    retry,
    addManually,
    addWithAi,
    save,
  };
}

export type GmailScanController = ReturnType<typeof useGmailScan>;
