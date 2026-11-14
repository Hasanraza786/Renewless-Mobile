import { useWindowDimensions } from 'react-native';

// Tablet layouts follow the window, not the device: an iPad window narrowed to phone width gets the phone layout.
const TABLET_MIN_WIDTH = 600;

export const useIsTablet = () => useWindowDimensions().width >= TABLET_MIN_WIDTH;
