import { addAiDraft } from '../src/redux/actions/ai-action';
import { resumeSubscription, updateSubscription } from '../src/redux/actions/detail-action';
import { saveGmailResults } from '../src/redux/actions/gmail-action';
import { getAllSubscriptions } from '../src/redux/actions/list-action';
import type { SubscriptionFormInput } from '../src/types';
import { ApiError } from '../src/api_services/http-provider';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
// Adapters pass rows through; the form body is the input plus its platform, so the tests see what is sent.
jest.mock('../src/api_services/adapters', () => ({
  toRecord: (row: unknown) => row,
  toDetail: (detail: unknown) => detail,
  toAiReply: (turn: unknown) => turn,
  fromGmailSelection: (_item: unknown, selection: object) => selection,
  toSubscriptionBody: (input: object, platform_id: string | null) => ({ ...input, platformId: platform_id }),
  hasCategories: () => true,
  setCategories: jest.fn(),
}));
// Any service not set by a test answers with an empty object.
const mockApi: Record<string, jest.Mock> = {};
const api = (key: string) => (mockApi[key] ??= jest.fn(async () => ({})));
jest.mock('../src/api_services/request-handler', () => ({ __esModule: true, default: new Proxy({}, { get: (_target, key: string) => (...args: unknown[]) => api(key)(...args) }) }));

const record = { id: 'r1', revision: 4, currency: 'SAR', trial: { start_date: '2026-11-01', end_date: '2026-11-15' } };
const state = { detail: { detail: { record, account_reminder_days: [3, 1] } } };
const actions: { type: string; payload?: unknown }[] = [];
const dispatch = (action: unknown): unknown => {
  if (typeof action === 'function') return action(dispatch, () => state, undefined);
  actions.push(action as { type: string });
  return action;
};
const notices = () => actions.filter(action => action.type === 'profile/setNotice').map(action => action.payload);

beforeEach(() => {
  actions.length = 0;
  for (const key of Object.keys(mockApi)) delete mockApi[key];
});

test('List reads every page of records, not only the first', async () => {
  api('getSubscriptions').mockResolvedValueOnce({ items: [{ id: 'a' }], nextCursor: 'c2' }).mockResolvedValueOnce({ items: [{ id: 'b' }], nextCursor: null });
  expect(await getAllSubscriptions()).toEqual([{ id: 'a' }, { id: 'b' }]);
  expect(api('getSubscriptions').mock.calls[1][0]).toMatchObject({ cursor: 'c2', limit: 100 });
});

test('resume keeps the record’s currency, the typed amount as text, its revision and the account reminder days', async () => {
  const onSaved = jest.fn();
  await dispatch(resumeSubscription('r1', { price: '19.99', next_date: '2026-12-01', reminder: { mode: 'default' } } as never, onSaved));
  expect(api('resumeSubscription')).toHaveBeenCalledWith({ id: 'r1', revision: 4, price: { currency: 'SAR', amount: '19.99' }, anchorDate: '2026-12-01', reminderOffsets: [3, 1] });
  expect(onSaved).toHaveBeenCalled();
});

test('an edit that keeps the trial dates does not send the trial, so its exact end date stays', async () => {
  const input = { name: 'Shahid', platform_id: null, start_date: '2026-11-01', trial: { end_date: '2026-11-15' }, price: '25.00' } as unknown as SubscriptionFormInput;
  api('getPlatforms').mockResolvedValue({ platforms: [] });
  await dispatch(updateSubscription('r1', input, jest.fn()));
  const body = api('updateSubscription').mock.calls[0][0];
  expect(body).toMatchObject({ id: 'r1', revision: 4, price: '25.00', platformId: null });
  expect(body).not.toHaveProperty('trial');

  await dispatch(updateSubscription('r1', { ...input, trial: { end_date: '2026-11-20' } } as never, jest.fn()));
  expect(api('updateSubscription').mock.calls[1][0]).toHaveProperty('trial');
});

test('Gmail review saves each chosen edit, then imports only the chosen rows; a trial error names its field', async () => {
  const chosen = [{ id: 'c1' }, { id: 'c2' }] as never[];
  const onSaved = jest.fn();
  await dispatch(saveGmailResults('job', chosen, [{ id: 'c2', amount: '9.99' }] as never, onSaved, jest.fn()));
  expect(api('updateCandidate')).toHaveBeenCalledTimes(1);
  expect(api('updateCandidate')).toHaveBeenCalledWith({ job_id: 'job', id: 'c2', amount: '9.99' });
  expect(api('importScan')).toHaveBeenCalledWith({ job_id: 'job', candidate_ids: ['c1', 'c2'] });
  expect(onSaved).toHaveBeenCalled();

  const onFailed = jest.fn();
  api('importScan').mockRejectedValueOnce(new ApiError(400, 'VALIDATION', 'Check the details.', { 'trial.endDate': 'Trial end must be after its start.' }));
  await dispatch(saveGmailResults('job', chosen, [], jest.fn(), onFailed));
  expect(onFailed).toHaveBeenCalledWith('Trial end must be after its start.');
});

test('an AI draft for a tracked service asks first instead of saving a second record', async () => {
  const onAdded = jest.fn();
  const onDuplicate = jest.fn();
  api('createFromDraft').mockRejectedValueOnce(new ApiError(409, 'POSSIBLE_DUPLICATE', 'Already tracked', {}, { subscriptionIds: ['s9'] }));
  await dispatch(addAiDraft({ id: 'd1', revision: 2 } as never, onAdded, jest.fn(), onDuplicate));
  expect(onDuplicate).toHaveBeenCalledWith('s9');
  expect(onAdded).not.toHaveBeenCalled();
  expect(notices()).toEqual([]);

  api('createFromDraft').mockResolvedValueOnce({ subscriptionId: 's10', subscription: { id: 's10' } });
  await dispatch(addAiDraft({ id: 'd1', revision: 2 } as never, onAdded, jest.fn(), onDuplicate, true));
  expect(api('createFromDraft')).toHaveBeenLastCalledWith({ id: 'd1', revision: 2, separatePlan: true });
  expect(onAdded).toHaveBeenCalledWith('s10');
  expect(notices()).toEqual(['Subscription added.']);
});
