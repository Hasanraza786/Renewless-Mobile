import { API_BASE_URL as configuredUrl } from '@env';

if (!configuredUrl) {
  throw new Error('API_BASE_URL is missing. Set it in .env.');
}

export const API_BASE_URL = configuredUrl;
