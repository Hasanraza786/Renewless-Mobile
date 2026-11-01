import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';

export type GoogleAccount = { email: string };

// shortcut: only the development mock exists; the real account comes from native Google sign-in once integrated.
export async function getGoogleAccount(): Promise<GoogleAccount> {
  if (!USE_MOCK_API) throw new Error('Google sign-in is not available yet.');
  return { ...MOCK_DATA.google_account };
}
