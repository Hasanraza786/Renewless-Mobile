import React from 'react';
import { AccessibilityInfo } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import Onboarding from '../src/screens/Onboarding';
import { PANEL_MOTION } from '../src/screens/Onboarding/index.function';

const mock_dispatch = jest.fn();

jest.mock('react-native-safe-area-context', () => ({ SafeAreaView: require('react-native').View }));
jest.mock('react-native-svg', () => {
  const NativeView = require('react-native').View;
  return { __esModule: true, default: NativeView, Circle: NativeView, Defs: NativeView, RadialGradient: NativeView, Stop: NativeView, Path: NativeView, SvgXml: NativeView };
});
jest.mock('../src/redux/actions/onboarding-action', () => ({ loadGoogleAccount: () => ({ type: 'load-google' }) }));
jest.mock('../src/redux/store', () => ({
  useAppDispatch: () => mock_dispatch,
  useAppSelector: (select: (state: object) => unknown) => select({ onboarding: { google_email: 'person@example.com' } }),
}));

const texts = (tree: ReactTestRenderer.ReactTestRenderer) =>
  tree.root.findAll(node => typeof node.props.text === 'string').map(node => node.props.text);
const press = (tree: ReactTestRenderer.ReactTestRenderer, label: string) =>
  tree.root.find(node => node.props.accessibilityRole === 'button' && (node.props.accessibilityLabel === label || node.findAll(child => child.props.text === label).length > 0) && typeof node.props.onPress === 'function').props.onPress();

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
});
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });

test('panels advance and go back through the approved logical steps, ignoring taps mid-transition', async () => {
  const navigation = { navigate: jest.fn() } as any;
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => { tree = ReactTestRenderer.create(<Onboarding navigation={navigation} route={{ key: 'o', name: 'Onboarding' } as any} />); });
  expect(texts(tree!)).toContain('Know what renews.');

  await act(async () => { press(tree!, 'Find my subscriptions →'); });
  await act(async () => { press(tree!, 'Find my subscriptions →'); }); // second tap during the exit is ignored
  await act(async () => { jest.advanceTimersByTime(PANEL_MOTION.out_duration + PANEL_MOTION.in_duration + 50); });
  expect(texts(tree!)).toContain('Less typing.');

  await act(async () => { press(tree!, 'Connect Gmail & scan'); });
  await act(async () => { jest.advanceTimersByTime(PANEL_MOTION.out_duration + PANEL_MOTION.in_duration + 50); });
  expect(texts(tree!)).toContain('person@example.com');

  await act(async () => { press(tree!, 'Back'); });
  await act(async () => { jest.advanceTimersByTime(PANEL_MOTION.out_duration + PANEL_MOTION.in_duration + 50); });
  expect(texts(tree!)).toContain('Less typing.');

  await act(async () => { press(tree!, 'I’ll add subscriptions manually'); });
  expect(navigation.navigate).toHaveBeenCalledWith('Signup');
  await act(async () => { tree!.unmount(); });
});
