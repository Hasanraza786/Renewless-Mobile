import * as Keychain from 'react-native-keychain';
import { createMMKV } from 'react-native-mmkv';

// Each case loads session-token fresh, as an app launch does, over the Keychain and storage it finds.
async function launch() {
  let load: () => Promise<string | null> = async () => null;
  jest.isolateModules(() => {
    load = require('../src/utils/session-token').loadSessionToken;
  });
  return load();
}

const storage = createMMKV();

beforeEach(async () => {
  storage.remove('install_marker');
  storage.remove('persist:constant');
  await Keychain.setGenericPassword('session', 'old-token');
});

test('a fresh install does not sign in with a token left in the Keychain by an uninstalled copy', async () => {
  expect(await launch()).toBeNull();
  expect(await Keychain.getGenericPassword()).toBe(false);
});

test('an update keeps the login, with or without the install marker', async () => {
  storage.set('persist:constant', '{}');
  expect(await launch()).toBe('old-token');
  storage.remove('persist:constant');
  expect(await launch()).toBe('old-token');
});
