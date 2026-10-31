import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import App from '../App';

let mock_bootstrapped = false;

jest.mock('react-native-safe-area-context', () => ({ SafeAreaProvider: require('react-native').View }));
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children: React.ReactNode }) => (mock_bootstrapped ? children : null),
}));
jest.mock('../src/redux/store', () => ({
  __esModule: true,
  default: require('@reduxjs/toolkit').configureStore({ reducer: () => ({}) }),
  persistor: {},
}));
jest.mock('../src/navigation/MainNavigator', () => {
  const ReactModule = require('react');
  return () => ReactModule.createElement(require('react-native').View, { testID: 'main-navigation' });
});

test('opens navigation only after persisted state has rehydrated', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer;
  await act(async () => { tree = ReactTestRenderer.create(<App />); });
  expect(tree!.root.findAllByProps({ testID: 'main-navigation' })).toHaveLength(0);
  mock_bootstrapped = true;
  await act(async () => { tree!.update(<App />); });
  expect(tree!.root.findByProps({ testID: 'main-navigation' })).toBeDefined();
  await act(async () => { tree!.unmount(); });
});
