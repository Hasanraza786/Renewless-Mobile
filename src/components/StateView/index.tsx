import { useEffect, useState } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import Mascot from '../Mascot';
import { styles } from './styles';

type Props = {
  status: 'loading' | 'failed' | 'empty';
  message: string;
  onRetry?: () => void;
  // Main tabs (Home, List, Calendar, Payments): a failed load shows Home's approved error, the sad Loop, the message
  // and Try again centred between the header and the tab bar.
  centered?: boolean;
};

export default function StateView({ status, message, onRetry, centered }: Props) {
  const [reduce_motion, setReduceMotion] = useState(false);
  const centered_failed = centered && status === 'failed';

  useEffect(() => {
    if (!centered_failed) return;
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, [centered_failed]);

  // Loading: the animated mascot with the loading message under it.
  if (status === 'loading') {
    return (
      <View accessible accessibilityRole="progressbar" accessibilityLabel={message} style={[styles.wrap, styles.loading]}>
        <Mascot loop expression="neutral" size={SIZES.padding * 4} label={message} />
        <CustomText text={message} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.md} align="center" />
      </View>
    );
  }
  if (centered_failed) {
    return (
      <View style={styles.failed}>
        <Mascot expression="sad" size={SIZES.padding * 5.75} label="Loop" draw={!reduce_motion} />
        <CustomText text={message} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
        {onRetry ? <CustomButton variant="primary" text="Try again" onPress={onRetry} style={styles.retry} /> : null}
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
