import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthLayout, { AuthError, AuthPrompt } from '../../components/AuthLayout';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';
import { colors } from '../../constants/colors';
import { login } from '../../redux/actions/auth';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.login);
  const error = useAppSelector(state => state.auth.error.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    dispatch(login(email.trim(), password));
  }

  return (
    <AuthLayout
      title="Log in"
      plain
      logo
      footer={
        <AuthPrompt
          label="Don’t have an account?"
          link="Create an account"
          onPress={() => navigation.navigate('Signup')}
        />
      }>
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
      />
      <Pressable
        accessibilityRole="link"
        hitSlop={8}
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot password</Text>
      </Pressable>
      <AuthError message={error} />
      <PrimaryButton label="Log in" onPress={onSubmit} disabled={loading} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: -8,
  },
  forgotText: {
    color: colors.mint,
    fontSize: 14,
    fontWeight: '600',
  },
});
