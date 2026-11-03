import React from 'react';
import { AccessibilityInfo } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Onboarding from '../src/screens/Onboarding';
import { PANEL_MOTION, SCAN_POLL_MS } from '../src/screens/Onboarding/index.function';
import constantReducer from '../src/redux/slices/constant-slice';
import onboardingReducer from '../src/redux/slices/onboarding-slice';
import profileReducer from '../src/redux/slices/profile-slice';
import { resetMockOnboarding } from '../src/api_services/onboarding';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));
jest.mock('react-native-safe-area-context', () => ({ SafeAreaView: require('react-native').View }));
jest.mock('react-native-svg', () => {
  const NativeView = require('react-native').View;
  return { __esModule: true, default: NativeView, Circle: NativeView, Defs: NativeView, RadialGradient: NativeView, LinearGradient: NativeView, Rect: NativeView, Stop: NativeView, Path: NativeView, SvgXml: NativeView };
});
jest.mock('../src/redux/store', () => {
  const redux = require('react-redux');
  return { useAppDispatch: () => redux.useDispatch(), useAppSelector: redux.useSelector };
});

const makeStore = () => configureStore({ reducer: { constant: constantReducer, onboarding: onboardingReducer, profile: profileReducer } });
const texts = (tree: ReactTestRenderer.ReactTestRenderer) =>
  tree.root.findAll(node => typeof node.props.text === 'string').map(node => node.props.text);
const press = (tree: ReactTestRenderer.ReactTestRenderer, label: string) =>
  tree.root.find(node => typeof node.props.onPress === 'function' && (node.props.accessibilityLabel === label || node.findAll(child => child.props.text === label).length > 0)).props.onPress();
const settle = () => act(async () => { jest.advanceTimersByTime(PANEL_MOTION.out_duration + PANEL_MOTION.in_duration + 50); });

beforeEach(() => {
  jest.useFakeTimers();
  resetMockOnboarding();
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
});
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });

test('onboarding runs from Welcome through scan, selection and save to Ready', async () => {
  const store = makeStore();
  const navigation = { navigate: jest.fn(), getParent: () => ({ reset: jest.fn() }) } as any;
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = ReactTestRenderer.create(<Provider store={store}><Onboarding navigation={navigation} route={{ key: 'o', name: 'Onboarding' } as any} /></Provider>);
  });

  await act(async () => { press(tree!, 'Find my subscriptions →'); });
  await act(async () => { press(tree!, 'Find my subscriptions →'); }); // ignored mid-transition
  await settle();
  await act(async () => { press(tree!, 'Connect Gmail & scan'); });
  await settle();
  expect(texts(tree!)).toContain('alex@example.com');

  await act(async () => { press(tree!, 'Continue with Google →'); });
  await settle();
  expect(tree!.root.findAll(node => node.props.text === 'Review my subscriptions →')[0]).toBeDefined();
  // Progress comes only from polled job status.
  await act(async () => { jest.advanceTimersByTime(SCAN_POLL_MS * 4); });
  expect(store.getState().onboarding.scan_status).toBe('completed');

  await act(async () => { press(tree!, 'Review my subscriptions →'); });
  await settle();
  expect(texts(tree!)).toContain('Save 3 subscriptions →');
  await act(async () => { tree!.root.findAll(node => node.props.accessibilityRole === 'checkbox' && typeof node.props.onPress === 'function')[0].props.onPress(); });
  expect(texts(tree!)).toContain('Save 2 subscriptions →');

  await act(async () => { press(tree!, 'Save 2 subscriptions →'); });
  await settle();
  await act(async () => { press(tree!, 'Continue with Google'); });
  await settle();
  expect(texts(tree!)).toEqual(expect.arrayContaining(['You’re all set,', 'Alex.', '2', 'subscriptions saved']));
  expect(store.getState().constant.token).toBe('mock-session-token');
  await act(async () => { tree!.unmount(); });
});
