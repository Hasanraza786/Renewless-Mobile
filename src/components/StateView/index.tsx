import {
  ActivityIndicator,
  View,
} from 'react-native';
import { FONTS, SIZES, colors } from '../../constants/theme';
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
      {status === 'loading' ? <ActivityIndicator color={colors.accent} /> : null}
      <CustomText
        text={message}
        weight={FONTS.regular}
        color={colors.text_secondary}
        size={SIZES.body}
        line_height={SIZES.body_line}
      />
      {status === 'failed' && onRetry ? (
        <CustomButton text="Try again" onPress={onRetry} />
      ) : null}
    </View>
  );
}
