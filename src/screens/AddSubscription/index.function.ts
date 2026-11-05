import { useEffect, useState } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { goBack, replace } from '../../navigation/service';
import { addSubscription, loadDetail, saveSubscription } from '../../redux/actions/detail-action';
import { setDetailError } from '../../redux/slices/detail-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { localToday } from '../../utils/dates';
import { draftFromRecord, draftToInput, emptyDraft, priceChanged, validateDraft, type SubscriptionDraft, type TrialOrigin } from '../../utils/subscription-form';

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

  // A stale save error from another screen never shows on a fresh form.
  useEffect(() => {
    dispatch(setDetailError({ key: 'mutation', value: '' }));
    if (edit_id && detail?.record.id !== edit_id) dispatch(loadDetail(edit_id));
    // Only on open: later Detail refreshes must not reset the draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, edit_id]);

  useEffect(() => {
    if (!record || draft) return;
    const loaded = draftFromRecord(record, today);
    setDraft(loaded.draft);
    setOrigin(loaded.origin);
  }, [record, draft, today]);

  const errors = submitted && draft ? validateDraft(draft, record, today) : {};
  const show_price_change = !!draft && priceChanged(draft, record);
  const status = draft ? 'ready' : load_error ? 'failed' : 'loading';
  const title = edit_id ? 'Edit subscription' : 'Add subscription';
  const action = edit_id ? 'Save changes' : 'Add subscription';

  const update = <Key extends keyof SubscriptionDraft>(key: Key, value: SubscriptionDraft[Key]) => {
    setDraft(current => (current ? { ...current, [key]: value } : current));
    if (request_error) dispatch(setDetailError({ key: 'mutation', value: '' }));
  };

  const pickService = (name: string, platform_id: string, category: string) =>
    setDraft(current => (current ? { ...current, name, platform_id, category } : current));

  const retry = () => edit_id && dispatch(loadDetail(edit_id));

  const onSubmit = async () => {
    if (!draft || saving) return;
    setSubmitted(true);
    if (Object.keys(validateDraft(draft, record, today)).length) return;
    const input = draftToInput(draft, origin, record, today);
    if (edit_id) {
      if (await dispatch(saveSubscription(edit_id, input))) goBack();
      return;
    }
    const id = await dispatch(addSubscription(input));
    // Replace the form so Back from the new Detail returns to where Add started.
    if (id) replace('SubscriptionDetail', { id });
  };

  return { draft, origin, errors, show_price_change, status, load_error, title, action, today, saving, request_error, update, pickService, retry, onSubmit };
}
