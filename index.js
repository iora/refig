(function(fs, path, lib){
  'use strict';

  // Destructure
  // let {parser, reader, writer} = lib;
  var parser = lib.parser,
      reader = lib.reader,
      writer = lib.writer;

})(
  require('fs'),
  require('path'),
  require(__dirname + '/lib')
);
