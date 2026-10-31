import { Animated, View } from 'react-native';
import logo_mark, { brand_mark_paths } from '../../assets/icons/logo_mark';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import { FONTS, SIZES, colors } from '../../constants/theme';
import useSplash from './index.function';
import { styles } from './styles';

type Props = { onComplete?: () => void };

export default function Splash({ onComplete }: Props) {
  const { upper_progress, lower_progress, settle_progress, name_progress, tagline_progress } = useSplash(onComplete);
  const revealStyle = (progress: Animated.Value) => ({
    opacity: progress,
    transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [SIZES.padding3, 0] }) }],
  });

  return (
    <Container is_auth>
      <View style={styles.main_view}>
        <Animated.View
          style={[styles.mark, {
            transform: [
              { translateY: settle_progress.interpolate({ inputRange: [0, 1], outputRange: [SIZES.padding3, 0] }) },
              { scale: settle_progress.interpolate({ inputRange: [0, 1], outputRange: [0.93, 1] }) },
            ],
          }]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants">
          <Icons
            name={logo_mark}
            icon_height={SIZES.padding * 5}
            stroke={colors.accent}
            reveal={{ paths: brand_mark_paths, progress: [upper_progress, lower_progress], view_box: '0 0 51 51', stroke_width: 5.5 }}
          />
        </Animated.View>
        <Animated.View style={[styles.name, revealStyle(name_progress)]}>
          <CustomText text="Renewless" weight={FONTS.medium} size={(SIZES.padding + SIZES.padding2 / 2)} line_height={SIZES.wordmark_line} align="center" />
        </Animated.View>
        <Animated.View style={[styles.tagline, revealStyle(tagline_progress)]}>
          <CustomText
            text={'Stop the subscription renewals\nyou don’t need.'}
            weight={FONTS.regular}
            color={colors.text_secondary}
            size={(SIZES.padding2 + SIZES.padding3 / 8)}
            line_height={SIZES.body_line}
            align="center"
          />
        </Animated.View>
      </View>
    </Container>
  );
}
