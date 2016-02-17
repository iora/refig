import { join } from 'path';
import fs from 'fs';
import assign from 'object-assign';
import promisify from './promisify';

const [ open, read, stat ] = promisify(fs.open, fs.read, fs.stat);

/** @class Refig
  * @param {Object} opts - Options
  */
export default class Refig {
  constructor(opts) {
    this._opts = new Map();
    this._cache = new Map();

    this.set('parser', JSON.parse);

    for (let opt in opts) this.set(opt, opts[opt]);
  }

  /** Read and parse a configuration file.
    * @method Refig#load
    * @param {Array|String} path - A string (or array of strings) of a path.
    */
  load(path) {
    if (Symbol.iterator in Object(path) && typeof path !== 'string') {
      let master = [];
      for (const path of path) master.push(this.load(path));
      return Promise.all(master);
    }

    if (this._cache.has(path)) {
      return Promise.resolve(this._cache.get(path));
    }

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

  /** Fetch multiple configurations and merge them.
    * @method Refig#merge
    * @param {Array|String} path - A string (or array of strings) of a path.
    */
  merge(path) {
    return this.load(path).then(all => {
      let flat = [];
      this._treeRecursion([all], item => flat.push(item));
      return assign({}, ...flat);
    });
  }

  /** Pick a single attribute out of a file.
    * @method Refig#pick
    * @param {Array|String} path - A string (or array of strings) of a path.
    * @param {String} name - Name of the attribute to pick.
    */
  pick(path, name) {
    return this.load(path).then(all => {
      let picks = [];
      this._treeRecursion([all], item => picks.push(item[name]));
      return picks;
    });
  }

  /** Purge a file from the cache.
    * @method Refig#purge
    * @param {Array|String} path - A string (or array of strings) of a path.
    */
  purge(path) {
    let old;
    if (typeof path !== 'undefined') {
      old = this._cache.get(path);
      this._cache.remove(path);
    } else {
      old = this._cache;
      this._cache = new Map();
    }
    return old;
  }

  /** Set an option
    * @method Refig#set
    * @alias Refig._opts.set
    */
  set(...args) { return this._opts.set(...args); }

  _get(...args) { return this._opts.get(...args); }
  _treeRecursion(input, operation) {
    if (Array.isArray(input)) {
      for (let item of input) this._treeRecursion(item, operation);
    } else operation(input);
  }
}
