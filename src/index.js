import { join } from 'path';
import fs from 'fs';
import promisify from './promisify';

const [ open, read, fstat ] = promisify(fs.open, fs.read, fs.fstat);

export default class Refig {
  constructor(opts) {
    this._opts = new Map();
    this._cache = new Map();

    // Defaults
    this.set();
  }

  load(paths) {
    if (Symbol.iterator in Object(paths) && typeof paths !== 'string') {
      let master = [];
      for (const path of paths) master.push(this.load(path));
      return Promise.all(master);
    }

    const file = join(paths, this._get('name') || '');
    if (this._cache.has(file)) resolve(this._cache.get(file));

    return open(file, 'r')
    .then(([fd]) => Promise.all([fstat(fd), fd]))
    .then(([[stats], fd]) => {
      return read(fd, new Buffer(stats.size), 0, stats.size, 0);
    })
    .then(([x, data]) => JSON.parse(data));
  }

  purge(item) {
    let old;
    if (typeof item !== 'undefined') {
      old = this._cache.get(item);
      this._cache.remove(item);
    } else {
      old = this._cache;
      this._cache = new Map();
    }
    return old;
  }

  set(...args) { return this._opts.set(...args); }
  _get(...args) { return this._opts.get(...args); }
}
