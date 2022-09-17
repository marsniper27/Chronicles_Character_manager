/* config-overrides.js */

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias = {
    ...config.resolve.alias,
    "@ledgerhq/devices/hid-framing": "@ledgerhq/devices/lib/hid-framing",
  };
 return config;
}
