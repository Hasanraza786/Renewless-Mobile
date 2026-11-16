import { useWindowDimensions } from 'react-native';

// Tablet layouts follow the window, not the device: an iPad window narrowed to phone width gets the phone layout.
// The shorter side decides, so a phone turned to landscape keeps the phone layout.
const TABLET_MIN_WIDTH = 600;

export const useIsTablet = () => {
  const { width, height } = useWindowDimensions();
  return Math.min(width, height) >= TABLET_MIN_WIDTH;
};
