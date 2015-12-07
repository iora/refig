module.exports = {
  // Library
  read: require('./read'),

  // Internal props / methods
  _cache: {},
  _parse: JSON.parse,
  _serialize: JSON.stringify,
};
