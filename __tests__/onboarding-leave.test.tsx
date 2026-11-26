import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { navigate, resetRoot } from '../src/navigation/service';
import useOnboarding from '../src/screens/Onboarding/index.function';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), resetRoot: jest.fn(), goBack: jest.fn() }));
jest.mock('@react-navigation/native', () => ({ useFocusEffect: jest.fn() }));
const mockSave = jest.fn();
const mockDismiss = jest.fn();
jest.mock('../src/redux/actions/onboarding-action', () => ({
  answerScanNotify: jest.fn(),
  openBackgroundResults: jest.fn(),
  connectOnboardingGoogle: jest.fn(),
  connectOnboardingOutlook: jest.fn(),
  editOnboardingCandidate: jest.fn(),
  // The server marks onboarding complete, then the app goes on.
  finishOnboarding: (onDone: () => void) => {
    onDone();
    return { type: 'test/finish' };
  },
  getOnboardingScan: () => ({ type: 'test/poll' }),
  retryOnboardingScan: jest.fn(),
  saveOnboardingFinds: (...args: unknown[]) => {
    mockSave(...args);
    return { type: 'test/save' };
  },
}));
jest.mock('../src/redux/actions/gmail-action', () => ({
  dismissBackgroundScan: (id: string) => {
    mockDismiss(id);
    return { type: 'test/dismiss' };
  },
  getDeepStatus: jest.fn(),
}));
let mock_state: Record<string, unknown> = {};
jest.mock('../src/redux/store', () => ({ useAppDispatch: () => jest.fn(), useAppSelector: (select: (state: unknown) => unknown) => select(mock_state) }));

const state = (token: string, selected_ids: string[]) => ({
  constant: { token },
  profile: { user: { name: 'Sam' } },
  onboarding: { scan_status: 'completed', scan_failure: null, candidates: [], scan_job_id: 'job-1', connector_id: 'c-1', selected_ids, scan_meter: { phase: 'deep', progress: { total: 0, done: 0 }, live: null, deep: null }, scan_stages: [], save_loading: false },
});

async function renderOnboarding() {
  const result: { current: ReturnType<typeof useOnboarding> | null } = { current: null };
  function Probe() {
    result.current = useOnboarding({ key: 'Onboarding', name: 'Onboarding', params: { step: 'yourSubscriptions' } } as never);
    return null;
  }
  await act(async () => {
    ReactTestRenderer.create(<Probe />);
  });
  return result;
}

beforeEach(() => {
  jest.clearAllMocks();
});

test('signed in with plans ticked, Add manually asks first; Discard opens the Add form above Home', async () => {
  mock_state = state('token', ['a', 'b']);
  const hook = await renderOnboarding();
  await act(async () => hook.current?.openManual());
  expect(hook.current?.leave_intent).toBe('add_manual');
  expect(resetRoot).not.toHaveBeenCalled();
  await act(async () => hook.current?.discardAndLeave());
  expect(mockDismiss).toHaveBeenCalledWith('job-1');
  expect(mockSave).not.toHaveBeenCalled();
  expect(resetRoot).toHaveBeenCalledWith([{ name: 'Tabs' }, { name: 'AddSubscription' }]);
});

test('Save and continue saves the ticked plans, then opens AI chat above Home', async () => {
  mock_state = state('token', ['a', 'b']);
  const hook = await renderOnboarding();
  await act(async () => hook.current?.openAi());
  await act(async () => hook.current?.saveAndLeave());
  expect(mockSave).toHaveBeenCalledWith('job-1', ['a', 'b'], expect.any(Function));
  expect(resetRoot).not.toHaveBeenCalled();
  await act(async () => (mockSave.mock.calls[0][2] as () => void)());
  expect(resetRoot).toHaveBeenCalledWith([{ name: 'Tabs' }, { name: 'AiChat' }]);
});

test('× keeps the review open', async () => {
  mock_state = state('token', ['a']);
  const hook = await renderOnboarding();
  await act(async () => hook.current?.openManual());
  await act(async () => {
    hook.current?.closeLeave();
  });
  expect(hook.current?.leave_intent).toBeNull();
  expect(resetRoot).not.toHaveBeenCalled();
});

test('signed in with nothing ticked, the add path opens above Home without asking', async () => {
  mock_state = state('token', []);
  const hook = await renderOnboarding();
  await act(async () => hook.current?.openAi());
  expect(hook.current?.leave_intent).toBeNull();
  expect(resetRoot).toHaveBeenCalledWith([{ name: 'Tabs' }, { name: 'AiChat' }]);
});

test('signed out, Add manually still goes through Sign up', async () => {
  mock_state = state('', ['a']);
  const hook = await renderOnboarding();
  await act(async () => hook.current?.openManual());
  expect(navigate).toHaveBeenCalledWith('Signup', { intent: 'add_manual' });
  expect(hook.current?.leave_intent).toBeNull();
});
