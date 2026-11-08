import { Pressable, View } from 'react-native';
import CustomText from '../../../components/CustomText';
import RowView from '../../../components/RowView';
import { SpendRows, TrialRows } from '../../../components/SpendRows';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { HomeController } from '../index.function';
import { styles } from '../styles';

export default function TopSpending({ home }: { home: HomeController }) {
  const { spending, trials } = home.data!;
  return (
    <View style={styles.panel}>
      <RowView justify_content="space-between">
        <CustomText text="Top spending" size={SIZES.lg} />
        <Pressable accessibilityRole="button" accessibilityLabel="View all spending" hitSlop={SIZES.padding3} onPress={home.openSpending} style={styles.view_all}>
          <CustomText text="View all ›" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </Pressable>
      </RowView>
      <CustomText mt={SIZES.padding2} text="Estimated monthly spend" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <SpendRows spending={spending} onPlatform={home.openPlatform} onOthers={home.openSpending} />
      <TrialRows trials={trials} onPress={home.openDetail} />
    </View>
  );
}
