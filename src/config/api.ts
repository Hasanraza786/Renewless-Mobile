import Config from 'react-native-config';

const configured_url = Config.API_BASE_URL;

if (!configured_url) {
  throw new Error('API_BASE_URL is missing. Set it in .env.');
}

export const API_BASE_URL = configured_url;
