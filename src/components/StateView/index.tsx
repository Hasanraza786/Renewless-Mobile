import {
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import { styles } from './styles';

type Props = {
  status: 'loading' | 'failed' | 'empty';
  message: string;
  onRetry?: () => void;
};

export default function StateView({ status, message, onRetry }: Props) {
  return (
    <View style={styles.wrap}>
      {status === 'loading' ? <ActivityIndicator color={COLORS.primary} /> : null}
      <CustomText
        text={message}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={(SIZES.padding2 + SIZES.padding3 / 4)}
      />
      {status === 'failed' && onRetry ? (
        <CustomButton text="Try again" onPress={onRetry} />
      ) : null}
    </View>
  );
}
