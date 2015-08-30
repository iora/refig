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
})(
  require('fs'),
  require('path'),
  require(__dirname + '/lib')
);
