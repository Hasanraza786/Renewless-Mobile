import { View } from 'react-native';
import { chevron_right_icon, platform_logos } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { styles } from './styles';
import RowView from '../RowView';

type Props = {
  name: string;
  platform_id: string;
  status: { label: string; color: string };
  // Timing, then optional plan/context lines; a line may carry its own colour (e.g. Add renewal date ›).
  lines: (string | { text: string; color: string })[];
  amount: string;
  caption: string;
  // Opt-in decorative chevron for cards that open Detail (Home, Upcoming).
  chevron?: boolean;
  onPress?: () => void;
  accessibility_label?: string;
};

// The one shared tracked-subscription card: logo, name, status, timing/context lines and the amount.
export default function SubscriptionCard({ name, platform_id, status, lines, amount, caption, chevron, onPress, accessibility_label }: Props) {
  const logo = platform_logos[platform_id];

  return (
    <RowView gap={SIZES.padding * 0.55} accessibilityRole="button" accessibilityLabel={accessibility_label ?? name} onPress={onPress} style={styles.main_view}>
      <View style={styles.avatar}>
        {logo ? <Icons name={logo} /> : <CustomText text={name.charAt(0)} size={SIZES.sm} />}
      </View>
      <View style={common_styles.flex_1}>
        <CustomText text={name} size={SIZES.md} />
        <CustomText mt={SIZES.padding / 4} text={status.label} weight={FONTS.regular} color={status.color} size={SIZES.sm} />
        {lines.map(line => {
          const { text, color } = typeof line === 'string' ? { text: line, color: COLORS.text_secondary } : line;
          return <CustomText key={text} mt={SIZES.padding * 0.15} text={text} weight={FONTS.regular} color={color} size={SIZES.sm} />;
        })}
      </View>
      <View style={styles.amount}>
        <CustomText text={amount} weight={FONTS.regular} size={SIZES.lg} align="center" />
        <CustomText mt={SIZES.padding / 5} text={caption} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
      </View>
      {chevron ? <Icons name={chevron_right_icon} /> : null}
    </RowView>
  );
}
