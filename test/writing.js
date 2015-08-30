var refig = require('../');

// Object without rest of params,
refig.write('./writing-object-1.json', {'test': 1});

// String with indentation
refig.write('./writing-string-1.json', JSON.stringify({'test': 1}), 4);

// Buffer with forceful
refig.write('./writing-buffer-1.json', new Buffer(JSON.stringify({'hello': 'world'})), 0);
refig.write('./writing-buffer-1.json', new Buffer(JSON.stringify({'hello': 'jamen'})), 0, true);
