import { useRef, useState, type ComponentRef, type RefObject } from 'react';
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
  // Studio placements tied to a view, at its width and without an arrow: 'below' opens 8pt under it with the view
  // undimmed (Calendar's card); 'over' covers it from its top (Connected inbox's Mailbox access row).
  anchor_ref?: RefObject<ComponentRef<typeof View> | null>;
  placement?: 'below' | 'over';
};

type Frame = { x: number; y: number; width: number; height: number };

// Popover sits 8pt above the row; the row itself is redrawn above the scrim so it stays readable.
export default function InfoTooltip({ label, paragraphs, anchor_ref, placement = 'below' }: Props) {
  const row_ref = useRef<ComponentRef<typeof View>>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [trigger_x, setTriggerX] = useState(0);
  const { height, width } = useWindowDimensions();

  const open = () => (anchor_ref ?? row_ref).current?.measureInWindow((x, y, w, h) => setFrame({ x, y, width: w, height: h }));
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

  const content = (
    <>
      <RowView gap={SIZES.padding3} style={styles.head}>
        <CustomText text={label} size={SIZES.lg} style={common_styles.flex_1} />
        <Pressable accessibilityRole="button" accessibilityLabel="Close information" hitSlop={SIZES.padding3 / 2} onPress={close} style={styles.close}>
          <Icons name={close_icon} />
        </Pressable>
      </RowView>
      {paragraphs.map(paragraph => (
        <CustomText key={paragraph} mt={SIZES.padding3} text={paragraph} weight={FONTS.regular} color={COLORS.tooltip_text} size={SIZES.sm} />
      ))}
    </>
  );

  return (
    <View ref={row_ref} collapsable={false} style={styles.row}>
      {row(open, false)}
      <Modal transparent visible={!!frame} animationType="fade" onRequestClose={close}>
        {/* Closes on touch-down so a light tap outside dismisses it, even during the fade-in. */}
        {anchor_ref && frame ? (
          <>
            {/* The scrim leaves a hole over the anchor so it stays readable; a tap anywhere still closes. */}
            <Pressable accessibilityLabel="Close information" onPressIn={close} style={[styles.scrim_part, styles.scrim_top, { height: frame.y }]} />
            <Pressable onPressIn={close} style={[styles.scrim_part, styles.scrim_bottom, { top: frame.y + frame.height }]} />
            <Pressable onPressIn={close} style={[styles.scrim_part, styles.scrim_left, { top: frame.y, width: frame.x, height: frame.height }]} />
            <Pressable onPressIn={close} style={[styles.scrim_part, { top: frame.y, left: frame.x + frame.width, width: width - frame.x - frame.width, height: frame.height }]} />
            <Pressable onPressIn={close} style={[common_styles.absolute, { top: frame.y, left: frame.x, width: frame.width, height: frame.height }]} />
          </>
        ) : (
          <Pressable accessibilityLabel="Close information" onPressIn={close} style={styles.scrim} />
        )}
        {frame && anchor_ref ? (
          <View accessibilityViewIsModal accessibilityRole="alert" style={[styles.popover, { left: frame.x, width: frame.width, top: placement === 'over' ? frame.y : frame.y + frame.height + SIZES.padding3 }]}>
            {content}
          </View>
        ) : frame ? (
          <>
            {/* box-none: taps on the label or empty row reach the scrim and close it; the icon still closes too. */}
            <View pointerEvents="box-none" style={[styles.row, common_styles.absolute, { left: frame.x, top: frame.y, width: frame.width }]}>{row(close, true)}</View>
            <View
              accessibilityViewIsModal
              accessibilityRole="alert"
              style={[styles.popover, { left: frame.x, width: frame.width, bottom: height - frame.y + SIZES.padding3 }]}>
              {content}
              <View style={[styles.arrow, { left: trigger_x - SIZES.padding / 4 }]} />
            </View>
          </>
        ) : null}
      </Modal>
    </View>
  );
}
