'use strict';

const path = require('path'),
      fs = require('fs');

/* read.js
 * Used to get a configuration from your file and/or package.json.
 * * */

module.exports = exports = function(item, callback){
  if (typeof item !== 'string')
  throw new TypeError('path must be a string');

  if (typeof callback !== 'function' && typeof callback !== 'undefined')
  throw new TypeError('callback must be a function (or use promises)');

  item = path.resolve(item);

  if (typeof this._cache[item] !== 'undefined' && this.get('cache'))
  return new Promise(function(resolve){
    resolve(this._cache[item]);
    if (callback) callback(null, this._cache[item]);
  });

  return new Promise((resolve, reject) => {
    fs.stat(item, (error, stats) => {
      if (error) {
        reject(error);
        if (callback) callback(error, null);
      }

      else {
        if (stats.isDirectory()) {
          let defaultFile = this.get('default');
          if (defaultFile !== null)
            defaultFile = path.resolve(item, defaultFile);

          let cluster = [];
          if (defaultFile)
            cluster.push(exports._file.call(this, defaultFile));
          if (this.get('package'))
            cluster.push(exports._package.call(this, item));

          Promise.all(cluster)
          .then((configs) => {
            let config = Object.assign({}, ...configs);
            resolve(config);
            if (callback) callback(null, config);
          }, reject);
        }

        else if (stats.isFile()) {
          exports._file.call(this, item).then((config) => {
            resolve(config);
            callback(null, config);
          }, (e) => {
            reject(e);
            callback(e, null);
          });
        }

        else {
          error = new TypeError('item must be a directory or file');
          reject(error);
          if (callback) callback(error, null);
        }
      }
    });
  });
};

exports.sync =

exports._file = function(file){
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, raw) => {
      if (!error) try {
        resolve(this.parse(raw.toString()));
      } catch (e) { reject(e); }
      else reject(error);
    });
  });
};

exports._package = function(folder){
  let name = this.get('name'),
      file = path.join(folder, this.get('package'));

  return new Promise((resolve, reject) => {
    exports._file.call(this, file)
    .then((config) =>
      resolve(config[name]),
      (e) => {
        if (e instanceof SyntaxError) reject(e);
        else resolve({});
      }
    );
  });
};
