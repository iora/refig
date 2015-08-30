(function(){
  'use strict';

  var parser = {};

  module.exports = exports = {
    'set': function(prop, imp){
      // normalize
      if (prop === 'stringify' || prop === 'serialise') prop = 'serialize';
      parser[prop] = imp;
      return this;
    },

    'parse': function(input){
      if (typeof parser.parse !== 'function') throw Error('The parser you set is not a function!');
      if (typeof input === 'object' && input instanceof Buffer) input = input.toString();
      if (typeof input !== 'string') throw Error('You can only parse strings or buffers!');
      return parser.parse(input);
    },

    'serialize': function(input, indent){
      if (typeof parser.serialize !== 'function') throw Error('The seralizer you set is not a function!');
      if (typeof input !== 'object') throw Error('You can only serialize objects!');
      if (typeof indent === 'undefined') indent = 2;
      return parser.serialize(input, indent);
    },

    'serialise': function(){return this.serialize();},
    'stringify': function(){return this.serialize();}
  };
})();
