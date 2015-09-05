var lib = require('./lib');

(function(Parser, Reader, Writer){
  var options = {},
      reader = new Reader(options),
      writer = new Writer(options),
      parser = new Parser(options);

  options.test = 'lel';

  var methods = {
    // Add new options
    set: function(key, imp){
      options[key] = imp;
      return this;
    },

    // Override options
    use: function(override){
      parser.use(override);
      reader.use(override);
      writer.use(override);
      return this;
    },

    // Quick access methods
    read: reader.read,
    write: writer.write,
    parse: parser.parse,
    serialize: parser.serialize,

    // Automatically initiated objects
    reader: reader,
    writer: writer,

    // Objects for custom expanding
    Reader: Reader,
    Writer: Writer
  };

  writer.write();

  module.exports = methods;
})(
  lib.Parser,
  lib.Reader,
  lib.Writer
);
