import { Linking } from 'react-native';

// The website's legal pages. "How we use your data" is part of the Privacy Policy.
export const PRIVACY_URL = 'https://renewlessapp.com/privacy';
export const TERMS_URL = 'https://renewlessapp.com/terms';

// Opens the page in the browser; a failure is quiet (nothing in the app depends on it).
export const openLegal = (url: string) => {
  Linking.openURL(url).catch(() => undefined);
};
