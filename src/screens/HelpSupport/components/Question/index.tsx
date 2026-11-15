import { View } from 'react-native';
import { chevron_right_icon } from '../../../../assets/icons';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import RowView from '../../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { common_styles } from '../../../../utils/common_styles';
import { styles } from './styles';

type Props = { question: string; answer: string; open: boolean; divider: boolean; onToggle: (question: string) => void };

// A question opens its answer below it in the same card; the chevron turns down while open.
export default function Question({ question, answer, open, divider, onToggle }: Props) {
  return (
    <View style={divider && styles.divider}>
      <RowView gap={SIZES.padding / 2} accessibilityRole="button" accessibilityLabel={question} accessibilityState={{ expanded: open }} onPress={() => onToggle(question)} style={styles.row}>
        <CustomText text={question} size={SIZES.sm} style={common_styles.flex_1} />
        <View style={open && styles.chevron_open}>
          <Icons name={chevron_right_icon} />
        </View>
      </RowView>
      {open ? <CustomText mb={SIZES.padding * 0.6} text={answer} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={SIZES.padding} /> : null}
    </View>
  );
}
