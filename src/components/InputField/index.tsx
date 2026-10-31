import { useState } from 'react';
import {
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import CustomText from '../CustomText';
import { FONTS, SIZES, colors } from '../../constants/theme';
import { styles } from './styles';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function InputField({
  label,
  value,
  onChangeText,
  error,
  onFocus,
  onBlur,
  ...input_props
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrap}>
      <CustomText text={label} weight={FONTS.regular} size={SIZES.field_label} line_height={SIZES.field_label_line} mb={SIZES.padding3} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.text_secondary}
        style={[styles.input, focused && styles.input_focused, error && styles.input_error]}
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
      {error ? (
        <CustomText
          text={error}
          color={colors.expired}
          weight={FONTS.regular}
          size={SIZES.supporting}
          line_height={SIZES.supporting_line}
          mt={SIZES.padding2 / 2}
        />
      ) : null}
    </View>
  );
}
