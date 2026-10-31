import { memo, useMemo } from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path, SvgXml } from 'react-native-svg';
import { colors } from '../../constants/theme';

import { styles } from './styles';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = {
  name: string;
  style?: StyleProp<ViewStyle>;
  icon_height?: number;
  fill?: string;
  stroke?: string;
  reveal?: {
    paths: readonly { d: string; length: number }[];
    progress: readonly Animated.Value[];
    view_box: string;
    stroke_width: number;
  };
};

function Icons({ name, style, icon_height, fill = colors.transparent, stroke, reveal }: Props) {
  const svg = useMemo(
    () =>
      icon_height ? (
        <SvgXml stroke={stroke} xml={name} height={icon_height} fill={fill} />
      ) : (
        <SvgXml stroke={stroke} xml={name} fill={fill} />
      ),
    [fill, icon_height, name, stroke],
  );

  if (reveal) {
    return (
      <View style={[styles.main_view, style]} accessible={false}>
        <Svg width={icon_height} height={icon_height} viewBox={reveal.view_box} fill={fill}>
          {reveal.paths.map((path, index) => (
            <AnimatedPath
              key={path.d}
              d={path.d}
              stroke={stroke ?? colors.text}
              strokeWidth={reveal.stroke_width}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={[path.length, path.length]}
              strokeDashoffset={reveal.progress[index].interpolate({
                inputRange: [0, 1],
                outputRange: [path.length, 0],
              })}
              opacity={reveal.progress[index].interpolate({
                inputRange: [0, 0.08, 1],
                outputRange: [0, 1, 1],
              })}
            />
          ))}
        </Svg>
      </View>
    );
  }

  return <View style={[styles.main_view, style]}>{svg}</View>;
}

export default memo(Icons);
