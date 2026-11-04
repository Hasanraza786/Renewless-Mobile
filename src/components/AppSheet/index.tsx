import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Easing, KeyboardAvoidingView, Modal, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { close_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES, behavior } from '../../constants/theme';
import RowView from '../RowView';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = {
  visible: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
};

// Graphite bottom sheet: dimmed backdrop (no blur), handle, title row with close; outside tap closes.
export default function AppSheet({ visible, title, subtitle, onClose, children }: Props) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const rise = useRef(new Animated.Value(0)).current;

  // The backdrop fades with the modal while the sheet itself rises from the bottom edge.
  useEffect(() => {
    if (!visible) return;
    rise.setValue(0);
    Animated.timing(rise, { toValue: 1, duration: 280, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [rise, visible]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={behavior} style={styles.root}>
        <Pressable accessibilityLabel="Close" onPress={onClose} style={styles.scrim} />
        <Animated.View
          accessibilityViewIsModal
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, SIZES.padding * 1.5) },
            { transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }] },
          ]}>
          <View style={styles.handle} />
          <RowView align_items="flex-start" gap={SIZES.padding2} style={styles.header}>
            <View style={common_styles.flex_1}>
              <CustomText text={title} size={SIZES.lg} />
              {subtitle ? (
                <CustomText mt={SIZES.padding * 0.35} text={subtitle} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              ) : null}
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} style={styles.close}>
              <Icons name={close_icon} />
            </Pressable>
          </RowView>
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
