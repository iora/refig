(function(fs, path){
  var cache = {};

  var Reader = function(options, parser){
    if (!(this instanceof Reader)) return new Reader(options);
    this.options = (typeof options === 'object') ? options : {};
    this.parser = (typeof parser !== 'undefined') ? parser : {};
    return this;
  };

  Reader.prototype.use = function(override){
    if (typeof override === 'object') {
      this.options = override;
    }
    return this;
  };

  Reader.prototype.read = function(filepath, async){
    return (function(options, parser){
      var isAsync = true;
      if (typeof options.async !== 'undefined') isAsync = options.async;

      var base = '';
      if (typeof options.base !== 'undefined') base = options.base;

      filepath = (function(){
        if (!path.isAbsolute(filepath)) {
          return path.normalize(base + '/' + filepath);
        } else {
          return filepath;
        }
      })();

      if (isAsync) {
        if (typeof cache[filepath] !== 'undefined') {
          async(null, cache[filepath]);
        } else {
          fs.readFile(filepath, function(err, data){
            var parsed = data ? parser.parse(data) : data;
            cache[filepath] = parsed;
            async(err, parsed);
          }.bind(this));
        }
        return this;
      } else {
        if (typeof cache[filepath] !== 'undefined') {
          return cache[filepath];
        } else {
          var parsed = parser.parse(fs.readFileSync(filepath));
          cache[filepath] = parsed;
          return parsed;
        }
      }
    })(
      this.options,
      this.parser
    );
  };

  Reader.prototype.purge = function(filepath){
    return (function(options){
      var base = '';
      if (typeof options.base !== 'undefined') base = options.base;

      filepath = (function(){
        if (!path.isAbsolute(filepath)) {
          return path.normalize(base + '/' + filepath);
        } else {
          return filepath;
        }
      })();

      if (typeof cache[filepath] !== 'undefined') {
        cache[filepath] = undefined;
      }
      return this;
    })(this.options);
  };

  module.exports = exports = Reader;
})(
  require('fs'),
  require('path')
);
