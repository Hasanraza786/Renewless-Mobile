import { useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton';
import Container from '../../components/Container';
import Header from '../../components/Header';
import CustomText from '../../components/CustomText';
import InputField from '../../components/InputField';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { saveConnector } from '../../redux/actions/connectors-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { styles } from './styles';
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
    <Container is_auth>
      <View style={styles.main_view}>
      <Header title="Add connector" onBack={() => navigation.goBack()} />
      <CustomText
        text="Renewless reads renewal mail from this inbox. Enter the Gmail address to connect."
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={(SIZES.padding2 + SIZES.padding3 / 4)}
        line_height={SIZES.body_line}
        mb={SIZES.padding3 * 2}
      />
      <InputField
        label="Gmail address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {error ? <CustomText text={error} weight={FONTS.regular} size={(SIZES.padding2 + SIZES.padding3 / 4)} line_height={SIZES.body_line} mb={SIZES.padding2} /> : null}
      <CustomButton text="Save" onPress={onSubmit} disabled={loading} />
      </View>
    </Container>
  );
}
