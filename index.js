(function(fs, path, lib){
  'use strict';

  // Destructure
  // let {parser, reader, writer} = lib;
  var parser = lib.parser,
      reader = lib.reader,
      writer = lib.writer;

  // Set default parsing to JSON
  parser
  .set('parse', JSON.parse)
  .set('serialize', function(input, indent){
    return JSON.stringify(input, null, indent);
  });

  // Library essentials
  reader.set('parser', parser);
  writer.set('parser', parser);

  module.exports = {
    read: reader.read,
    write: writer.write,

    // A shorter reference to parser.set
    set: function(prop, imp){
      parser.set(prop, imp);
    },

    // Pass private vars to export
    parser: parser,
    reader: reader,
    writer: writer
  };
})(
  require('fs'),
  require('path'),
  require(__dirname + '/lib')
);
