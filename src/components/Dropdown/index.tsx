import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Keyboard, Modal, Pressable, ScrollView, TextInput, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chevron_down_icon, option_check_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { OPTION_DETAIL_HEIGHT, OPTION_HEIGHT, SEARCH_HEIGHT, styles } from './styles';
import { common_styles } from '../../utils/common_styles';
import RowView from '../RowView';

type Single<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  multiple?: false;
  disabled?: boolean;
  // Second line under an option (e.g. the currency name under its code); search matches it too.
  option_details?: Partial<Record<string, string>>;
  // A search field above the options in a wider menu.
  search?: { placeholder: string; empty: string };
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
  disabled?: boolean;
};

type Frame = { x: number; y: number; width: number; height: number };

const MAX_MENU = SIZES.padding * 13;
const MAX_SEARCH_MENU = SIZES.padding * 16;
const SEARCH_MENU_WIDTH = SIZES.padding * 11.8;

// Themed dropdown: the menu opens below the control, or above it when there is no room below.
export default function Dropdown<T extends string>(props: Single<T> | Multiple) {
  const control_ref = useRef<ComponentRef<typeof Pressable>>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [query, setQuery] = useState('');
  const [keyboard_height, setKeyboardHeight] = useState(0);
  const { height, width: screen_width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const gap = SIZES.padding * 0.3;
  const search = props.multiple ? undefined : props.search;
  const details = props.multiple ? undefined : props.option_details;
  const all_items = props.multiple ? props.items : props.options.map(option => ({ value: option as string, label: option as string }));
  const needle = query.trim().toLowerCase();
  const items = needle ? all_items.filter(item => `${item.label} ${details?.[item.value] ?? ''}`.toLowerCase().includes(needle)) : all_items;
  const isSelected = (value: string) => (props.multiple ? props.values.includes(value) : props.value === value);
  const display = props.multiple ? props.display : props.value;
  const option_height = details ? OPTION_DETAIL_HEIGHT : OPTION_HEIGHT;
  const content_height = search
    ? SEARCH_HEIGHT + Math.max(all_items.length, 1) * option_height + SIZES.padding * 0.6
    : items.length * option_height + SIZES.padding * 0.6;
  const wanted = Math.min(content_height, search ? MAX_SEARCH_MENU : MAX_MENU);
  const menu_width = frame ? Math.min(search ? Math.max(frame.width, SEARCH_MENU_WIDTH) : frame.width, screen_width - SIZES.padding * 2) : 0;
  const menu_left = frame ? Math.max(SIZES.padding, Math.min(frame.x, screen_width - menu_width - SIZES.padding)) : 0;

  // Typing in the search field must not hide the options behind the keyboard.
  useEffect(() => {
    if (!frame || !search) return;
    const show = Keyboard.addListener('keyboardDidShow', event => setKeyboardHeight(event.endCoordinates.height));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, [frame, search]);

  const open = () => control_ref.current?.measureInWindow((x, y, width, control_height) => setFrame({ x, y, width, height: control_height }));
  const close = () => {
    setFrame(null);
    setQuery('');
    setKeyboardHeight(0);
  };
  const choose = (value: string) => {
    if (props.multiple) return props.onToggle(value);
    props.onChange(value as T);
    close();
  };
  const bottom_limit = height - Math.max(insets.bottom, keyboard_height) - SIZES.padding3;
  const room_below = frame ? bottom_limit - frame.y - frame.height - gap : 0;
  // A search menu stays under a top-half field and shrinks to the room above the keyboard; others flip above when short of room.
  const below = frame ? room_below >= wanted || (!!search && frame.y < height / 2) : true;
  const menu_height = search && below ? Math.max(Math.min(wanted, room_below), option_height * 2) : wanted;

  return (
    <View style={styles.wrap}>
      <CustomText text={props.label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} mb={SIZES.padding * 0.3} />
      <Pressable
        ref={control_ref}
        accessibilityRole="button"
        accessibilityLabel={`${props.label}, ${display}`}
        accessibilityState={{ expanded: !!frame, disabled: !!props.disabled }}
        disabled={props.disabled}
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
            style={[styles.menu, { left: menu_left, width: menu_width, height: menu_height }, below ? { top: frame.y + frame.height + gap } : { top: frame.y - gap - menu_height }]}>
            {search ? (
              <View style={styles.search}>
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder={search.placeholder}
                  placeholderTextColor={COLORS.text_secondary}
                  accessibilityLabel={search.placeholder}
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.search_input}
                />
              </View>
            ) : null}
            <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={items.length * option_height > menu_height}>
              {search && !items.length ? <CustomText text={search.empty} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} style={styles.empty} /> : null}
              {items.map(item => {
                const selected = isSelected(item.value);
                return (
                  <RowView justify_content="space-between" gap={SIZES.padding2}
                    key={item.value}
                    accessibilityRole={props.multiple ? 'checkbox' : 'menuitem'}
                    accessibilityState={props.multiple ? { checked: selected } : { selected }}
                    onPress={() => choose(item.value)}
                    style={[styles.option, details && styles.option_detail, selected && styles.option_selected]}>
                    <View style={common_styles.flex_1}>
                      <CustomText text={item.label} weight={FONTS.regular} color={selected ? COLORS.primary : COLORS.text_primary} size={SIZES.sm} />
                      {details?.[item.value] ? <CustomText text={details[item.value]} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} /> : null}
                    </View>
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
