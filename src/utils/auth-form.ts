import { useRef, useState, type ComponentRef } from 'react';
import type { TextInput } from 'react-native';
import type { AuthIntent } from '../types';

export type AuthField = 'name' | 'email' | 'password' | 'confirm';

const EMPTY: Record<AuthField, string> = {
  name: 'Enter your name.',
  email: 'Enter your email address.',
  password: 'Enter your password.',
  confirm: 'Confirm your password.',
};

// Same rules and copy as the approved auth forms.
export function authFieldError(field: AuthField, value: string, password = '') {
  if (!value.trim()) return EMPTY[field];
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address.';
  if (field === 'confirm' && value !== password) return 'Passwords do not match.';
  if ((field === 'password' || field === 'confirm') && value.length < 6) return 'Use at least 6 characters.';
  return '';
}

// A field is validated once it has been left (or the form submitted), then live while it is edited.
export function useAuthForm<K extends AuthField>(fields: K[], initial: Partial<Record<K, string>> = {}) {
  const [form_data, setFormData] = useState(() => Object.fromEntries(fields.map(field => [field, initial[field] ?? ''])) as Record<K, string>);
  // Latest values, so fields filled in the same tick (password autofill) don't overwrite each other.
  const latest = useRef(form_data);
  const [errors, setErrors] = useState<Partial<Record<K, string>>>({});
  const touched = useRef(new Set<K>());
  const inputs = useRef<Partial<Record<K, ComponentRef<typeof TextInput> | null>>>({});
  const check = (field: K, data: Record<K, string>) => authFieldError(field, data[field], (data as Record<AuthField, string>).password);

  const setField = (field: K, value: string) => {
    const next = { ...latest.current, [field]: value };
    latest.current = next;
    setFormData(next);
    setErrors(current => {
      const updated = { ...current };
      if (touched.current.has(field) || current[field]) updated[field] = check(field, next);
      // A changed password re-checks an already visited confirmation.
      const confirm = 'confirm' as K;
      if (field === ('password' as K) && fields.includes(confirm) && touched.current.has(confirm)) updated[confirm] = check(confirm, next);
      return updated;
    });
  };

  const validateAll = () => {
    fields.forEach(field => touched.current.add(field));
    const next = Object.fromEntries(fields.map(field => [field, check(field, latest.current)])) as Record<K, string>;
    setErrors(next);
    const first = fields.find(field => next[field]);
    if (first) inputs.current[first]?.focus();
    return !first;
  };

  const fieldProps = (field: K) => ({
    value: form_data[field],
    onChangeText: (value: string) => setField(field, value),
    onBlur: () => {
      touched.current.add(field);
      setErrors(current => ({ ...current, [field]: check(field, latest.current) }));
    },
    error: errors[field],
    ref: (input: ComponentRef<typeof TextInput> | null) => {
      inputs.current[field] = input;
    },
  });

  // Keyboard "next" moves to the given field.
  const focusField = (field: K) => () => inputs.current[field]?.focus();

  return { form_data: latest.current, errors, setErrors, validateAll, fieldProps, focusField };
}

type RootNavigation = { getParent: () => { reset: (state: { index: number; routes: { name: string }[] }) => void } | undefined };

// After authentication: the Add form for manual entry (above Home), otherwise Home.
export function enterApp(navigation: RootNavigation, intent?: AuthIntent) {
  const routes = intent === 'add_manual' ? [{ name: 'Tabs' }, { name: 'AddSubscription' }] : [{ name: 'Tabs' }];
  navigation.getParent()?.reset({ index: routes.length - 1, routes });
}
