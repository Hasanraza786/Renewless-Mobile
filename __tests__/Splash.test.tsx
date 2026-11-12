import React from 'react';
import { AccessibilityInfo } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import Splash from '../src/screens/Splash';
import Icons from '../src/components/Icons';
import { BRAND_MOTION } from '../src/screens/Splash/index.function';
import { setSplashSeen } from '../src/redux/slices/constant-slice';

import { replace } from '../src/navigation/service';

// Splash only replaces itself with Onboarding through the navigation service.
jest.mock('../src/navigation/service', () => ({ replace: jest.fn() }));
const mock_replace = replace as jest.Mock;

const mock_dispatch = jest.fn();

jest.mock('react-native-safe-area-context', () => ({ SafeAreaView: require('react-native').View }));
jest.mock('../src/redux/store', () => ({ useAppDispatch: () => mock_dispatch }));
jest.mock('../src/components/Icons', () => {
  const ReactModule = require('react');
  return (props: object) => ReactModule.createElement(require('react-native').View, props);
});

beforeEach(() => { jest.useFakeTimers(); mock_dispatch.mockClear(); mock_replace.mockClear(); });
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });

test('Reduced Motion renders both completed strokes and completes once', async () => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
  const on_complete = mock_replace;
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => { tree = ReactTestRenderer.create(<Splash />); });
  const reveal = tree!.root.findByType(Icons).props.reveal;
  expect(reveal.progress.map((value: { __getValue: () => number }) => value.__getValue())).toEqual([1, 1]);
  expect(on_complete).toHaveBeenCalledWith('Onboarding');
  expect(mock_dispatch).toHaveBeenCalledWith(setSplashSeen());
  expect(on_complete).toHaveBeenCalledTimes(1);
  await act(async () => { tree!.update(<Splash />); });
  expect(on_complete).toHaveBeenCalledTimes(1);
  await act(async () => { tree!.unmount(); });
});

test('normal reveal completes after the timeline, with no completion after unmount', async () => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  const on_complete = mock_replace;
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => { tree = ReactTestRenderer.create(<Splash />); });
  expect(on_complete).not.toHaveBeenCalled();
  await act(async () => { jest.advanceTimersByTime(BRAND_MOTION.total_duration + 100); });
  expect(on_complete).toHaveBeenCalledTimes(1);
  await act(async () => { tree!.unmount(); });

  mock_replace.mockClear();
  const cancelled = mock_replace;
  await act(async () => { tree = ReactTestRenderer.create(<Splash />); });
  await act(async () => { jest.advanceTimersByTime(500); tree!.unmount(); });
  await act(async () => { jest.advanceTimersByTime(BRAND_MOTION.total_duration); });
  expect(cancelled).not.toHaveBeenCalled();
});
