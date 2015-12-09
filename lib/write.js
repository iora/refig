'use strict';

const path = require('path'),
      fs = require('fs');

/* write.js
 * Asynchronously write configurations.
 * * */

module.exports = exports = function(item, config, callback){
  if (Array.isArray(item)) {
    let promises = [];
    for (let i of item) promises.push( exports.call(this, i, config) );
    let master = Promise.all(promises);
    master.then((c) => callback(null, c));
    return master;
  }

  if (typeof item === 'object') {
    let promises = [];
    for (let file in item) {
      config = item[file];
      promises.push( exports.call(this, file, config) );
    }
    let master = Promise.all(promises);
    master.then((c) => callback(null, c));
    return master;
  }

  if (typeof config !== 'object')
  throw new TypeError('config must be a object');

  if (typeof callback !== 'function' && typeof callback !== 'undefined')
  throw new TypeError('callback must be a function (or use promises)');

  item = path.resolve(item);

  return new Promise((resolve, reject) => {
    let serialized;
    try {
      serialized = this.serialize(config);
    } catch (e) {
      reject(e);
      if (callback) callback(e, null);
    }

    if (typeof serialized !== 'undefined')
    fs.writeFile(item, serialized, (error, result) => {
      if (error) reject(error);
      else resolve(result);
      if (callback) callback(...arguments);
    });
  });
};
