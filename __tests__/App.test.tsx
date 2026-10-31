import React from 'react';
import { View } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import App from '../App';

let mock_bootstrapped = false;

jest.mock('react-native-safe-area-context', () => {
  const NativeView = require('react-native').View;
  return { SafeAreaProvider: NativeView };
});
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children: (ready: boolean) => React.ReactNode }) => children(mock_bootstrapped),
}));
jest.mock('../src/redux/store', () => ({
  __esModule: true,
  default: require('@reduxjs/toolkit').configureStore({ reducer: () => ({}) }),
  persistor: {},
}));
jest.mock('../src/navigation/RootNavigator', () => {
  const ReactModule = require('react');
  return () => ReactModule.createElement(require('react-native').View, { testID: 'root-navigation' });
});
jest.mock('../src/screens/Splash', () => {
  const ReactModule = require('react');
  return (props: { onComplete: () => void }) => ReactModule.createElement(require('react-native').View, { testID: 'splash', ...props });
});

test('keeps the same Splash through hydration and opens navigation only after reveal finishes', async () => {
  mock_bootstrapped = false;
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => { tree = ReactTestRenderer.create(<App />); });
  const initial_splash = tree!.root.findByProps({ testID: 'splash' });
  mock_bootstrapped = true;
  await act(async () => { tree!.update(<App />); });
  expect(tree!.root.findByProps({ testID: 'splash' })).toBe(initial_splash);
  expect(tree!.root.findAllByProps({ testID: 'root-navigation' })).toHaveLength(0);
  await act(async () => { initial_splash.props.onComplete(); });
  expect(tree!.root.findAllByProps({ testID: 'splash' })).toHaveLength(0);
  expect(tree!.root.findByType(View)).toBeDefined();
  expect(tree!.root.findByProps({ testID: 'root-navigation' })).toBeDefined();
  await act(async () => { tree!.unmount(); });
});

test('animation completion cannot bypass unfinished hydration', async () => {
  mock_bootstrapped = false;
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => { tree = ReactTestRenderer.create(<App />); });
  await act(async () => { tree!.root.findByProps({ testID: 'splash' }).props.onComplete(); });
  expect(tree!.root.findAllByProps({ testID: 'root-navigation' })).toHaveLength(0);
  mock_bootstrapped = true;
  await act(async () => { tree!.update(<App />); });
  expect(tree!.root.findByProps({ testID: 'root-navigation' })).toBeDefined();
  await act(async () => { tree!.unmount(); });
});
