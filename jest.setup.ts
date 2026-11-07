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
