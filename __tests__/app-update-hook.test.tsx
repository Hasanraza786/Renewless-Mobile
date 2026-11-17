import React from 'react';
import { AppState, Linking, Platform } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import useAppUpdate from '../src/components/AppUpdate/index.function';
import type { AppConfig } from '../src/types';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('react-native-device-info', () => ({ getBuildNumber: () => '5', getVersion: () => '1.0', getBundleId: () => 'com.renewless.app' }));
const mockDispatch = jest.fn();
jest.mock('../src/redux/store', () => ({ useAppDispatch: () => mockDispatch, useAppSelector: () => 0 }));
let mock_config: AppConfig | null = null;
const mockGetAppConfig = jest.fn((onConfig: (config: AppConfig | null) => void) => onConfig(mock_config));
jest.mock('../src/redux/actions/app-action', () => ({ getAppConfig: (onConfig: (config: AppConfig | null) => void) => mockGetAppConfig(onConfig) }));

const config = (min_build: number, store_url = ''): AppConfig => ({ latest_version: '1.2', latest_build: 8, min_build, notes: [], store_url });

let foreground: (state: string) => void = () => {};
jest.spyOn(AppState, 'addEventListener').mockImplementation(((_type: string, listener: (state: string) => void) => {
  foreground = listener;
  return { remove: jest.fn() };
}) as never);
const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);

async function renderHook() {
  const result: { current: ReturnType<typeof useAppUpdate> | null } = { current: null };
  function Probe() {
    result.current = useAppUpdate();
    return null;
  }
  await act(async () => {
    ReactTestRenderer.create(<Probe />);
  });
  return result;
}

beforeEach(() => {
  mockDispatch.mockClear();
  mockGetAppConfig.mockClear();
  openURL.mockClear();
});

test('a required update cannot be dismissed; an optional one remembers Not now for its build', async () => {
  mock_config = config(6);
  const required = await renderHook();
  expect(required.current?.update?.required).toBe(true);
  required.current?.dismiss();
  expect(mockDispatch.mock.calls.filter(([action]) => action?.type === 'constant/setUpdateDismissed')).toHaveLength(0);

  mock_config = config(4);
  const optional = await renderHook();
  optional.current?.dismiss();
  expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'constant/setUpdateDismissed', payload: 8 }));
});

test('every return to the foreground checks again', async () => {
  mock_config = null;
  await renderHook();
  expect(mockGetAppConfig).toHaveBeenCalledTimes(1);
  await act(async () => foreground('background'));
  await act(async () => foreground('active'));
  expect(mockGetAppConfig).toHaveBeenCalledTimes(2);
});

test('Update now opens the admin link, else this app’s https store page', async () => {
  mock_config = config(6, 'https://example.com/store');
  (await renderHook()).current?.openStore();
  expect(openURL).toHaveBeenLastCalledWith('https://example.com/store');

  mock_config = config(6);
  const os = Platform.OS;
  Platform.OS = 'android';
  (await renderHook()).current?.openStore();
  expect(openURL).toHaveBeenLastCalledWith('https://play.google.com/store/apps/details?id=com.renewless.app');
  Platform.OS = 'ios';
  (await renderHook()).current?.openStore();
  expect(openURL).toHaveBeenLastCalledWith('https://apps.apple.com/app/id6827023344');
  Platform.OS = os;
});
