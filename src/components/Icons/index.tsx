import { memo, useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';

type Props = {
  name: string;
  style?: StyleProp<ViewStyle>;
  icon_height?: number;
  fill?: string;
  stroke?: string;
};

function Icons({ name, style, icon_height, fill = 'transparent', stroke }: Props) {
  const svg = useMemo(
    () =>
      icon_height ? (
        <SvgXml stroke={stroke} xml={name} height={icon_height} fill={fill} />
      ) : (
        <SvgXml stroke={stroke} xml={name} fill={fill} />
      ),
    [fill, icon_height, name, stroke],
  );

  return <View style={[styles.main_view, style]}>{svg}</View>;
}

export default memo(Icons);
