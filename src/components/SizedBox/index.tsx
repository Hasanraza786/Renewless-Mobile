import { View } from 'react-native';
import { SIZES } from '../../constants/theme';

type Props = {
  height?: number;
  horizontal?: boolean;
  width?: number;
};

export default function SizedBox({ height, horizontal = false, width }: Props) {
  const size = horizontal ? { width: width ?? SIZES.padding } : { height: height ?? SIZES.padding };
  return <View style={size} />;
}
