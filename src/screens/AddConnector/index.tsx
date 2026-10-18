import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PrimaryButton from '../../components/PrimaryButton';
import Screen from '../../components/Screen';
import ScreenHeader from '../../components/ScreenHeader';
import TextField from '../../components/TextField';
import { colors } from '../../constants/colors';
import { saveConnector } from '../../redux/actions/connectors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';

type Props = NativeStackScreenProps<AppStackParamList, 'AddConnector'>;

export default function AddConnectorScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.connectors.loading.create);
  const error = useAppSelector(state => state.connectors.error.create);
  const [email, setEmail] = useState('');

  function onSubmit() {
    dispatch(saveConnector(email.trim(), () => navigation.goBack()));
  }

  return (
    <Screen isAuth>
      <ScreenHeader title="Add connector" onBack={() => navigation.goBack()} />
      <Text style={styles.copy}>
        Renewless reads renewal mail from this inbox. Enter the Gmail address to connect.
      </Text>
      <TextField
        label="Gmail address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton label="Save" onPress={onSubmit} disabled={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  error: {
    color: colors.navy,
    marginBottom: 12,
  },
});
