'use strict';

/* read.js
 * Used to get a configuration from your file and/or package.json.
 * * */

module.exports = exports = function(path, callback){
  // Check types
  if (typeof path !== 'string')
  throw new TypeError('path must be a string');

  if (typeof callback !== 'function')
  throw new TypeError('callback must be a function');
};
