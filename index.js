var lib = require('./lib');

(function(Parser, Reader, Writer){
  var options = {},
      parser = new Parser(options),
      reader = new Reader(options, parser),
      writer = new Writer(options, parser);

  var methods = {
    // Add new options
    set: function(key, imp){
      options[key] = imp;
      return this;
    },

    // Override options
    use: function(override){
      options = override;
      return this;
    },

    // Quick access methods
    read: reader.read,
    write: writer.write,
    parse: parser.parse,
    serialize: parser.serialize,
    purge: reader.purge

    // Automatically initiated objects
    parser: parser,
    reader: reader,
    writer: writer,

    // Objects for custom expanding
    Parser: Parser,
    Reader: Reader,
    Writer: Writer,

    options: options
  };

  options.methods = methods;

  methods
  .set('parse', JSON.parse)
  .set('serialize', function(data, indent){
    return JSON.stringify(data, null, indent);
  })
  .set('indent', 2);

  module.exports = methods;
})(
  lib.Parser,
  lib.Reader,
  lib.Writer
);
