var refig = require('../..'),
    CSON = require('cson-parser'),
    testfile = __dirname + '/read-cson.cson';

// Add CSON parsing:
refig.set('parse', CSON.parse);

/*
 * Asynchronous
 */
// Shorthand:
refig.read(testfile, function(err, data){
  console.log('async1: ', data);
});

// Reader object
refig.reader.read(testfile, function(err, data){
  console.log('async2: ', data);
});

// Decouple:
var Reader = refig.Reader;
var reader = new Reader({}, {
  'parse': CSON.parse
});

reader.read(testfile, function(err, data){
  console.log('async3: ', data);
});


/*
 * Synchronous
 */
refig.set('async', false);

// Shorthand:
var test1 = refig.read(testfile);
console.log('sync1: ', test1);

// Reader object:
var test2 = refig.reader.read(testfile);
console.log('sync2: ', test2);

// Decouple:
var syncReader = new Reader({async: false}, {
  'parse': CSON.parse
});

var test3 = syncReader.read(testfile);
console.log('sync3: ', test3);
