import { retryOnboardingScan } from '../src/redux/actions/onboarding-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
const mockApi = { startScan: jest.fn() };
jest.mock('../src/api_services/request-handler', () => ({ __esModule: true, default: new Proxy({}, { get: (_target, key: string) => (...args: unknown[]) => (mockApi as Record<string, jest.Mock>)[key](...args) }) }));

const actions: { type: string; payload?: unknown }[] = [];
const dispatch = (action: unknown): unknown => {
  if (typeof action === 'function') return action(dispatch, () => ({ constant: { token: 't' } }), undefined);
  actions.push(action as { type: string });
  return action;
};
const types = () => actions.map(action => action.type);

beforeEach(() => {
  actions.length = 0;
  mockApi.startScan.mockReset();
});

// F-35: Discovering read the old failure while the new start was still out and bounced back to Interrupted.
test('Try again clears the old failure before the new scan start is sent', async () => {
  let answer: (value: unknown) => void = () => {};
  mockApi.startScan.mockReturnValue(new Promise(resolve => (answer = resolve)));
  const running = dispatch(retryOnboardingScan('c-1', '', jest.fn())) as Promise<void>;
  expect(types()).toContain('onboarding/restartScan');
  expect(types()).not.toContain('onboarding/setScanJob');
  answer({ jobId: 'job-2', status: 'queued' });
  await running;
  expect(actions.find(action => action.type === 'onboarding/setScanJob')?.payload).toBe('job-2');
});
