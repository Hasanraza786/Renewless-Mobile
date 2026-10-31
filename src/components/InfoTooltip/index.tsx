import { colors } from '../../constants/theme';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { info_icon } from '../../assets/icons';
import CustomText from '../CustomText';
import Icons from '../Icons';
import { styles } from './styles';

type Props = {
  label: string;
  paragraphs: string[];
};

export default function InfoTooltip({ label, paragraphs }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.wrap}>
      <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={() => setOpen(true)} style={styles.trigger}>
        <Icons name={info_icon} icon_height={20} stroke={colors.text_secondary} />
      </Pressable>
      <CustomText text={label} weight="Raleway-Regular" color={colors.text_secondary} size={11} line_height={16} />
      {open ? (
        <View style={styles.popover}>
          <View style={styles.popover_head}>
            <CustomText text={label} size={13} line_height={18} style={styles.popover_title} />
            <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => setOpen(false)} style={styles.close}>
              <CustomText text="×" size={20} line_height={22} />
            </Pressable>
          </View>
          {paragraphs.map(paragraph => (
            <CustomText key={paragraph} text={paragraph} weight="Raleway-Regular" color={colors.tooltip_text} size={12} line_height={20} mt={8} />
          ))}
        </View>
      ) : null}
    </View>
  );
}
