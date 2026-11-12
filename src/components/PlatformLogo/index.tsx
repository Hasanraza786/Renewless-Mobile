import { useState } from 'react';
import { Image } from 'react-native';
import { platform_logos } from '../../assets/icons';
import { logo_urls } from '../../api_services/adapters';
import { SIZES } from '../../constants/theme';
import CustomText from '../CustomText';
import Icons from '../Icons';

type Props = {
  platform_id: string;
  // The first letter shows when there is no logo; without a name nothing shows.
  name?: string;
  // Drawn size; the bundled logos are 24 when it is not set.
  size?: number;
  letter_size?: number;
};

// A platform logo: the bundled brand SVG first, then the backend's hosted logo, then the name's first letter.
export default function PlatformLogo({ platform_id, name, size, letter_size = SIZES.sm }: Props) {
  const [failed, setFailed] = useState(false);
  const bundled = platform_logos[platform_id];
  const hosted = logo_urls[platform_id];
  if (bundled) return size ? <Icons name={bundled} icon_height={size} icon_width={size} /> : <Icons name={bundled} />;
  if (hosted && !failed) {
    const side = size ?? SIZES.padding * 1.2;
    return <Image source={{ uri: hosted }} style={{ width: side, height: side }} resizeMode="contain" accessible={false} onError={() => setFailed(true)} />;
  }
  return name ? <CustomText text={name.charAt(0)} size={letter_size} /> : null;
}
