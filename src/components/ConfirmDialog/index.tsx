import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Pressable, ScrollView, View } from 'react-native';
import { FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { styles } from './styles';

type Props = {
  title: string;
  close_label: string;
  onClose: () => void;
  // Blocks scrim/× dismissal while a request is in flight.
  locked?: boolean;
  // AI chat consent: centered art and title, no ×; the actions decide.
  art?: ReactNode;
  children: ReactNode;
};

// Compact centered confirmation (Log out, Delete account): title with ×, then the caller's copy and actions.
export default function ConfirmDialog({ title, close_label, onClose, locked, art, children }: Props) {
  const close = () => {
    if (!locked) onClose();
  };
  return (
    <Modal transparent visible animationType="fade" onRequestClose={close}>
      <Pressable accessibilityLabel={close_label} onPress={close} style={styles.scrim} />
      <KeyboardAvoidingView behavior="padding" pointerEvents="box-none" style={styles.wrap}>
        <View accessibilityViewIsModal style={styles.dialog}>
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.body}>
            {art ? (
              <>
                <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.art}>
                  {art}
                </View>
                <CustomText text={title} size={SIZES.lg} align="center" accessibility_role="header" />
              </>
            ) : (
              <RowView gap={SIZES.padding / 2}>
                <View style={common_styles.flex_1}>
                  <CustomText text={title} size={SIZES.lg} accessibility_role="header" />
                </View>
                <Pressable accessibilityRole="button" accessibilityLabel={close_label} disabled={locked} onPress={close} style={styles.close}>
                  <CustomText text="×" weight={FONTS.regular} size={SIZES.lg} line_height={null} />
                </Pressable>
              </RowView>
            )}
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
