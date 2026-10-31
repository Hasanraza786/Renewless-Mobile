import { useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton';
import Container from '../../components/Container';
import Header from '../../components/Header';
import CustomText from '../../components/CustomText';
import InputField from '../../components/InputField';
import { FONTS, SIZES } from '../../constants/theme';
import { changePassword } from '../../redux/actions/auth-action';
import { setAuthError } from '../../redux/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { styles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'ChangePassword'>;

export default function ChangePasswordScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading.password);
  const error = useAppSelector(state => state.auth.error.password);
  const [current_password, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function onSubmit() {
    if (password !== confirm) {
      dispatch(setAuthError({ key: 'password', value: 'Passwords do not match' }));
      return;
    }
    dispatch(changePassword(current_password, password, () => navigation.goBack()));
  }

  return (
    <Container is_auth>
      <View style={styles.main_view}>
      <Header title="Change password" onBack={() => navigation.goBack()} />
      <InputField
        label="Current password"
        value={current_password}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <InputField
        label="New password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        label="Confirm password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />
      {error ? <CustomText text={error} weight={FONTS.regular} size={(SIZES.padding2 + SIZES.padding3 / 4)} mb={SIZES.padding2} /> : null}
      <CustomButton text="Save" onPress={onSubmit} disabled={loading} />
      </View>
    </Container>
  );
}
