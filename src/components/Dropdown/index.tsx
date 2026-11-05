import { useRef, useState, type ComponentRef } from 'react';
import { Modal, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chevron_down_icon, option_check_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { OPTION_HEIGHT, styles } from './styles';
import RowView from '../RowView';

type Single<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  multiple?: false;
};

// Multi-select keeps the menu open; the screen owns the selection rules (exclusive/preset values).
type Multiple = {
  label: string;
  multiple: true;
  values: readonly string[];
  items: readonly { value: string; label: string }[];
  // Trigger text summarising the selection.
  display: string;
  onToggle: (value: string) => void;
};

type Frame = { x: number; y: number; width: number; height: number };

const MAX_MENU = SIZES.padding * 13;

// Themed dropdown: the menu opens below the control, or above it when there is no room below.
export default function Dropdown<T extends string>(props: Single<T> | Multiple) {
  const control_ref = useRef<ComponentRef<typeof Pressable>>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const gap = SIZES.padding * 0.3;
  const items = props.multiple ? props.items : props.options.map(option => ({ value: option as string, label: option as string }));
  const isSelected = (value: string) => (props.multiple ? props.values.includes(value) : props.value === value);
  const display = props.multiple ? props.display : props.value;
  const menu_height = Math.min(items.length * OPTION_HEIGHT + SIZES.padding * 0.6, MAX_MENU);

  const open = () => control_ref.current?.measureInWindow((x, y, width, control_height) => setFrame({ x, y, width, height: control_height }));
  const close = () => setFrame(null);
  const choose = (value: string) => {
    if (props.multiple) return props.onToggle(value);
    props.onChange(value as T);
    close();
  };
  const below = frame ? frame.y + frame.height + gap + menu_height <= height - insets.bottom - SIZES.padding3 : true;

  return (
    <View style={styles.wrap}>
      <CustomText text={props.label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding3} />
      <Pressable
        ref={control_ref}
        accessibilityRole="button"
        accessibilityLabel={`${props.label}, ${display}`}
        accessibilityState={{ expanded: !!frame }}
        onPress={open}
        style={styles.control}>
        <CustomText text={display} weight={FONTS.regular} size={SIZES.sm} number_of_lines={1} />
        <Icons name={chevron_down_icon} style={styles.chevron} />
      </Pressable>
      <Modal transparent visible={!!frame} animationType="fade" onRequestClose={close}>
        <Pressable accessibilityLabel={`Close ${props.label}`} onPress={close} style={styles.backdrop} />
        {frame ? (
          <View
            accessibilityRole="menu"
            style={[styles.menu, { left: frame.x, width: frame.width, height: menu_height }, below ? { top: frame.y + frame.height + gap } : { top: frame.y - gap - menu_height }]}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={items.length * OPTION_HEIGHT > MAX_MENU}>
              {items.map(item => {
                const selected = isSelected(item.value);
                return (
                  <RowView justify_content="space-between" gap={SIZES.padding2}
                    key={item.value}
                    accessibilityRole={props.multiple ? 'checkbox' : 'menuitem'}
                    accessibilityState={props.multiple ? { checked: selected } : { selected }}
                    onPress={() => choose(item.value)}
                    style={[styles.option, selected && styles.option_selected]}>
                    <CustomText text={item.label} weight={FONTS.regular} color={selected ? COLORS.primary : COLORS.text_primary} size={SIZES.sm} />
                    {selected ? <Icons name={option_check_icon} /> : null}
                  </RowView>
                );
              })}
            </ScrollView>
          </View>
        ) : null}
      </Modal>
    </View>
  );
}
