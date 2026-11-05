import { useRef, useState, type ComponentRef } from 'react';
import { Modal, Pressable, View, useWindowDimensions } from 'react-native';
import { close_icon, info_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';
import RowView from '../RowView';

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
      {/* The label never takes the touch (selectable text would), so taps reach the scrim. */}
      <View pointerEvents="none">
        <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded }}
        onLayout={event => setTriggerX(event.nativeEvent.layout.x + event.nativeEvent.layout.width / 2)}
        onPress={onPress}
        style={styles.trigger}>
        <Icons name={info_icon} />
      </Pressable>
    </>
  );

  return (
    <View ref={row_ref} collapsable={false} style={styles.row}>
      {row(open, false)}
      <Modal transparent visible={!!frame} animationType="fade" onRequestClose={close}>
        {/* Closes on touch-down so a light tap outside dismisses it, even during the fade-in. */}
        <Pressable accessibilityLabel="Close information" onPressIn={close} style={styles.scrim} />
        {frame ? (
          <>
            {/* box-none: taps on the label or empty row reach the scrim and close it; the icon still closes too. */}
            <View pointerEvents="box-none" style={[styles.row, common_styles.absolute, { left: frame.x, top: frame.y, width: frame.width }]}>{row(close, true)}</View>
            <View
              accessibilityViewIsModal
              accessibilityRole="alert"
              style={[styles.popover, { left: frame.x, width: frame.width, bottom: height - frame.y + SIZES.padding3 }]}>
              <RowView gap={SIZES.padding3} style={styles.head}>
                <CustomText text={label} size={SIZES.lg} style={common_styles.flex_1} />
                <Pressable accessibilityRole="button" accessibilityLabel="Close information" hitSlop={SIZES.padding3 / 2} onPress={close} style={styles.close}>
                  <Icons name={close_icon} />
                </Pressable>
              </RowView>
              {paragraphs.map(paragraph => (
                <CustomText key={paragraph} mt={SIZES.padding3} text={paragraph} weight={FONTS.regular} color={COLORS.tooltip_text} size={SIZES.sm} />
              ))}
              <View style={[styles.arrow, { left: trigger_x - SIZES.padding / 4 }]} />
            </View>
          </>
        ) : null}
      </Modal>
    </View>
  );
}
