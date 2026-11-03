import { useRef, useState, type ComponentRef } from 'react';
import { Modal, Pressable, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chevron_down_icon, option_check_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { OPTION_HEIGHT, styles } from './styles';

type Props<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

type Frame = { x: number; y: number; width: number; height: number };

// Themed dropdown: the menu opens below the control, or above it when there is no room below.
export default function SelectField<T extends string>({ label, value, options, onChange }: Props<T>) {
  const control_ref = useRef<ComponentRef<typeof Pressable>>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const gap = SIZES.padding3 - SIZES.padding3 / 4;
  const menu_height = options.length * OPTION_HEIGHT + SIZES.padding3 + SIZES.padding3 / 2;

  const open = () => control_ref.current?.measureInWindow((x, y, width, control_height) => setFrame({ x, y, width, height: control_height }));
  const close = () => setFrame(null);
  const below = frame ? frame.y + frame.height + gap + menu_height <= height - insets.bottom - SIZES.padding3 : true;

  return (
    <View style={styles.wrap}>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={SIZES.padding - SIZES.padding3 / 4} mb={SIZES.padding3} />
      <Pressable
        ref={control_ref}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${value}`}
        accessibilityState={{ expanded: !!frame }}
        onPress={open}
        style={styles.control}>
        <CustomText text={value} weight={FONTS.regular} size={SIZES.sm} line_height={SIZES.padding - SIZES.padding3 / 4} number_of_lines={1} />
        <Icons name={chevron_down_icon} icon_height={SIZES.padding2 + SIZES.padding3 * 3 / 4} icon_width={SIZES.padding2 + SIZES.padding3 * 3 / 4} stroke={COLORS.text_primary} style={styles.chevron} />
      </Pressable>
      <Modal transparent visible={!!frame} animationType="fade" onRequestClose={close}>
        <Pressable accessibilityLabel={`Close ${label}`} onPress={close} style={styles.backdrop} />
        {frame ? (
          <View
            accessibilityRole="menu"
            style={[styles.menu, { left: frame.x, width: frame.width }, below ? { top: frame.y + frame.height + gap } : { top: frame.y - gap - menu_height }]}>
            {options.map(option => {
              const selected = option === value;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    onChange(option);
                    close();
                  }}
                  style={[styles.option, selected && styles.option_selected]}>
                  <CustomText text={option} weight={FONTS.regular} color={selected ? COLORS.primary : COLORS.text_primary} size={SIZES.sm} />
                  {selected ? <Icons name={option_check_icon} icon_height={SIZES.padding2 + SIZES.padding3 / 2 + SIZES.padding3 / 8} icon_width={SIZES.padding2 + SIZES.padding3 / 2 + SIZES.padding3 / 8} stroke={COLORS.primary} /> : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </Modal>
    </View>
  );
}
