module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-redux|@reduxjs|redux-persist|immer|react-native-responsive-fontsize|react-native-iphone-x-helper)/)',
  ],
};
