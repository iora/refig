var refig = require('../..'),
    testfile = __dirname + '/read-json.json';

/*
 * Asynchronous
 */
// Shorthand:
refig.read(testfile, function(err, data){
  if (!err) {
    console.log('async1: ', data);
  } else {
    throw err;
  }
});

// Reader object:
refig.reader.read(testfile, function(err, data){
  if (!err) {
    console.log('async2: ', data);
  } else {
    throw err;
  }
});


// Decoupled:
var Reader = refig.Reader;
var reader = new Reader({}, {
  parse: JSON.parse,
  serialize: function(data, indent){
    return JSON.stringify(data, null, indent);
  }
});

reader.read(testfile, function(err, data){
  if (!err) {
    console.log('async3: ', data);
  } else {
    throw err;
  }
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

// Decoupled:
var syncReader = new Reader({async: false}, {
  parse: JSON.parse,
  serialize: function(data, indent){
    return JSON.stringify(data, null, indent);
  }
});

var test3 = syncReader.read(testfile);
console.log('sync3: ', test3);
