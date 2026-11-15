import { changeProductUpdates } from '../src/redux/actions/profile-action';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), goBack: jest.fn(), resetRoot: jest.fn() }));
const mockSave = jest.fn();
jest.mock('../src/api_services/request-handler', () => ({ __esModule: true, default: { savePreferences: (data: unknown) => mockSave(data) } }));

const user = { id: 'u1', name: 'Raza', email: 'r@example.com', phone: '', dateOfBirth: null, gender: null, provider: 'email', hasPassword: true, productUpdates: false, revision: 3 };
const dto = { ...user, emailVerified: true, providers: ['password'], timezone: 'UTC', onboardingCompleted: true };

function setup() {
  const actions: { type: string; payload: unknown }[] = [];
  const getState = () => ({ constant: { user } }) as never;
  const dispatch = (action: unknown): unknown => (typeof action === 'function' ? action(dispatch, getState, undefined) : actions.push(action as never));
  const shown = () => actions.filter(a => a.type === 'constant/setUser').map(a => (a.payload as typeof user).productUpdates);
  return { dispatch, actions, shown };
}

beforeEach(() => jest.clearAllMocks());

test('turning Product updates on moves the switch at once and sends true', async () => {
  mockSave.mockResolvedValueOnce({ user: { ...dto, productUpdates: true } });
  const { dispatch, shown } = setup();
  await dispatch(changeProductUpdates(true));
  expect(mockSave).toHaveBeenCalledWith({ productUpdates: true });
  expect(shown()).toEqual([true, true]);
});

test('a failed save puts the switch back and shows the error', async () => {
  mockSave.mockRejectedValueOnce(Object.assign(new Error('Check your connection.'), { status: 0, field_errors: {} }));
  const { dispatch, actions, shown } = setup();
  await dispatch(changeProductUpdates(true));
  expect(shown()).toEqual([true, false]);
  expect(actions.some(a => a.type === 'profile/setNotice')).toBe(true);
});

test('quick on/off taps keep the last choice even when the answers arrive out of order', async () => {
  let answerOn: (value: unknown) => void = () => {};
  mockSave.mockImplementationOnce(() => new Promise(resolve => (answerOn = resolve))).mockResolvedValueOnce({ user: { ...dto, productUpdates: false } });
  const { dispatch, shown } = setup();
  const first = dispatch(changeProductUpdates(true)) as Promise<void>;
  await dispatch(changeProductUpdates(false));
  answerOn({ user: { ...dto, productUpdates: true } });
  await first;
  expect(shown().at(-1)).toBe(false);
});
