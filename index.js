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
})(
  require('fs'),
  require('path'),
  require(__dirname + '/lib')
);
