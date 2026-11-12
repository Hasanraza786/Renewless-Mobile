import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { goBack, navigate } from '../../navigation/service';
import { connectGmailInbox, getGmailInboxes, getGmailScan, saveGmailResults, startGmailScan } from '../../redux/actions/gmail-action';
import { setNotice } from '../../redux/slices/profile-slice';
import { useAppDispatch } from '../../redux/store';
import type { ApiError } from '../../api_services/http-provider';
import type { AppStackParamList, GmailCandidate, GmailSelection, ProfileInbox } from '../../types';
import { money as moneyLabel } from '../../utils/money';

export type GmailScanRoute = NativeStackScreenProps<AppStackParamList, 'GmailScan'>['route'];
export type GmailPhase = 'loading' | 'scanning' | 'review' | 'nothing' | 'interrupted';
export type GmailSheet = { kind: 'candidate' | 'changes'; id: string } | { kind: 'inboxes' } | null;
// Reviewed values for a new plan (price, renewal or trial details).
export type CandidateEdit = Pick<GmailSelection, 'price' | 'next_date' | 'start_date' | 'trial'>;

const POLL_MS = 2000;
// Like onboarding's Discovering: a short hold on the completed stages, then the review opens by itself.
const ADVANCE_MS = 650;
const INBOX_LIMIT = 'You’ve used your 2 Gmail inboxes. You can reconnect an inbox you used before.';
const MONTHLY: Record<string, number> = { Weekly: 52 / 12, Monthly: 1, Quarterly: 1 / 3, Yearly: 1 / 12 };

// Authenticated Gmail: scan the chosen inbox, review new plans and updates, save only what is selected.
export default function useGmailScan(route: GmailScanRoute) {
  const dispatch = useAppDispatch();
  const [inboxes, setInboxes] = useState<ProfileInbox[]>([]);
  const [inbox, setInbox] = useState<ProfileInbox | null>(null);
  const [phase, setPhase] = useState<GmailPhase>('loading');
  const [stage, setStage] = useState(0);
  const [job_id, setJobId] = useState('');
  const [candidates, setCandidates] = useState<GmailCandidate[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [edits, setEdits] = useState<Record<string, CandidateEdit>>({});
  const [replace_date, setReplaceDate] = useState(false);
  const [sheet, setSheet] = useState<GmailSheet>(null);
  const [saving, setSaving] = useState(false);
  const [save_error, setSaveError] = useState('');
  const [reduce_motion, setReduceMotion] = useState(false);
  // Each scan gets a token; progress from an older scan or after leaving is ignored.
  const scan_token = useRef(0);

  const scan = useCallback(
    (target: ProfileInbox) => {
      const token = ++scan_token.current;
      setInbox(target);
      setPhase('scanning');
      setStage(0);
      setCandidates([]);
      setSaveError('');
      const poll = (job: string) =>
        dispatch(
          getGmailScan(job, status => {
            if (token !== scan_token.current) return;
            setStage(status.stage);
            if (status.status === 'failed') return setPhase('interrupted');
            if (status.status !== 'completed') {
              setTimeout(() => token === scan_token.current && poll(job), POLL_MS);
              return;
            }
            setCandidates(status.candidates);
            // Server-preselected new plans start selected; updates and saved ones do not.
            setSelected(status.candidates.filter(item => item.kind === 'new' && !item.saved && item.selected).map(item => item.id));
            const found = status.candidates.some(item => item.kind !== 'duplicate' && !item.saved);
            setTimeout(() => token === scan_token.current && setPhase(found ? 'review' : 'nothing'), ADVANCE_MS);
          }),
        );
      const onStarted = (job: string) => {
        if (token !== scan_token.current) return;
        setJobId(job);
        poll(job);
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
    [dispatch],
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
    dispatch(setNotice(INBOX_LIMIT));
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
        const first = list.find(item => item.id === route.params?.inbox_id) ?? list[0];
        if (first) return scan(first);
        // No inbox yet (Home or the Add sheet): connect one first; closing Google leaves the screen.
        dispatch(connectGmailInbox(onFirstInbox, onFirstLimit, goBack));
      }, onFailed),
    );
    return () => {
      scan_token.current += 1;
    };
  }, [dispatch, onFirstInbox, onFirstLimit, route.params?.inbox_id, scan]);

  const scan_done = phase === 'scanning' && stage >= 3;
  const actionable = candidates.filter(item => item.kind !== 'duplicate' && !item.saved);
  const new_items = candidates.filter(item => item.kind === 'new');
  const updates = candidates.filter(item => item.kind === 'update');
  const duplicates = candidates.filter(item => item.kind === 'duplicate');
  const chosen = candidates.filter(item => selected.includes(item.id) && item.kind !== 'duplicate' && !item.saved);
  const selected_count = chosen.length;
  const add_count = chosen.filter(item => item.kind === 'new').length;
  const update_count = chosen.filter(item => item.kind === 'update').length;
  const view = (item: GmailCandidate): GmailCandidate => ({ ...item, ...edits[item.id] });
  const money = (() => {
    const totals = new Map<string, number>();
    // Paid plans only: free trials aren't in the total, as in onboarding.
    for (const item of chosen.filter(entry => entry.kind === 'new').map(view).filter(entry => !entry.trial)) totals.set(item.currency, (totals.get(item.currency) ?? 0) + Number(item.price) * (MONTHLY[item.cycle] ?? 1));
    return [...totals].map(([currency, total]) => moneyLabel(currency, total.toFixed(2))).join(' · ') || '—';
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
  // Review heading: the first scan of an inbox is its first look; later ones show what's new.
  const eyebrow = inbox?.lastSync ? 'WHAT’S NEW' : 'YOUR FIRST LOOK';
  const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;
  const intro = `We found ${plural(new_items.length, 'new subscription', 'new subscriptions')}${updates.length ? ` and ${plural(updates.length, 'change', 'changes')}` : ''}. Choose what to keep.`;
  const open_count = actionable.length;
  const sheet_candidate = sheet && sheet.kind !== 'inboxes' ? candidates.find(item => item.id === sheet.id) ?? null : null;

  const toggle = (id: string) => setSelected(current => (current.includes(id) ? current.filter(item => item !== id) : [...current, id]));
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
  const onInboxLimit = () => dispatch(setNotice(INBOX_LIMIT));
  const connectAnother = () => {
    setSheet(null);
    dispatch(connectGmailInbox(onConnected, onInboxLimit));
  };
  const retry = () => inbox && scan(inbox);
  const addManually = () => navigate('AddSubscription');

  const onSaved = () => {
    setSaving(false);
    navigate('List');
  };
  const onSaveFailed = (message: string) => {
    setSaving(false);
    setSaveError(message);
  };
  const save = () => {
    if (!chosen.length || saving) return;
    setSaving(true);
    setSaveError('');
    const selections: GmailSelection[] = chosen.map(item => {
      const value = view(item);
      return { id: item.id, price: value.price, next_date: value.next_date, start_date: value.start_date, trial: value.trial, replace_date: item.kind === 'update' && replace_date };
    });
    dispatch(saveGmailResults(job_id, chosen, selections, onSaved, onSaveFailed));
  };

  return {
    inboxes,
    inbox,
    phase,
    stage,
    scan_done,
    reduce_motion,
    eyebrow,
    intro,
    open_count,
    new_items,
    updates,
    duplicates,
    selected,
    replace_date,
    money,
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
    retry,
    addManually,
    save,
  };
}

export type GmailScanController = ReturnType<typeof useGmailScan>;
