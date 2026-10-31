import { createMMKV } from 'react-native-mmkv';
import type { Storage } from 'redux-persist';

const mmkv = createMMKV();

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
