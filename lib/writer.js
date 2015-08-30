(function(fs, path){
  'use strict';

  var parser, options = {};

  module.exports = {
    'set': function(prop, imp){
      if (prop === 'parser') parser = imp;
      options[prop] = imp;
    },

    'write': function(filename, input, indent, forceful){
      if (typeof parser === 'undefined') throw Error('No parser was set!');
      if (filename.substr(0, 1) === path.sep) path = path.resolve(filename);
      if (typeof input === 'object' && !(input instanceof Buffer)) input = parser.serialize(input, indent);
      if (typeof indent === 'undefined') indent = 2;
      if (typeof forceful === 'undefined') forceful = false;

      fs.exists(filename, function(exists){
        if (!exists || forceful) {
          fs.writeFile(filename, input, function(data, err){
            if (err) throw err;
          });
        } else {
          throw Error('File already exists!');
        }
      });
    },

    'create': function(){this.write.apply(this, arguments);}
  };
})(
  require('fs'),
  require('path')
);
