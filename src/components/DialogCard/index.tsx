import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { styles } from './styles';

type Props = {
  title: string;
  subtitle: string;
  onClose: () => void;
  close_label: string;
  children: ReactNode;
  footer: ReactNode;
};

// Centered graphite dialog (Sort by, Status filters): fixed header and footer, scrollable options.
export default function DialogCard({ title, subtitle, onClose, close_label, children, footer }: Props) {
  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <Pressable accessibilityLabel={close_label} onPress={onClose} style={styles.scrim} />
      <View pointerEvents="box-none" style={styles.wrap}>
        <View accessibilityViewIsModal style={styles.dialog}>
          <RowView align_items="flex-start" gap={SIZES.padding2} style={styles.header}>
            <View style={common_styles.flex_1}>
              <CustomText text={title} size={SIZES.lg} accessibility_role="header" />
              <CustomText mt={SIZES.padding / 5} text={subtitle} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel={close_label} hitSlop={SIZES.padding3 / 2} onPress={onClose} style={styles.close}>
              <CustomText text="×" weight={FONTS.regular} size={SIZES.lg} line_height={null} />
            </Pressable>
          </RowView>
          <ScrollView bounces={false} contentContainerStyle={styles.body}>
            {children}
          </ScrollView>
          <View style={styles.footer}>{footer}</View>
        </View>
      </View>
    </Modal>
  );
}
