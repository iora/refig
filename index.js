'use strict';

const lib = require('./lib'),
      read = lib.read,
      write = lib.write;

let Refig = {
  set: lib.set,
  read: read,
  write: write,

  // Defualt options
  options: {
    async: true,
    indent: 2,
    parse: JSON.parse,
  },

  // Cache
  cache: {},

  // For Destructuring
  Reader: Reader,
  Writier: Writer
};

module.exports = Refig;
