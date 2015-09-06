var refig = require('../..'),
    testfile = __dirname + '/write-builder.json';

refig
  .build('test', 1)
  .build('foo', 'bar')
  .build('example', ['this', 'is', 'an', 'array'])
  .build('lol', {'objectsAre': 'cool'});

refig.writeBuild(testfile, function(err){
  if (err) throw err;
});
