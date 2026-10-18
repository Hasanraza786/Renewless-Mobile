import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PrimaryButton from '../../components/PrimaryButton';
import Screen from '../../components/Screen';
import ScreenHeader from '../../components/ScreenHeader';
import TextField from '../../components/TextField';
import { colors } from '../../constants/colors';
import { changePassword } from '../../redux/actions/auth';
import { setAuthError } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';

type Props = NativeStackScreenProps<AppStackParamList, 'ChangePassword'>;

export default function ChangePasswordScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.password);
  const error = useAppSelector(state => state.auth.error.password);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function onSubmit() {
    if (password !== confirm) {
      dispatch(setAuthError({ key: 'password', value: 'Passwords do not match' }));
      return;
    }
    dispatch(changePassword(currentPassword, password, () => navigation.goBack()));
  }

  return (
    <Screen isAuth>
      <ScreenHeader title="Change password" onBack={() => navigation.goBack()} />
      <TextField
        label="Current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <TextField
        label="New password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextField
        label="Confirm password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton label="Save" onPress={onSubmit} disabled={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.navy,
    marginBottom: 12,
  },
});
