'use strict';

const path = require('path'),
      fs = require('fs');

/* readSync.js
 * The synchronous version of read.js
 * * */

module.exports = exports = function(item){
  if (Array.isArray(item)) {
    let config = {};
    for (let i of item) Object.assign(config, exports.call(this, i));
    return config;
  }

  if (typeof item !== 'string')
  throw new TypeError('path must be a string');

  item = path.resolve(process.cwd(), item);

  console.log(this);

  let stat = fs.statSync(item);
  if (stat.isDirectory()) {
    let defaultFile = path.resolve(item, this.get('default') || '');

    let config = {}, file = null;

    try {
      if (defaultFile !== item) {
        file = fs.readFileSync(defaultFile);
        Object.assign(config, this.parse(file));
      }

      file = fs.readFileSync(path.resolve(item, this.get('package')));
      Object.assign(config, this.parse(file)[this.get('name')]);
    } catch (e) {
      if (e instanceof SyntaxError) throw e;
    }

    return config;
  }

  else if (stat.isFile())
    return this.parse(fs.readFileSync(item));

  else
    new TypeError('item must be a directory or file');
};
