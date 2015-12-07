'use strict';

/* index.js
 * Wrapper, creator, and defaulter for the library.
 * * */

const refig = module.exports = {
  // Library
  read: require('./read'),
  readSync: require('./readSync'),

  // Actions
  set: function(opt, val){
    if (typeof opt === 'object') for (val in opt) this.set(val, opt[val]);
    else if (typeof opt === 'string') this._opts[opt] = val;
    return this;
  },
  get: function(opt){
    return this._opts[opt] || null;
  },

  // Internal props / methods
  _cache: {},
  _opts: {},
  parse: JSON.parse,
  serialize: JSON.stringify,
};

// Set defaults
refig.set({
  package: 'package.json'
});
