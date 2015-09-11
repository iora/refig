# refig
Refig is a configuration management library.

## Documentation

### `.set`
A function used to set parameters:

```javascript
refig
  .set('indent', 4)
  .set('base', '/path/to/folder')
  .set('parse', CSON.parse)
  .set('async', false);
  .set('serialize', function(data, indent){ 
    return CSON.stringify(data, null, indent); 
  });
```


### `.use`
A function used to override the parameters object:

```javascript
refig.use(someObject);
```


### `.read`
A function used to read configuration files

```javascript
refig.read('somefile.cson', function(err, data){
  // ...
});

// OR Synchronous:
refig.set('async', false);
var data = refig.read('somefile.cson');
```

### `.purge`
A functioned used to purge cache from previous `.read` calls;

```javascript
refig.read('somefile.cson', function(err, data){
  console.log(data);
  this.set('async', false)
  .write('somefile.cson', {
    'newData': 'example'
  }).set('async', true);
  this.read('somefile.cson', function(err, data){
    // data is the old data, because it's fetched from the cache!
    this.purge('somefile.cson');

    // Now, if you read again, it'll be the new data...
  });
});
```

### `.write`
A function used to write an object.

```javascript
refig.write('somefile.cson', {'this_object': ['writes', 'as', 'cson']}, function(err){
  if (!err) console.log('wrote!');
});
```
