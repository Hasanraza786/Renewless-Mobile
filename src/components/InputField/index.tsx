import { useState, type ComponentRef, type Ref } from 'react';
import {
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import CustomText from '../CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { styles } from './styles';

type Props = TextInputProps & {
  label: string;
  error?: string;
  // 'sheet' is the compact field used inside bottom sheets; 'auth' is the approved auth form field.
  variant?: 'sheet' | 'auth';
  ref?: Ref<ComponentRef<typeof TextInput>>;
};

export default function InputField({
  label,
  value,
  onChangeText,
  error,
  onFocus,
  onBlur,
  variant,
  ref,
  style,
  ...input_props
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={variant ? undefined : styles.wrap}>
      {variant ? (
        <CustomText
          text={label}
          weight={FONTS.regular}
          color={COLORS.text_secondary}
          size={SIZES.sm}
          mb={variant === 'auth' ? SIZES.padding * 0.45 : SIZES.padding * 0.3}
        />
      ) : (
        <CustomText text={label} weight={FONTS.regular} size={SIZES.sm} mb={SIZES.padding3} />
      )}
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
        {...input_props}
      />
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
