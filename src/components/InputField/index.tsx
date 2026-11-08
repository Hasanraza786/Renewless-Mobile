import { useState, type ComponentRef, type Ref } from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';
import { eye_icon, eye_off_icon } from '../../assets/icons';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = TextInputProps & {
  label: string;
  // Sheet variant: right-aligned note on the label line (e.g. USD · Monthly).
  label_end?: string;
  error?: string;
  // Help text under the field, above any error (e.g. Use at least 8 characters.).
  hint?: string;
  // 'sheet' is the compact field used inside bottom sheets; 'auth' is the approved auth form field;
  // 'form' is the account form field (Edit profile, Change password).
  variant?: 'sheet' | 'auth' | 'form';
  // With secureTextEntry: a trailing Show/Hide toggle (the caller's style leaves room for it).
  reveal?: boolean;
  ref?: Ref<ComponentRef<typeof TextInput>>;
};

export default function InputField({
  label,
  label_end,
  value,
  onChangeText,
  error,
  hint,
  onFocus,
  onBlur,
  variant,
  ref,
  style,
  reveal,
  secureTextEntry,
  ...input_props
}: Props) {
  const [focused, setFocused] = useState(false);
  const [shown, setShown] = useState(false);

  return (
    <View style={variant ? undefined : styles.wrap}>
      {variant ? (
        <RowView justify_content="space-between" style={variant === 'auth' ? styles.label_auth : styles.label_sheet}>
          <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {label_end ? <CustomText text={label_end} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} /> : null}
        </RowView>
      ) : (
        <CustomText text={label} weight={FONTS.regular} size={SIZES.sm} mb={SIZES.padding3} />
      )}
      <View>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.text_secondary}
          accessibilityLabel={label}
          accessibilityHint={error || undefined}
          // A caller's style extends the variant (e.g. a taller multiline field); it never replaces it.
          style={[variant ? styles[`${variant}_input`] : styles.input, style, focused && styles.input_focused, !!error && styles.input_error]}
          onFocus={event => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={event => {
            setFocused(false);
            onBlur?.(event);
          }}
          secureTextEntry={secureTextEntry && !shown}
          {...input_props}
        />
        {reveal ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${shown ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
            onPress={() => setShown(current => !current)}
            style={[common_styles.absolute, styles.reveal]}>
            <Icons name={shown ? eye_off_icon : eye_icon} />
          </Pressable>
        ) : null}
      </View>
      {hint ? <CustomText mt={SIZES.padding3} text={hint} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} /> : null}
      {error && variant ? (
        <CustomText mt={SIZES.padding * 0.35} text={error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} />
      ) : error ? (
        <CustomText
          text={error}
          color={COLORS.expired}
          weight={FONTS.regular}
          size={SIZES.sm}
          mt={SIZES.padding2 / 2}
        />
      ) : null}
    </View>
  );
}
