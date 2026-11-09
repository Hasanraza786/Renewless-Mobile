const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaults = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
// QA run screenshots and reports are written while the app runs; watching them would reload the app.
const config = {
  resolver: { blockList: [defaults.resolver.blockList, /\/qa\/runs\/.*/] },
};

module.exports = mergeConfig(defaults, config);
