'use strict';

const path = require('path'),
      fs = require('fs');

/* readSync.js
 * The synchronous version of read.js
 * * */

module.exports = exports = function(item){
  if (typeof item !== 'string')
  throw new TypeError('path must be a string');

  item = path.resolve(item);

  let stat = fs.statSync(item);
  if (stat.isDirectory()) {
    let defaultFile = this.get('default');
    if (defaultFile !== null)
      defaultFile = path.resolve(item, defaultFile);

    let config = {}, file = null;

    try {
      file = fs.readFileSync(defaultFile);
      Object.assign(config, this.parse(file));

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
