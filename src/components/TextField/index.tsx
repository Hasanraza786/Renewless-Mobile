import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors } from '../../constants/colors';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function TextField({
  label,
  value,
  onChangeText,
  error,
  onFocus,
  onBlur,
  ...inputProps
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.muted}
        style={[styles.input, focused && styles.inputFocused, error && styles.inputError]}
        onFocus={event => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={event => {
          setFocused(false);
          onBlur?.(event);
        }}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
  },
  label: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.navy,
    fontSize: 16,
    height: 52,
    paddingHorizontal: 14,
    paddingVertical: 0,
  },
  inputFocused: {
    borderColor: colors.mint,
  },
  inputError: {
    borderColor: '#B91C1C',
  },
  error: {
    color: colors.navy,
    fontSize: 13,
    marginTop: 6,
  },
});
