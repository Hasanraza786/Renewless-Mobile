import React from 'react';
import { TextInput } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import InputField from '../src/components/InputField';

function typeInto(keyboardType: 'decimal-pad' | 'default', text: string) {
  const onChangeText = jest.fn();
  let tree!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    tree = ReactTestRenderer.create(<InputField label="Amount" value="" onChangeText={onChangeText} keyboardType={keyboardType} />);
  });
  act(() => tree.root.findByType(TextInput).props.onChangeText(text));
  return onChangeText.mock.calls[0][0];
}

test('a decimal-pad comma (EU, Brazil, Turkey regions) becomes the "." amounts use', () => {
  expect(typeInto('decimal-pad', '9,99')).toBe('9.99');
});

test('other keyboards keep commas', () => {
  expect(typeInto('default', 'a, b')).toBe('a, b');
});
