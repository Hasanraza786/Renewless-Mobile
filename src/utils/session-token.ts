import { getCrashlytics, recordError } from '@react-native-firebase/crashlytics';
import * as Keychain from 'react-native-keychain';
import { createMMKV } from 'react-native-mmkv';

// The login token lives only in the iOS Keychain; this in-memory copy signs requests.
const SERVICE = 'renewless.session';
let token: string | null = null;

// The iOS Keychain outlives an uninstall, app storage does not. No marker and no persisted state means a fresh
// install, so an old token must not sign the new install in. An update keeps its storage (and so its login); a
// version from before the marker still has its persisted state. Read at import, before redux-persist writes.
const INSTALL_MARKER = 'install_marker';
const app_storage = createMMKV();
let fresh_install = !app_storage.getString(INSTALL_MARKER) && !app_storage.getString('persist:constant');
app_storage.set(INSTALL_MARKER, '1');

export const sessionToken = () => token;

export async function loadSessionToken() {
  if (fresh_install) {
    fresh_install = false;
    await clearSessionToken().catch(() => undefined);
    return token;
  }
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
  try {
    await Keychain.setGenericPassword('session', value, { service: SERVICE, accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY });
  } catch (error) {
    // The sign-in still works from memory; only the next launch asks to log in again.
    recordError(getCrashlytics(), error instanceof Error ? error : new Error(String(error)));
  }
}

export async function clearSessionToken() {
  token = null;
  await Keychain.resetGenericPassword({ service: SERVICE });
}
