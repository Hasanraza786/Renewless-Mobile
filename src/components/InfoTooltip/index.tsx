import { useRef, useState, type ComponentRef } from 'react';
import { Modal, Pressable, View, useWindowDimensions } from 'react-native';
import { close_icon, info_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = {
  label: string;
  paragraphs: string[];
};

type Frame = { x: number; y: number; width: number; height: number };

// Popover sits 8pt above the row; the row itself is redrawn above the scrim so it stays readable.
export default function InfoTooltip({ label, paragraphs }: Props) {
  const row_ref = useRef<ComponentRef<typeof View>>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [trigger_x, setTriggerX] = useState(0);
  const { height } = useWindowDimensions();

  const open = () => row_ref.current?.measureInWindow((x, y, w, h) => setFrame({ x, y, width: w, height: h }));
  const close = () => setFrame(null);

  const row = (onPress: () => void, expanded: boolean) => (
    <>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={SIZES.padding * 0.9} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded }}
        onLayout={event => setTriggerX(event.nativeEvent.layout.x + event.nativeEvent.layout.width / 2)}
        onPress={onPress}
        style={styles.trigger}>
        <Icons name={info_icon} icon_height={SIZES.padding} stroke={COLORS.text_secondary} />
      </Pressable>
    </>
  );

  return (
    <View ref={row_ref} collapsable={false} style={styles.row}>
      {row(open, false)}
      <Modal transparent visible={!!frame} animationType="fade" onRequestClose={close}>
        <Pressable accessibilityLabel="Close information" onPress={close} style={styles.scrim} />
        {frame ? (
          <>
            <View style={[styles.row, styles.floating, { left: frame.x, top: frame.y, width: frame.width }]}>{row(close, true)}</View>
            <View
              accessibilityViewIsModal
              accessibilityRole="alert"
              style={[styles.popover, { left: frame.x, width: frame.width, bottom: height - frame.y + SIZES.padding3 }]}>
              <View style={styles.head}>
                <CustomText text={label} size={SIZES.lg} line_height={SIZES.padding * 1.1} style={common_styles.flex_1} />
                <Pressable accessibilityRole="button" accessibilityLabel="Close information" onPress={close} style={styles.close}>
                  <Icons name={close_icon} icon_height={SIZES.padding} stroke={COLORS.text_primary} />
                </Pressable>
              </View>
              {paragraphs.map(paragraph => (
                <CustomText key={paragraph} mt={SIZES.padding3} text={paragraph} weight={FONTS.regular} color={COLORS.tooltip_text} size={SIZES.sm} line_height={SIZES.padding * 0.9} />
              ))}
              <View style={[styles.arrow, { left: trigger_x - SIZES.padding / 4 }]} />
            </View>
          </>
        ) : null}
      </Modal>
    </View>
  );
}
