import { createMMKV } from 'react-native-mmkv';
import type { Storage } from 'redux-persist';

const mmkv = createMMKV();

// Older versions kept the profile (name, email, phone, birth date) in persist:constant. MMKV appends every write, so
// old values stay in the file's bytes after a key is rewritten. Once per install the file is wiped and every value
// is written back without the profile. Runs at import, before redux-persist reads its state.
const COMPACTED = 'profile_wiped';
if (!mmkv.getString(COMPACTED)) {
  const values = mmkv.getAllKeys().map(key => [key, mmkv.getString(key)] as const);
  // clearAll() shortens the file but leaves its old bytes; one large value written over them first wipes them.
  mmkv.clearAll();
  mmkv.set(COMPACTED, '0'.repeat(65536));
  mmkv.clearAll();
  for (const [key, value] of values) {
    if (value === undefined) continue;
    if (key !== 'persist:constant') mmkv.set(key, value);
    else {
      const kept = JSON.parse(value);
      delete kept.user;
      mmkv.set(key, JSON.stringify(kept));
    }
  }
  mmkv.set(COMPACTED, '1');
}

export const redux_storage: Storage = {
  setItem: (key, value) => {
    mmkv.set(key, String(value));
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = mmkv.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: key => {
    mmkv.remove(key);
    return Promise.resolve();
  },
};
