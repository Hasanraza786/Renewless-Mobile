import React from 'react';
import { AccessibilityInfo } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Onboarding from '../src/screens/Onboarding';
import { PANEL_MOTION, SCAN_COMPLETE_HOLD_MS, SCAN_POLL_MS } from '../src/screens/Onboarding/index.function';
import { MOCK_DATA } from '../src/config/mock-data';
import constantReducer from '../src/redux/slices/constant-slice';
import onboardingReducer from '../src/redux/slices/onboarding-slice';
import profileReducer from '../src/redux/slices/profile-slice';
import { resetMockOnboarding } from '../src/api_services/onboarding';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));
jest.mock('react-native-safe-area-context', () => ({ SafeAreaView: require('react-native').View, useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }) }));
jest.mock('@react-native-community/datetimepicker', () => require('react-native').View);
jest.mock('react-native-svg', () => {
  const NativeView = require('react-native').View;
  return { __esModule: true, default: NativeView, Circle: NativeView, Defs: NativeView, RadialGradient: NativeView, LinearGradient: NativeView, Rect: NativeView, Stop: NativeView, Path: NativeView, Ellipse: NativeView, SvgXml: NativeView };
});
jest.mock('../src/redux/store', () => {
jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), resetRoot: jest.fn() }));
  const redux = require('react-redux');
  return { useAppDispatch: () => redux.useDispatch(), useAppSelector: redux.useSelector };
});

const makeStore = () => configureStore({ reducer: { constant: constantReducer, onboarding: onboardingReducer, profile: profileReducer } });
const texts = (tree: ReactTestRenderer.ReactTestRenderer) =>
  tree.root.findAll(node => typeof node.props.text === 'string').map(node => node.props.text);
const press = (tree: ReactTestRenderer.ReactTestRenderer, label: string) =>
  tree.root.find(node => typeof node.props.onPress === 'function' && (node.props.accessibilityLabel === label || node.findAll(child => child.props.text === label).length > 0)).props.onPress();
// The panel leaves, then the next one enters after it has rendered (a separate update).
const settle = async () => {
  await act(async () => { jest.advanceTimersByTime(PANEL_MOTION.out_duration + 50); });
  await act(async () => { jest.advanceTimersByTime(PANEL_MOTION.in_duration + 50); });
};

beforeEach(() => {
  jest.useFakeTimers();
  resetMockOnboarding();
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
});
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });

const mount = async (store: ReturnType<typeof makeStore>) => {
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = ReactTestRenderer.create(<Provider store={store}><Onboarding route={{ key: 'o', name: 'Onboarding' } as any} /></Provider>);
  });
  await act(async () => { press(tree!, 'Find my subscriptions →'); });
  await act(async () => { press(tree!, 'Find my subscriptions →'); }); // ignored mid-transition
  await settle();
  return tree!;
};

test('connecting Google signs in, scans, and saving the reviewed selection opens Ready', async () => {
  const store = makeStore();
  const tree = await mount(store);

  await act(async () => { press(tree, 'Connect Gmail and Login'); });
  await settle();
  expect(store.getState().constant.token).toBe('mock-session-token');
  expect(texts(tree)).toContain('This may take a moment.');
  // Progress comes only from polled job status; results then open on their own.
  await act(async () => { jest.advanceTimersByTime(SCAN_POLL_MS * 4); });
  expect(store.getState().onboarding.scan_status).toBe('completed');
  await act(async () => { jest.advanceTimersByTime(SCAN_COMPLETE_HOLD_MS); });
  await settle();
  expect(texts(tree)).toEqual(expect.arrayContaining(['Found in alex@example.com', '3/3', 'Save 3 subscriptions →', 'USD 18.98']));

  // Edits stay in the draft: a changed amount updates the row and total.
  await act(async () => { press(tree, 'Edit iCloud+'); });
  await act(async () => { tree.root.find(node => node.props.keyboardType === 'decimal-pad' && typeof node.props.onChangeText === 'function').props.onChangeText('3.50'); });
  await act(async () => { press(tree, 'Update details'); });
  expect(texts(tree)).toEqual(expect.arrayContaining(['USD 3.50 · Monthly', 'USD 19.49']));

  await act(async () => { press(tree, 'Select Netflix, Renews ' + require('../src/utils/scan').dateLabel(store.getState().onboarding.candidates[0].next_date) + ' · estimated, USD 15.99 · Monthly'); });
  expect(texts(tree)).toEqual(expect.arrayContaining(['2/3', 'Save 2 subscriptions →', 'USD 3.50']));

  await act(async () => { press(tree, 'Save 2 subscriptions →'); });
  await settle();
  expect(texts(tree)).toEqual(expect.arrayContaining(['You’re all set,', 'Alex.', '2', 'subscriptions saved', 'USD 3.50', 'NEXT ESTIMATED RENEWAL']));

  // Back returns to Results; with nothing selected the user can continue without saving.
  await act(async () => { press(tree, 'Back'); });
  await settle();
  for (const name of ['Spotify', 'iCloud+']) {
    await act(async () => { tree.root.find(node => node.props.accessibilityRole === 'checkbox' && String(node.props.accessibilityLabel).startsWith(`Select ${name},`)).props.onPress(); });
  }
  expect(texts(tree)).toEqual(expect.arrayContaining(['Save 0 subscriptions →', 'Continue without saving']));
  expect(store.getState().onboarding.saved.map(item => item.id)).toEqual(['cand-spotify', 'cand-icloud']);
  await act(async () => { tree.unmount(); });
});

test('denied Gmail access keeps the new session but stays on Connect without scanning', async () => {
  const mock = MOCK_DATA as { connect_scenario: string };
  mock.connect_scenario = 'denied';
  try {
    const store = makeStore();
    const tree = await mount(store);
    await act(async () => { press(tree, 'Connect Gmail and Login'); });
    await settle();
    expect(store.getState().constant.token).toBe('mock-session-token');
    expect(store.getState().onboarding.scan_status).toBe('idle');
    expect(texts(tree)).toEqual(expect.arrayContaining(['You’re signed in. Allow Gmail access to scan, or add subscriptions manually.', 'You’re already signed in. We’ll ask permission to find subscriptions in your Gmail.']));
    await act(async () => { tree.unmount(); });
  } finally {
    mock.connect_scenario = 'granted';
  }
});
