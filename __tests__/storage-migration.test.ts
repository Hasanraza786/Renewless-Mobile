// An install upgraded from a version that stored the profile: the file is rewritten without it, other values kept.
test('a stored profile is removed from storage, and the other values survive', () => {
  const memory = new Map<string, string>([
    ['persist:constant', JSON.stringify({ user: '{"email":"a@b.com"}', splash_seen: 'true' })],
    ['install_marker', '1'],
  ]);
  const clearAll = jest.fn(() => memory.clear());
  jest.isolateModules(() => {
    jest.doMock('react-native-mmkv', () => ({
      createMMKV: () => ({
        getString: (key: string) => memory.get(key),
        set: (key: string, value: string) => memory.set(key, value),
        getAllKeys: () => [...memory.keys()],
        clearAll,
      }),
    }));
    require('../src/redux/storage');
  });
  jest.isolateModules(() => require('../src/redux/storage'));
  // Once per install: the second launch finds the marker and leaves the file alone.
  expect(clearAll).toHaveBeenCalledTimes(2);
  expect(JSON.parse(memory.get('persist:constant')!)).toEqual({ splash_seen: 'true' });
  expect(memory.get('install_marker')).toBe('1');
});
