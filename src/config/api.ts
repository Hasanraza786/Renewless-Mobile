import Config from 'react-native-config';

const configured_url = Config.API_BASE_URL;

if (!configured_url) {
  throw new Error('API_BASE_URL is missing. Set it in .env.');
}

export const API_BASE_URL = configured_url;

// Development builds use the mock service adapters; release builds never fall back to mocks.
export const USE_MOCK_API = __DEV__;
