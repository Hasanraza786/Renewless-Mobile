import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { chevron_right_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import CustomText from '../CustomText';
import Icons from '../Icons';
import RowView from '../RowView';
import { styles } from './styles';

export type MenuItem = { label: string; icon: string; subtitle?: string; tone?: 'danger'; onPress: () => void };

// Titled card of navigation rows (Profile, Settings): icon tile, label, optional subtitle and chevron.
type Props = { title: string; items?: MenuItem[]; children?: ReactNode; style?: StyleProp<ViewStyle> };

export default function MenuGroup({ title, items, children, style }: Props) {
  return (
    <View style={[styles.section, style]}>
      <CustomText text={title} color={COLORS.text_secondary} size={SIZES.lg} accessibility_role="header" />
      <View style={styles.group}>
        {items?.map((item, index) => (
          <RowView
            key={item.label}
            accessibilityRole="button"
            accessibilityLabel={item.subtitle ? `${item.label}, ${item.subtitle}` : item.label}
            gap={SIZES.padding / 2}
            onPress={item.onPress}
            style={[styles.menu_row, index < items.length - 1 && styles.divider]}>
            <View style={styles.menu_icon}>
              <Icons name={item.icon} />
            </View>
            <View style={common_styles.flex_1}>
              <CustomText text={item.label} color={item.tone === 'danger' ? COLORS.danger : undefined} size={SIZES.sm} />
              {item.subtitle ? <CustomText mt={SIZES.padding / 4} text={item.subtitle} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} /> : null}
            </View>
            <Icons name={chevron_right_icon} />
          </RowView>
        ))}
        {children}
      </View>
    </View>
  );
}
