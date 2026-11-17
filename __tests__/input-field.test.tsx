import React from 'react';
import { TextInput } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import InputField from '../src/components/InputField';

function typeInto(keyboardType: 'decimal-pad' | 'number-pad' | 'default', text: string) {
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

test('Arabic and Persian keypad digits and the Arabic decimal become 0-9 and "."', () => {
  expect(typeInto('decimal-pad', '٣٤٥٫٥٠')).toBe('345.50');
  expect(typeInto('number-pad', '۲۱')).toBe('21');
});
