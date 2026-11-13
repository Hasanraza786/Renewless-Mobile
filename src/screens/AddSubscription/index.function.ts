import { useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { goBack, replace } from '../../navigation/service';
import { createSubscription, getSubscriptionDetail, updateSubscription } from '../../redux/actions/detail-action';
import { setDetailError } from '../../redux/slices/detail-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { localToday } from '../../utils/dates';
import { draftFromRecord, draftServerErrors, draftToInput, emptyDraft, firstInvalid, priceChanged, validateDraft, type DraftErrors, type DraftField, type SubscriptionDraft, type TrialOrigin } from '../../utils/subscription-form';

export type SubscriptionFormRoute = RouteProp<AppStackParamList, 'AddSubscription'> | RouteProp<AppStackParamList, 'EditSubscription'>;

// Add starts empty; Edit preloads the saved record. Errors show after the first submit, then update live.
export default function useSubscriptionForm(route: SubscriptionFormRoute) {
  const dispatch = useAppDispatch();
  const edit_id = route.name === 'EditSubscription' ? route.params.id : null;
  const detail = useAppSelector(state => state.detail.detail);
  const saving = useAppSelector(state => state.detail.loading.mutation);
  const request_error = useAppSelector(state => state.detail.error.mutation);
  const load_error = useAppSelector(state => state.detail.error.detail);
  const record = edit_id && detail?.record.id === edit_id ? detail.record : null;
  const today = localToday();
  const [draft, setDraft] = useState<SubscriptionDraft | null>(edit_id ? null : emptyDraft());
  const [origin, setOrigin] = useState<TrialOrigin>(null);
  const [submitted, setSubmitted] = useState(false);
  // The server's field messages from the last save, cleared when that field is edited.
  const [server_errors, setServerErrors] = useState<DraftErrors>({});
  // The first invalid field after a failed submit; `at` makes a repeat submit scroll there again.
  const [focus_request, setFocusRequest] = useState<{ field: DraftField; at: number } | null>(null);

  // A stale save error from another screen never shows on a fresh form.
  useEffect(() => {
    dispatch(setDetailError({ key: 'mutation', value: '' }));
    if (edit_id && detail?.record.id !== edit_id) dispatch(getSubscriptionDetail(edit_id));
    // Only on open: later Detail refreshes must not reset the draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, edit_id]);

  useEffect(() => {
    if (!record || draft) return;
    const loaded = draftFromRecord(record, today);
    setDraft(loaded.draft);
    setOrigin(loaded.origin);
  }, [record, draft, today]);

  const errors = { ...server_errors, ...(submitted && draft ? validateDraft(draft, record, today) : {}) };
  const show_price_change = !!draft && priceChanged(draft, record);
  const status = draft ? 'ready' : load_error ? 'failed' : 'loading';
  const title = edit_id ? 'Edit subscription' : 'Add subscription';
  const action = edit_id ? 'Save changes' : 'Add subscription';

  const update = <Key extends keyof SubscriptionDraft>(key: Key, value: SubscriptionDraft[Key]) => {
    setDraft(current => (current ? { ...current, [key]: value } : current));
    setServerErrors(current => (key in current ? { ...current, [key]: undefined } : current));
    if (request_error) dispatch(setDetailError({ key: 'mutation', value: '' }));
  };

  const pickService = (name: string, platform_id: string, category: string) =>
    setDraft(current => (current ? { ...current, name, platform_id, category } : current));

  const retry = () => edit_id && dispatch(getSubscriptionDetail(edit_id));

  const focusFirst = (found: DraftErrors) => {
    const field = firstInvalid(found);
    if (field) setFocusRequest({ field, at: Date.now() });
  };
  const onFieldErrors = (field_errors: Record<string, string>) => {
    const found = draftServerErrors(field_errors);
    setServerErrors(found);
    focusFirst(found);
  };

  // Replace the form so Back from the new Detail returns to where Add started.
  const openAdded = (id: string) => replace('SubscriptionDetail', { id });

  const onSubmit = () => {
    if (!draft || saving) return;
    setSubmitted(true);
    const invalid = validateDraft(draft, record, today);
    if (Object.keys(invalid).length) return focusFirst(invalid);
    const input = draftToInput(draft, origin, record, today);
    setServerErrors({});
    if (edit_id) dispatch(updateSubscription(edit_id, input, goBack, onFieldErrors));
    else dispatch(createSubscription(input, openAdded, 'manual', onFieldErrors));
  };

  return { draft, origin, errors, show_price_change, status, load_error, title, action, today, saving, request_error, focus_request, update, pickService, retry, onSubmit };
}
