const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  './lib/webauthn': '/dev/null', // Mapuje problematyczny moduł na "pustkę"
};

module.exports = config;