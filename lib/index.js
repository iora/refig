'use strict';

/* index.js
 * Wrapper, creator, and defaulter for the library.
 * * */

module.exports = {
  // Library
  read: require('./read'),

  // Internal props / methods
  _cache: {},
  _parse: JSON.parse,
  _serialize: JSON.stringify,
};
