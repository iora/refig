import { join } from 'path';
import fs from 'fs';
import assign from 'object-assign';
import promisify from './promisify';

const [ open, read, stat ] = promisify(fs.open, fs.read, fs.stat);

export default class Refig {
  constructor(opts) {
    this._opts = new Map();
    this._cache = new Map();

    this.set('parser', JSON.parse);

    for (let opt in opts) this.set(opt, opts[opt]);
  }

  load(path) {
    if (Symbol.iterator in Object(path) && typeof path !== 'string') {
      let master = [];
      for (const path of path) master.push(this.load(path));
      return Promise.all(master);
    }

    if (this._cache.has(path)) resolve(this._cache.get(path));

    return stat(path)
    .then(([ stats ]) => {
      const file = stats.isFile() ? path : join(path, this._get('file') || '');
      return Promise.all([open(file, 'r'), stats]);
    })
    .then(([ [fd], stats ]) => {
      return read(fd, new Buffer(stats.size), 0, stats.size, 0);
    })
    .then(([ x, data ]) => this._get('parser')(data));
  }

  merge(...paths) {
    return this.load(paths).then(all => {
      let flat = [];
      this._treeRecursion([all], item => flat.push(item));
      return assign({}, ...flat);
    });
  }

  pick(files, name) {
    return this.load(files).then(all => {
      let picks = [];
      this._treeRecursion([all], item => picks.push(item[name]));
      return picks;
    });
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

  _treeRecursion(input, operation) {
    if (Array.isArray(input)) {
      for (let item of input) this._treeRecursion(item, operation);
    } else operation(input);
  }
}
