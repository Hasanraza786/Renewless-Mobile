/* global jest */
jest.mock('react-native-haptic-feedback', () => ({ __esModule: true, default: { trigger: jest.fn() } }));

jest.mock('react-native-confirmation-code-field', () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  return {
    CodeField: (props: { value?: string; onChangeText?: (value: string) => void }) =>
      React.createElement(TextInput, {
        value: props.value,
        onChangeText: props.onChangeText,
      }),
    Cursor: () => null,
    useBlurOnFulfill: () => ({ current: null }),
    useClearByFocusCell: () => [{}, () => () => undefined],
  };
});

jest.mock('react-native-mmkv', () => {
  const memory = new Map<string, string>();
  return {
    createMMKV: () => ({
      set: (key: string, value: string) => {
        memory.set(key, value);
      },
      getString: (key: string) => (memory.has(key) ? memory.get(key) : undefined),
      remove: (key: string) => memory.delete(key),
    }),
  };
});

jest.mock('react-native-device-info', () => ({
  getUniqueId: jest.fn(async () => 'device-1'),
  getDeviceName: jest.fn(async () => 'Test phone'),
  getVersion: jest.fn(() => '1.0.0'),
}));

// The session token lives in the Keychain; tests keep it in memory.
jest.mock('react-native-keychain', () => {
  let saved: { username: string; password: string } | false = false;
  return {
    ACCESSIBLE: { AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY: 'AfterFirstUnlockThisDeviceOnly' },
    getGenericPassword: jest.fn(async () => saved),
    setGenericPassword: jest.fn(async (username: string, password: string) => {
      saved = { username, password };
      return true;
    }),
    resetGenericPassword: jest.fn(async () => {
      saved = false;
      return true;
    }),
  };
});

jest.mock('@react-native-firebase/analytics', () => ({
  getAnalytics: jest.fn(() => ({})),
  logEvent: jest.fn(),
  logScreenView: jest.fn(),
  setAnalyticsCollectionEnabled: jest.fn(),
}));

// Native push: no OS prompt or FCM token in tests.
jest.mock('./src/utils/push', () => ({ pushToken: jest.fn(async () => null), listenToPush: jest.fn(() => () => undefined) }));
// Native Google/Apple sheets; tests set what the provider returns.
jest.mock('./src/utils/social-sign-in', () => ({ providerSignIn: jest.fn() }));
