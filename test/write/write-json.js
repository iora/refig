var refig = require('../..'),
    testfile = __dirname + '/write-json.json';

refig.write(testfile, {'test': 1},function(){
  refig.set('indent', 0).write(testfile, {'test': 2});
});
