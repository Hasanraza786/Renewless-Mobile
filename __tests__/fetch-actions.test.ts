import { getAlerts } from '../src/redux/actions/alerts-action';
import { getSubscriptionDetail, restoreSubscription } from '../src/redux/actions/detail-action';
import { getPayments } from '../src/redux/actions/payments-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
// Adapters pass the wire rows through, so the tests see what the actions keep.
jest.mock('../src/api_services/adapters', () => ({
  toAlert: (row: unknown) => row,
  toPayment: (row: unknown) => row,
  toDetail: (detail: unknown) => detail,
  toRecord: (row: unknown) => row,
  hasCategories: () => true,
  setCategories: jest.fn(),
}));
const mockApi = { restoreSubscription: jest.fn(), getHome: jest.fn(), getAlerts: jest.fn(), getPayments: jest.fn(), getSubscription: jest.fn(), getPriceHistory: jest.fn(), getReminderSettings: jest.fn(), getSubscriptionReceipts: jest.fn() };
jest.mock('../src/api_services/request-handler', () => ({ __esModule: true, default: new Proxy({}, { get: (_target, key: string) => (...args: unknown[]) => (mockApi as Record<string, jest.Mock>)[key](...args) }) }));

const actions: { type: string; payload?: unknown }[] = [];
const dispatch = (action: unknown): unknown => {
  if (typeof action === 'function') return action(dispatch, () => ({ detail: { detail: null } }), undefined);
  actions.push(action as { type: string });
  return action;
};
const payloadsOf = (type: string) => actions.filter(action => action.type === type).map(action => action.payload);

beforeEach(() => {
  actions.length = 0;
  Object.values(mockApi).forEach(mock => mock.mockReset());
});

test('a reminder sent between two alert pages does not show the same row twice', async () => {
  mockApi.getAlerts
    .mockResolvedValueOnce({ items: [{ id: 'a3' }, { id: 'a2' }], nextCursor: '2' })
    .mockResolvedValueOnce({ items: [{ id: 'a2' }, { id: 'a1' }], nextCursor: null });
  await dispatch(getAlerts());
  expect(payloadsOf('alerts/setAlerts')).toEqual([[{ id: 'a3' }, { id: 'a2' }, { id: 'a1' }]]);
});

test('payments read the other years together and keep them in year order', async () => {
  const year = Number(new Date().getFullYear());
  mockApi.getPayments.mockImplementation(async ({ year: asked }: { year: number }) => ({ items: [{ id: `p${asked}` }], years: [year, year - 1, year - 2], nextCursor: null }));
  await dispatch(getPayments('account'));
  const [saved] = payloadsOf('payments/setPayments') as { payments: { id: string }[] }[];
  expect(saved.payments.map(row => row.id)).toEqual([`p${year}`, `p${year - 1}`, `p${year - 2}`]);
});

test('a late answer for a record left behind does not replace the record on screen', async () => {
  let answerA: (value: unknown) => void = () => {};
  mockApi.getSubscription.mockImplementation(({ id }: { id: string }) => (id === 'a' ? new Promise(resolve => (answerA = resolve)) : Promise.resolve({ id })));
  mockApi.getPriceHistory.mockResolvedValue({});
  mockApi.getReminderSettings.mockResolvedValue({});
  mockApi.getSubscriptionReceipts.mockResolvedValue(null);
  const first = dispatch(getSubscriptionDetail('a')) as Promise<void>;
  await dispatch(getSubscriptionDetail('b'));
  answerA({ id: 'a' });
  await first;
  const shown = payloadsOf('detail/setDetail').filter(Boolean) as { id: string }[];
  expect(shown.map(detail => detail.id)).toEqual(['b']);
});

test('Undo puts the restored record straight back into List, without reading every page', async () => {
  mockApi.restoreSubscription.mockResolvedValue({ id: 's1', name: 'Netflix' });
  mockApi.getHome.mockResolvedValue({});
  await dispatch(restoreSubscription('s1', 'undo-token'));
  expect(payloadsOf('list/upsertListRecords')).toEqual([[{ id: 's1', name: 'Netflix' }]]);
  expect(payloadsOf('list/setListRecords')).toEqual([]);
});
