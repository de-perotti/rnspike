const assert = require('assert');

assert.ok(
  process.env.PLATFORM === 'android' || process.env.PLATFORM === 'ios',
  'Platform is not set for tests. Must be android or ios',
);

module.exports = {
  preset: '@testing-library/react-native',
  haste: {
    defaultPlatform: process.env.PLATFORM,
    platforms: ['android', 'ios', 'native'],
    providesModuleNodeModules: ['react-native'],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    'node_modules',
    'e2e',
    process.env.PLATFORM === 'android' ? '.*\\.ios\\..*' : '.*\\.android\\..*',
  ],
  transformIgnorePatterns: ['/node_modules/(?!react-navigation)/'],
};
