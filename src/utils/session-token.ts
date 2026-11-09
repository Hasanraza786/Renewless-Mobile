import * as Keychain from 'react-native-keychain';

// The login token lives only in the iOS Keychain; this in-memory copy signs requests.
const SERVICE = 'renewless.session';
let token: string | null = null;

export const sessionToken = () => token;

export async function loadSessionToken() {
  try {
    const saved = await Keychain.getGenericPassword({ service: SERVICE });
    token = saved ? saved.password : null;
  } catch {
    token = null;
  }
  return token;
}

export async function saveSessionToken(value: string) {
  token = value;
  await Keychain.setGenericPassword('session', value, { service: SERVICE, accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY });
}

export async function clearSessionToken() {
  token = null;
  await Keychain.resetGenericPassword({ service: SERVICE });
}
