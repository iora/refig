var refig = require('../..'),
    CSON = require('cson-parser'),
    testfile = __dirname + '/write-cson.cson';

refig.set('serialize', function(data, indent){
  return CSON.stringify(data, null, indent);
});

refig.write(testfile, {'this_object': ['writes', 'as', 'cson']}, function(err, data){
  console.log(err);
  console.log(data);
});
