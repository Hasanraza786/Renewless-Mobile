import { View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import Mascot from '../Mascot';
import { styles } from './styles';

type Props = {
  status: 'loading' | 'failed' | 'empty';
  message: string;
  onRetry?: () => void;
};

export default function StateView({ status, message, onRetry }: Props) {
  // Loading: the animated mascot with the loading message under it.
  if (status === 'loading') {
    return (
      <View accessible accessibilityRole="progressbar" accessibilityLabel={message} style={[styles.wrap, styles.loading]}>
        <Mascot loop expression="neutral" size={SIZES.padding * 4} label={message} />
        <CustomText text={message} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.md} align="center" />
      </View>
    );
  }
  return (
    <View style={styles.wrap}>
      <CustomText
        text={message}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.md}
      />
      {status === 'failed' && onRetry ? (
        <CustomButton text="Try again" onPress={onRetry} />
      ) : null}
    </View>
  );
}
