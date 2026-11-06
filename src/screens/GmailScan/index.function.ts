import { useCallback, useEffect, useRef, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { goBack, navigate } from '../../navigation/service';
import { beginGmailScan, fetchGmailInboxes, readGmailScan, saveGmailSelections } from '../../redux/actions/gmail-action';
import { setNotice } from '../../redux/slices/profile-slice';
import { useAppDispatch } from '../../redux/store';
import type { AppStackParamList, GmailCandidate, GmailSelection, ProfileInbox } from '../../types';

export type GmailScanRoute = NativeStackScreenProps<AppStackParamList, 'GmailScan'>['route'];
export type GmailPhase = 'loading' | 'scanning' | 'review' | 'nothing' | 'interrupted';
export type GmailSheet = { kind: 'candidate' | 'changes'; id: string } | { kind: 'inboxes' } | null;
// Reviewed values for a new plan (price, renewal or trial details).
export type CandidateEdit = Pick<GmailSelection, 'price' | 'next_date' | 'start_date' | 'trial'>;

const POLL_MS = 400;
const MONTHLY: Record<string, number> = { Weekly: 52 / 12, Monthly: 1, Quarterly: 1 / 3, Yearly: 1 / 12 };
export const UNAVAILABLE = 'Gmail connection is unavailable right now. Your saved subscriptions are unchanged.';

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
  // Each scan gets a token; progress from an older scan or after leaving is ignored.
  const scan_token = useRef(0);

  const scan = useCallback(
    async (target: ProfileInbox) => {
      const token = ++scan_token.current;
      setInbox(target);
      setPhase('scanning');
      setStage(0);
      setCandidates([]);
      setSaveError('');
      const job = await dispatch(beginGmailScan(target.id));
      if (token !== scan_token.current) return;
      if (!job) return setPhase('interrupted');
      setJobId(job);
      while (token === scan_token.current) {
        const status = await dispatch(readGmailScan(job));
        if (token !== scan_token.current) return;
        setStage(status.stage);
        if (status.status === 'failed') return setPhase('interrupted');
        if (status.status === 'completed') {
          setCandidates(status.candidates);
          // Confident new plans start selected; updates and saved ones do not.
          setSelected(status.candidates.filter(item => item.kind === 'new' && !item.saved).map(item => item.id));
          return;
        }
        await new Promise<void>(resolve => setTimeout(resolve, POLL_MS));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      const list = (await dispatch(fetchGmailInboxes())) ?? [];
      setInboxes(list);
      const first = list.find(item => item.id === route.params?.inbox_id) ?? list[0];
      if (!first) {
        dispatch(setNotice(UNAVAILABLE));
        goBack();
        return;
      }
      scan(first);
    })();
    return () => {
      scan_token.current += 1;
    };
  }, [dispatch, route.params?.inbox_id, scan]);

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
    for (const item of chosen.filter(entry => entry.kind === 'new').map(view)) totals.set(item.currency, (totals.get(item.currency) ?? 0) + Number(item.price) * (MONTHLY[item.cycle] ?? 1));
    return [...totals].map(([currency, total]) => `${currency} ${total.toFixed(2)}`).join(' · ') || '—';
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
  const title = phase === 'review' ? 'Review subscriptions' : phase === 'nothing' ? 'Scan complete' : phase === 'interrupted' ? 'Scan interrupted' : 'Find subscriptions';
  const sheet_candidate = sheet && sheet.kind !== 'inboxes' ? candidates.find(item => item.id === sheet.id) ?? null : null;

  const toggle = (id: string) => setSelected(current => (current.includes(id) ? current.filter(item => item !== id) : [...current, id]));
  const openReview = () => setPhase(actionable.length ? 'review' : 'nothing');
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
  const connectAnother = () => {
    setSheet(null);
    dispatch(setNotice(UNAVAILABLE));
  };
  const retry = () => inbox && scan(inbox);
  const addManually = () => navigate('AddSubscription');

  const save = async () => {
    if (!chosen.length || saving) return;
    setSaving(true);
    setSaveError('');
    const selections: GmailSelection[] = chosen.map(item => {
      const value = view(item);
      return { id: item.id, price: value.price, next_date: value.next_date, start_date: value.start_date, trial: value.trial, replace_date: item.kind === 'update' && replace_date };
    });
    const result = await dispatch(saveGmailSelections(job_id, selections));
    setSaving(false);
    if ('error' in result) return setSaveError(result.error);
    navigate('List');
  };

  return {
    inboxes,
    inbox,
    phase,
    stage,
    scan_done,
    title,
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
    openReview,
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
