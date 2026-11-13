import { changeAiConsent, syncAiConsent } from '../src/redux/actions/ai-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
const mockGetMe = jest.fn();
const mockSaveAiConsent = jest.fn(async (_data: unknown) => ({ user: {} }));
jest.mock('../src/api_services/request-handler', () => ({ __esModule: true, default: { getMe: () => mockGetMe(), saveAiConsent: (data: unknown) => mockSaveAiConsent(data) } }));
const getMe = mockGetMe;
const saveAiConsent = mockSaveAiConsent;

// Runs thunks like the store does; plain actions are collected.
function setup(ai_consent: boolean, ai_withdrawal_unsent = false) {
  const actions: unknown[] = [];
  const getState = () => ({ constant: { ai_consent, ai_withdrawal_unsent } }) as never;
  const dispatch = (action: unknown): unknown => (typeof action === 'function' ? action(dispatch, getState, undefined) : actions.push(action));
  return { dispatch, actions };
}
const flush = () => new Promise<void>(resolve => setTimeout(resolve, 0));

beforeEach(() => jest.clearAllMocks());

test('Allow and the Settings switch send the consent with the copy version, and turning it off sends false', async () => {
  const { dispatch } = setup(false);
  await dispatch(changeAiConsent(true));
  expect(saveAiConsent).toHaveBeenLastCalledWith({ consented: true, copyVersion: '2026-11-08' });
  await dispatch(changeAiConsent(false));
  expect(saveAiConsent).toHaveBeenLastCalledWith({ consented: false });
});

test('on launch a phone that allowed AI fixes a server record that has no consent', async () => {
  getMe.mockResolvedValueOnce({ user: { aiConsent: { consented: false, consentedAt: null, copyVersion: null } } });
  await setup(true).dispatch(syncAiConsent());
  await flush();
  expect(saveAiConsent).toHaveBeenCalledWith({ consented: true, copyVersion: '2026-11-08' });
});

test('on launch nothing is sent when the server already has consent or the phone never allowed AI', async () => {
  getMe.mockResolvedValueOnce({ user: { aiConsent: { consented: true, consentedAt: '2026-11-13T00:00:00Z', copyVersion: '2026-11-08' } } });
  await setup(true).dispatch(syncAiConsent());
  await setup(false).dispatch(syncAiConsent());
  await flush();
  expect(getMe).toHaveBeenCalledTimes(1);
  expect(saveAiConsent).not.toHaveBeenCalled();
});

test('a withdrawal that fails is remembered and sent again on the next app open', async () => {
  mockSaveAiConsent.mockRejectedValueOnce(new Error('offline'));
  const { dispatch, actions } = setup(true);
  await dispatch(changeAiConsent(false));
  expect(actions).toContainEqual({ type: 'constant/setAiWithdrawalUnsent', payload: true });

  const next = setup(false, true);
  await next.dispatch(syncAiConsent());
  expect(saveAiConsent).toHaveBeenLastCalledWith({ consented: false });
  expect(next.actions).toContainEqual({ type: 'constant/setAiWithdrawalUnsent', payload: false });
  expect(getMe).not.toHaveBeenCalled();
});
